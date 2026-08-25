# Electsun — Web Corporativa & Plataforma de Gestión Solar

Plataforma web empresarial para **Electsun**, empresa líder en diseño, instalación y mantenimiento de sistemas de energía solar fotovoltaica, almacenamiento inteligente con baterías de litio, bombeo solar y soluciones de recarga de vehículos eléctricos.

---

## 🚀 Tecnologías

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components & Server Actions)
- **Base de Datos & ORM**: PostgreSQL con [Prisma](https://www.prisma.io/)
- **Autenticación**: [Auth.js / NextAuth v5](https://authjs.dev/)
- **Estilos**: Vanilla CSS con Custom Properties, efectos de cristal (Glassmorphism) y paleta de alta eficiencia energética.
- **Tipografía**: Outfit, Space Grotesk e Inter.
- **Procesamiento de Imágenes**: [Sharp](https://sharp.pixelplumbing.com/)

---

## 🛠️ Panel de Administración (`/admin`)

El panel de administración cuenta con arquitectura modular desacoplada en `src/components/admin/`:
- **Instalaciones y Proyectos**: Gestión integral de proyectos ejecutados, filtrado por categorías, especificaciones técnicas (potencia kWp, porcentaje de ahorro, ubicación) y selección de destacados.
- **Nueva Instalación**: Subida y optimización de imágenes con Drag & Drop y campos de ingeniería solar.
- **Datos de Empresa & Métricas**: Personalización de nombre comercial, textos de presentación corporativa, datos de contacto oficial y contadores de rendimiento.
- **Canales de Contacto**: Gestión de accesos directos (WhatsApp, LinkedIn, teléfono directo y correo).

---

## 💻 Puesta en Marcha en Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Generar el cliente de Prisma:
   ```bash
   npx prisma generate
   ```

3. Aplicar migraciones y ejecutar seed:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.
