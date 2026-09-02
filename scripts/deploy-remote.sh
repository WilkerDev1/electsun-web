#!/usr/bin/env bash
# =============================================================================
# scripts/deploy-remote.sh — Despliegue de Electsun Web en Proxmox CT 100
# =============================================================================
set -e

SERVER="app-server"
REMOTE_DIR="/home/agente/servicios/electsun-web"
REMOTE_CADDY_DIR="/home/agente/servicios/caddy"

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║   Electsun Web — Despliegue en Servidor CT 100        ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

echo "── 1. Preparando estructura de directorios en $SERVER..."
ssh $SERVER "mkdir -p $REMOTE_DIR/data $REMOTE_DIR/uploads"

echo "── 2. Sincronizando archivos del proyecto hacia $SERVER..."
tar --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.agents' \
    --exclude='repomix-output.xml' \
    -czf - . | ssh $SERVER "tar -xzf - -C $REMOTE_DIR"

echo "── 3. Inicializando base de datos SQLite persistente..."
if ssh $SERVER "[ ! -f $REMOTE_DIR/data/dev.db ]"; then
    echo "Copiando base de datos inicial dev.db al servidor..."
    scp ./dev.db $SERVER:$REMOTE_DIR/data/dev.db
else
    echo "Base de datos existente conservada en $REMOTE_DIR/data/dev.db."
fi

echo "── 4. Ajustando permisos no-root (UID 1001) en data y uploads..."
ssh $SERVER "chown -R 1001:1001 $REMOTE_DIR/data $REMOTE_DIR/uploads 2>/dev/null || true; chmod -R 775 $REMOTE_DIR/data $REMOTE_DIR/uploads 2>/dev/null || true"

echo "── 5. Configurando Caddyfile con redirección WWW y enrutamiento aislado..."
ssh $SERVER "cat << 'EOF' > $REMOTE_CADDY_DIR/Caddyfile
{
    admin off
    auto_https off
}

:80 {
    encode zstd gzip

    # 1. Redirección canónica de www hacia el dominio raíz
    @wwwHost host www.electsun.net
    handle @wwwHost {
        redir https://electsun.net{uri} permanent
    }

    # 2. Subdominios dedicados para SolarSim API & Sync
    @solarsimHost host solarsim.electsun.net api.solarsim.electsun.net api.electsun.net
    handle @solarsimHost {
        reverse_proxy solarsim-api:3000
    }

    # 3. Web Corporativa Electsun (electsun.net y cualquier otra petición)
    handle {
        reverse_proxy electsun-web:3000
    }
}
EOF"

echo "── 6. Desplegando contenedor Docker electsun-web..."
ssh $SERVER "cd $REMOTE_DIR && docker compose up -d --build"

echo "── 7. Recargando configuración de Caddy sin tiempo de inactividad..."
ssh $SERVER "docker exec caddy-proxy caddy reload --config /etc/caddy/Caddyfile"

echo ""
echo "── 8. Verificando estado en $SERVER..."
ssh $SERVER "docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'"

echo ""
echo "── 9. Prueba de respuesta HTTP interna..."
ssh $SERVER "curl -s -I -H 'Host: electsun.net' http://localhost:80 | head -n 8"

echo ""
echo "✅ ¡Despliegue completado exitosamente!"
