<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Electsun Web — Directrices de Desarrollo y Gestión de Contexto

Este archivo define las reglas de buenas prácticas, arquitectura del proyecto y directrices para el uso de **Repomix** en el análisis y mantenimiento de este repositorio.

---

## ⚡ 1. Arquitectura del Proyecto Electsun

- **Framework**: Next.js 16 (App Router) + React 19.
- **Estilos**: Vanilla CSS con Custom Properties en `src/app/globals.css`.
  - Colores corporativos: `--primary: #00E599` (verde esmeralda solar), `--secondary: #F59E0B` (ámbar solar), `--cyan: #0EA5E9` (azul eléctrico) y superficies oscuras `--dark-surface: #0E1422`.
- **Base de Datos**: SQLite local a través de Prisma (`file:./prisma/dev.db`).
- **Autenticación**: Auth.js / NextAuth v5 con proveedor de credenciales y sesiones JWT en `/admin/login`.
- **Panel de Administración**: Arquitectura estrictamente modular en `src/components/admin/` (evitar archivos monolíticos >200 líneas).
- **Procesamiento de Archivos**: Sharp en `/api/upload` con compresión WebP y generación de miniaturas.

---

## 📦 2. Directrices de Uso de Repomix

**Repomix** es la herramienta estándar del repositorio para empaquetar, analizar y mantener el contexto del código de forma eficiente para modelos de IA y agentes.

### Cuándo Utilizar Repomix
1. **Exploración Global**: Cuando se necesite una visión holística de todo el proyecto, sus dependencias o métricas globales de tokens.
2. **Descubrimiento de Patrones**: Búsqueda transversal de código de autenticación, endpoints de API o modelos de datos.
3. **Mantenimiento y Auditorías**: Análisis de deuda técnica, dependencias no utilizadas o refactorizaciones amplias.
4. **Análisis de Repositorios Remotos**: Exploración de paquetes o librerías externas antes de integrarlas (`--remote <repo>`).

### Comandos Clave
- **Empaquetar contexto local completo**:
  ```bash
  npx repomix
  # O mediante script npm:
  npm run pack
  ```
- **Empaquetar solo código fuente frontend**:
  ```bash
  npx repomix --include "src/**/*.{ts,tsx,css}"
  ```
- **Empaquetar modelo de datos y backend**:
  ```bash
  npx repomix --include "src/app/api/**,prisma/**,src/lib/**"
  ```
- **Análisis de repositorio remoto (siempre a `/tmp`)**:
  ```bash
  npx repomix --remote <owner/repo> --output /tmp/<repo>-analysis.xml
  ```

### Reglas y Restricciones con Repomix
- **Seguridad**: Nunca incluir claves privadas, `.env`, tokens ni secretos en los empaquetados. Mantener `enableSecurityCheck: true` en `repomix.config.json`.
- **Salidas limpias**: El archivo `repomix-output.xml` está excluido en `.gitignore` para no ensuciar el control de versiones.
- **Búsqueda por patrones**: Para consultar el archivo empaquetado, usar búsquedas selectivas (`grep`) antes de leer bloques masivos para optimizar el consumo de tokens.
- **Compresión**: Utilizar `--compress` cuando el contexto supere las 100k líneas.

---

## 🧪 3. Verificación de Código Obligatoria

Antes de dar por completada cualquier tarea o commit:
1. `npm run lint` -> Debe pasar con **0 errores y 0 warnings**.
2. `./node_modules/.bin/tsc --noEmit` -> Debe compilar sin fallos de TypeScript.
3. `npm run build` -> El build de producción debe generarse limpiamente.
