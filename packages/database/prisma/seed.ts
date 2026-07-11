import { PrismaClient, TemplateCategory } from '@prisma/client';

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
  // Seed ATS templates
  for (const name of atsTemplates) {
    await prisma.template.upsert({
      where: { slug: name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        category: TemplateCategory.ATS_FRIENDLY,
        atsScore: 90 + Math.floor(Math.random() * 8),
        industries: ['Technology', 'Business', 'Finance'],
        layout: { columns: 1, headerStyle: 'classic' },
      },
    });
  }

  // Seed Attractive templates
  for (const name of attractiveTemplates) {
    await prisma.template.upsert({
      where: { slug: name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        category: TemplateCategory.ATTRACTIVE,
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
