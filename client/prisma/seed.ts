import { FullCategory } from '../src/types/category';
import { prisma } from '../src/lib/prisma';
import { parseArgs } from 'node:util';
import bcrypt from 'bcryptjs';
import seeds from './data';
import { Role } from '@prisma/client';

const options = {
  environment: { type: 'string' },
};

async function main() {
  const {
    values: { environment },
  } = parseArgs<{}>({ options: options });

  let categories: (Pick<FullCategory, 'title'> & {
    subCategories: { title: string }[];
  })[] = [];

  switch (environment) {
    case 'development':
      categories = categories.concat(seeds.categories);
      break;
    case 'test':
      categories = categories.concat(seeds.categories);
      break;
    default:
      break;
  }

  console.log('Seeding root user ...');
  const rootUser = {
    email: 'theophilusighalo@gmail.com',
    hashedPassword: await bcrypt.hash('P@ssw0rd', 8),
    role: Role.ADMIN,
  };

  const user = await prisma.user.upsert({
    where: { email: rootUser.email },
    update: { ...rootUser },
    create: {
      ...rootUser,
      instructor: { create: {} },
    },
  });
  console.log('Root user seeded');

  console.log('Seeding Categories & SubCategories ...');
  categories.forEach(async ({ title, subCategories, ...rest }) => {
    const category = await prisma.category.upsert({
      where: { title },
      update: {},
      create: {
        title,
        ...rest,
        subCategories: {
          createMany: {
            data: subCategories,
          },
        },
      },
    });

    console.log(category);
  });
  console.log('Categories & SubCategories Seeded');

  console.log('Seeding Courses ...');
  seeds.courses.forEach(
    async ({ title, wsl, attachments, chapters, category, ...rest }) => {
      const existingCategory = await prisma.subCategory.findUnique({
        where: { title: category },
      });
      if (existingCategory) {
        const course = await prisma.course.upsert({
          where: { title },
          update: {
            categoryId: existingCategory.id,
          },
          create: {
            title,
            authorId: user.id,
            categoryId: existingCategory.id,
            ...rest,
            wsl: {
              createMany: {
                data: wsl,
              },
            },
            chapters: {
              createMany: {
                data: chapters,
              },
            },
            // attachments: {
            //   createMany: {
            //     data: attachments,
            //   },
            // },
          },
        });
        console.log(course);
      }
    }
  );
  console.log('Courses Seeded');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
