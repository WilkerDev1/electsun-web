#!/usr/bin/env bash
# =============================================================================
# scripts/backup-databases.sh — Respaldo Unificado de PostgreSQL (CT 100)
# Respaldos de SolarSim Pro (solarsim_prod) y Electsun Web (electsun_prod)
# =============================================================================
set -e

BACKUP_DIR="${HOME}/backups/electsun"
DATE_TAG=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="${BACKUP_DIR}/postgres_full_${DATE_TAG}.sql.gz"
SERVER="app-server"

mkdir -p "$BACKUP_DIR"

echo "📦 Iniciando respaldo unificado de PostgreSQL desde $SERVER..."
ssh "$SERVER" "docker exec solarsim-db pg_dumpall -U solarsim_user | gzip" > "$BACKUP_FILE"

FILE_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
echo "✅ Respaldo completado exitosamente: $BACKUP_FILE ($FILE_SIZE)"

# Retención: Conservar los últimos 14 días de respaldos locales
find "$BACKUP_DIR" -name "postgres_full_*.sql.gz" -type f -mtime +14 -delete 2>/dev/null || true
echo "🧹 Limpieza de respaldos antiguos (>14 días) completada."
