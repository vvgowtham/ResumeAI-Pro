import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const atsTemplates = [
  'Clean Professional', 'Executive', 'Corporate', 'Modern ATS', 'Simple ATS',
  'Compact ATS', 'Harvard', 'Oxford', 'Stanford', 'Google',
  'Microsoft', 'Amazon', 'Meta', 'Apple', 'QA Engineer',
  'Software Engineer', 'Developer', 'Product Manager', 'Business Analyst', 'Finance',
  'Healthcare', 'Legal', 'Education', 'Minimal ATS', 'International ATS',
];

const attractiveTemplates = [
  'Canva Style', 'Creative', 'Premium', 'Luxury', 'Portfolio',
  'Timeline', 'Modern Gradient', 'Glassmorphism', 'Dark Mode', 'Purple',
  'Blue', 'Green', 'Orange', 'Red', 'Gold',
  'Startup', 'Magazine', 'Neo Brutalism', 'Elegant', 'Corporate Premium',
  'Professional Designer', 'Minimal Color', 'Creative Blocks', 'Designer CV', 'Resume Pro',
];

async function main() {
  console.log('Seeding templates...');

  for (const name of atsTemplates) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    await prisma.template.upsert({
      where: { slug },
      update: {},
      create: {
        name,
        slug,
        category: 'ATS_FRIENDLY',
        atsScore: 90 + Math.floor(Math.random() * 8),
        industries: ['Technology', 'Business', 'Finance'],
        layout: { columns: 1, headerStyle: 'classic' },
      },
    });
  }

  for (const name of attractiveTemplates) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    await prisma.template.upsert({
      where: { slug },
      update: {},
      create: {
        name,
        slug,
        category: 'ATTRACTIVE',
        atsScore: 75 + Math.floor(Math.random() * 15),
        industries: ['Design', 'Marketing', 'Creative'],
        isPremium: Math.random() > 0.5,
        layout: { columns: 2, headerStyle: 'modern' },
      },
    });
  }

  console.log('Seeded 50 templates successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
