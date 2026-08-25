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
      title: 'Instalación Residencial Premium 8.5 kWp',
      description: 'Sistema fotovoltaico sobre cubierta con paneles monocristalinos de alta eficiencia e inversor híbrido inteligente con monitoreo en tiempo real.',
      client: 'Residencia Familiar',
      location: 'Santo Domingo Este, RD',
      powerKw: '8.5 kWp',
      systemType: 'Residencial',
      savingsPercent: '82% de ahorro en factura',
      imageUrl: '/images/project-residential.jpg',
      category: 'Residencial',
      tags: JSON.stringify(['Residencial', 'Autoconsumo', 'Tier 1']),
      featured: true,
      order: 1,
      completedYear: '2024',
    },
    {
      title: 'Planta de Autoconsumo Industrial 250 kWp',
      description: 'Instalación sobre cubierta de centro logístico industrial con 540 paneles bifaciales de alta potencia y sistema de inyección cero.',
      client: 'Centro Logístico Corporativo',
      location: 'Haina, San Cristóbal, RD',
      powerKw: '250 kWp',
      systemType: 'Industrial',
      savingsPercent: '70% de reducción energética',
      imageUrl: '/images/project-commercial.jpg',
      category: 'Industrial',
      tags: JSON.stringify(['Industrial', 'Alta Potencia', 'SCADA']),
      featured: true,
      order: 2,
      completedYear: '2024',
    },
    {
      title: 'Sistema de Almacenamiento & Inversores Híbridos',
      description: 'Sala de control de potencia con inversores híbridos y banco de baterías de litio con respaldo ininterrumpido ante cortes de red.',
      client: 'Complejo Comercial & Oficinas',
      location: 'Santiago de los Caballeros, RD',
      powerKw: '45 kWp + 30 kWh',
      systemType: 'Baterías & Inversores',
      savingsPercent: '95% de estabilidad energética',
      imageUrl: '/images/project-inverters.jpg',
      category: 'Baterías',
      tags: JSON.stringify(['Inversores', 'Baterías', 'Respaldo']),
      featured: true,
      order: 3,
      completedYear: '2024',
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
