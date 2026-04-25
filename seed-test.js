const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding dummy data for testing...");

  // 1. Ensure Student exists
  let student = await prisma.user.findUnique({ where: { email: 'student@nishad.com' } });
  if (!student) {
    student = await prisma.user.create({
      data: {
        name: 'Demo Student',
        email: 'student@nishad.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'STUDENT'
      }
    });
  }

  // 2. Ensure Course exists
  let course = await prisma.course.findFirst({ where: { title: 'Playwright Automation Mastery' } });
  if (!course) {
    course = await prisma.course.create({
      data: {
        title: 'Playwright Automation Mastery',
        description: 'Master end-to-end testing with Playwright.',
        duration: '8 Weeks',
        level: 'Advanced',
        technologies: 'Playwright, TypeScript, Node.js',
        features: 'Live Projects, 24/7 Support',
        price: '4999',
        popular: true
      }
    });
  }

  // 3. Ensure Batch exists
  let batch = await prisma.batch.findFirst({ where: { courseId: course.id } });
  if (!batch) {
    batch = await prisma.batch.create({
      data: {
        name: 'Weekend Fast Track - Dec',
        startDate: new Date(),
        schedule: 'Sat-Sun 10AM to 1PM',
        courseId: course.id
      }
    });
  }

  // 4. Create PENDING enrollment so user can see payment button
  let enrollment = await prisma.enrollment.findUnique({
    where: { studentId_batchId: { studentId: student.id, batchId: batch.id } }
  });
  
  if (!enrollment) {
    enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        batchId: batch.id,
        paymentStatus: 'PENDING',
        progress: 0
      }
    });
    console.log("Successfully created PENDING enrollment for student@nishad.com!");
  } else if (enrollment.paymentStatus !== 'PENDING') {
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { paymentStatus: 'PENDING' }
    });
    console.log("Reset existing enrollment to PENDING status!");
  } else {
    console.log("Student already has a PENDING enrollment.");
  }

  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
