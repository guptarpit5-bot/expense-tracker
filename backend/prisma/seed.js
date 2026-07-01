import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding database with plain text passwords...');

  // Clean existing data
  await prisma.expense.deleteMany();
  await prisma.user.deleteMany();

  // Seed Users with plain text passwords (no hashing)
  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      password: 'password123',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      password: 'password123',
    },
  });

  console.log(`Created user1 (id: ${user1.id}) and user2 (id: ${user2.id})`);

  // Seed Expenses for user1
  const expensesUser1 = [
    {
      title: 'Groceries at D-Mart',
      amount: 1250.00,
      category: 'Food',
      expenseDate: new Date('2026-06-25T10:00:00Z'),
      description: 'Monthly grocery shopping',
      userId: user1.id,
    },
    {
      title: 'Monthly Rent Payment',
      amount: 15000.00,
      category: 'Other',
      expenseDate: new Date('2026-06-01T09:00:00Z'),
      description: 'Apartment rent',
      userId: user1.id,
    },
    {
      title: 'Train Ticket to Mumbai',
      amount: 450.00,
      category: 'Travel',
      expenseDate: new Date('2026-06-20T14:30:00Z'),
      description: 'Weekend travel to home town',
      userId: user1.id,
    },
    {
      title: 'Mobile Recharge',
      amount: 299.00,
      category: 'Bills',
      expenseDate: new Date('2026-06-15T11:00:00Z'),
      description: 'Prepaid mobile pack recharge',
      userId: user1.id,
    },
  ];

  // Seed Expenses for user2
  const expensesUser2 = [
    {
      title: 'Dinner at Punjabi Rasoi',
      amount: 850.00,
      category: 'Food',
      expenseDate: new Date('2026-06-28T20:30:00Z'),
      description: 'Dinner with colleagues',
      userId: user2.id,
    },
    {
      title: 'Uber Ride to Office',
      amount: 320.00,
      category: 'Travel',
      expenseDate: new Date('2026-06-29T08:45:00Z'),
      description: 'Commute during rainy day',
      userId: user2.id,
    },
    {
      title: 'New Sneakers',
      amount: 2499.00,
      category: 'Shopping',
      expenseDate: new Date('2026-06-10T16:00:00Z'),
      description: 'Purchased sports shoes from Nike store',
      userId: user2.id,
    },
    {
      title: 'Netflix Subscription',
      amount: 649.00,
      category: 'Entertainment',
      expenseDate: new Date('2026-06-05T00:00:00Z'),
      description: 'Premium monthly subscription plan',
      userId: user2.id,
    },
  ];

  // Insert Expenses
  for (const exp of expensesUser1) {
    await prisma.expense.create({ data: exp });
  }

  for (const exp of expensesUser2) {
    await prisma.expense.create({ data: exp });
  }

  console.log('Seeding finished successfully.');
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
