import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { hashSync } from 'bcryptjs';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const url = process.env.DATABASE_URL || 'file:./dev.db';
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding Electsun SQLite database...');

  // Clear existing data
  await prisma.socialLink.deleteMany({});
  await prisma.project.deleteMany({});

  // Create admin user
  const hashedPassword = hashSync('admin123', 12);
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: { password: hashedPassword },
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });
  console.log('✅ Admin user created (username: admin, password: admin123)');

  // Create site config for Electsun
  await prisma.siteConfig.upsert({
    where: { id: 'main' },
    update: {
      companyName: 'Electsun',
      tagline: 'Energía Solar y Soluciones Renovables',
      email: 'servicioalcliente@electsun.do',
      phone: '809-378-6590',
      address: 'Santo Domingo, República Dominicana',
      bio: 'Especialistas en ingeniería, instalación y mantenimiento de sistemas fotovoltaicos y almacenamiento inteligente para hogares y empresas.',
      aboutText: 'En Electsun lideramos la transición hacia un modelo energético sostenible y eficiente. Con más de una década de experiencia en el sector de las energías renovables, diseñamos soluciones llave en mano con componentes de máxima calidad (Tier 1) y garantías de hasta 25 años.',
      stat1Value: '50MW+',
      stat1Label: 'Energía Generada',
      stat2Value: '10k+',
      stat2Label: 'Clientes Satisfechos',
      stat3Value: '85%',
      stat3Label: 'Ahorro Medio en Factura',
      stat4Value: '15',
      stat4Label: 'Años de Experiencia',
    },
    create: {
      id: 'main',
      companyName: 'Electsun',
      tagline: 'Energía Solar y Soluciones Renovables',
      email: 'servicioalcliente@electsun.do',
      phone: '809-378-6590',
      address: 'Santo Domingo, República Dominicana',
      bio: 'Especialistas en ingeniería, instalación y mantenimiento de sistemas fotovoltaicos y almacenamiento inteligente para hogares y empresas.',
      aboutText: 'En Electsun lideramos la transición hacia un modelo energético sostenible y eficiente. Con más de una década de experiencia en el sector de las energías renovables, diseñamos soluciones llave en mano con componentes de máxima calidad (Tier 1) y garantías de hasta 25 años.',
      stat1Value: '50MW+',
      stat1Label: 'Energía Generada',
      stat2Value: '10k+',
      stat2Label: 'Clientes Satisfechos',
      stat3Value: '85%',
      stat3Label: 'Ahorro Medio en Factura',
      stat4Value: '15',
      stat4Label: 'Años de Experiencia',
    },
  });
  console.log('✅ Site config created');

  // Create social and contact links
  const socialLinks = [
    { platform: 'whatsapp', url: 'https://wa.me/18093786590', label: 'WhatsApp', handle: '809-378-6590', icon: 'whatsapp', order: 1, visible: true },
    { platform: 'linkedin', url: 'https://linkedin.com/company/electsun', label: 'LinkedIn', handle: 'Electsun Renovables', icon: 'linkedin', order: 2, visible: true },
    { platform: 'instagram', url: 'https://instagram.com/electsun_solar', label: 'Instagram', handle: '@electsun_solar', icon: 'instagram', order: 3, visible: true },
    { platform: 'email', url: 'mailto:servicioalcliente@electsun.do', label: 'Email Corporativo', handle: 'servicioalcliente@electsun.do', icon: 'email', order: 4, visible: true },
    { platform: 'phone', url: 'tel:+18093786590', label: 'Atención al Cliente', handle: '809-378-6590', icon: 'phone', order: 5, visible: true },
  ];

  for (const link of socialLinks) {
    await prisma.socialLink.create({ data: link });
  }
  console.log('✅ Social & contact links created');

  // Create sample solar projects
  const sampleProjects = [
    {
      title: 'Instalación Residencial Unifamiliar 6.4 kWp',
      description: 'Sistema fotovoltaico sobre cubierta inclinada de teja con 14 paneles monocristalinos de 460W e inversor híbrido Huawei con optimizadores de potencia.',
      client: 'Vivienda Particular',
      location: 'Pozuelo de Alarcón, Madrid',
      powerKw: '6.4 kWp',
      systemType: 'Residencial',
      savingsPercent: '78% de ahorro anual',
      imageUrl: '/uploads/project-solar-1.svg',
      category: 'Residencial',
      tags: JSON.stringify(['Residencial', 'Autoconsumo', 'Huawei', 'Tier 1']),
      featured: true,
      order: 1,
      completedYear: '2024',
    },
    {
      title: 'Planta de Autoconsumo Industrial 120 kWp',
      description: 'Instalación sobre cubierta de nave industrial logística. 260 paneles solares bifaciales de alta eficiencia con sistema de inyección cero y monitorización continua SCADA.',
      client: 'Logística TransIberia S.L.',
      location: 'Polígono Industrial Las Mercedes, Toledo',
      powerKw: '120 kWp',
      systemType: 'Industrial',
      savingsPercent: '65% de reducción energética',
      imageUrl: '/uploads/project-solar-2.svg',
      category: 'Industrial',
      tags: JSON.stringify(['Industrial', 'Alta Potencia', 'Inversor Central', 'SCADA']),
      featured: true,
      order: 2,
      completedYear: '2024',
    },
    {
      title: 'Sistema Híbrido con Batería de Litio 10 kWh',
      description: 'Autoconsumo residencial con acumulación electroquímica inteligente y función de respaldo (backup) anti-apagones ante cortes de red.',
      client: 'Familia Gómez',
      location: 'Las Rozas, Madrid',
      powerKw: '8.2 kWp + 10 kWh',
      systemType: 'Baterías',
      savingsPercent: '92% de independencia',
      imageUrl: '/uploads/project-solar-3.svg',
      category: 'Baterías',
      tags: JSON.stringify(['Baterías', 'Backup', 'Independencia', 'Litio']),
      featured: true,
      order: 3,
      completedYear: '2023',
    },
    {
      title: 'Electrolinera y Marquesina Solar 45 kWp',
      description: 'Estructura tipo marquesina para parking corporativo con 4 puntos de recarga rápida para vehículos eléctricos y gestión de carga dinámica.',
      client: 'Centro Empresarial Norte',
      location: 'Alcobendas, Madrid',
      powerKw: '45 kWp (4x22kW VE)',
      systemType: 'Puntos de Recarga',
      savingsPercent: '100% Recarga Verde',
      imageUrl: '/uploads/project-solar-4.svg',
      category: 'Puntos de Recarga',
      tags: JSON.stringify(['Movilidad Eléctrica', 'Marquesina', 'Recarga VE']),
      featured: true,
      order: 4,
      completedYear: '2024',
    },
    {
      title: 'Bombeo Solar Directo Agrícola 30 kWp',
      description: 'Solución aislada sin baterías para bombeo y riego por goteo de explotación agrícola de olivar y viñedos, eliminando costes de generadores diésel.',
      client: 'AgroExplotaciones del Tajo',
      location: 'Talavera de la Reina',
      powerKw: '30 kWp',
      systemType: 'Aislada / Agrícola',
      savingsPercent: '100% Cero Emisiones',
      imageUrl: '/uploads/project-solar-5.svg',
      category: 'Agrícola',
      tags: JSON.stringify(['Bombeo Solar', 'Agricultura', 'Aislada']),
      featured: false,
      order: 5,
      completedYear: '2023',
    },
  ];

  for (const project of sampleProjects) {
    await prisma.project.create({ data: project });
  }
  console.log('✅ Sample Electsun projects created');

  console.log('🎉 SQLite Seeding complete for Electsun!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
