const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with demo data...');

  // ── COURSES ──────────────────────────────────────────────
  const course1 = await prisma.course.upsert({
    where: { id: 'course-qa-001' },
    update: {},
    create: {
      id: 'course-qa-001',
      title: "QA Automation Engineering",
      description: "Master automated testing from scratch using Java, Selenium, Playwright, and CI/CD tools. Build a professional portfolio of test frameworks and land your first QA role with confidence.",
      duration: "4 Months",
      level: "Beginner",
      technologies: "Java,Selenium WebDriver,Playwright,TestNG,Jenkins,JIRA",
      features: "Real-world project testing,Resume building workshop,LinkedIn profile review,Live Zoom classes,Interview prep sessions,Lifetime access to notes",
      price: "15000",
      popular: true,
    }
  });

  const course2 = await prisma.course.upsert({
    where: { id: 'course-fs-002' },
    update: {},
    create: {
      id: 'course-fs-002',
      title: "Full-Stack Web Development",
      description: "Build scalable, production-ready web applications front-to-back using the modern MERN stack and Next.js. Become a versatile developer capable of handling everything from databases to UIs.",
      duration: "6 Months",
      level: "Intermediate",
      technologies: "React,Next.js,Node.js,Express,MongoDB,TypeScript,TailwindCSS",
      features: "E-commerce capstone project,System design basics,REST & GraphQL APIs,1-on-1 mentorship,Deployment on Vercel & AWS,GitHub portfolio review",
      price: "25000",
      popular: false,
    }
  });

  const course3 = await prisma.course.upsert({
    where: { id: 'course-devops-003' },
    update: {},
    create: {
      id: 'course-devops-003',
      title: "Cloud & DevOps Mastery",
      description: "Automate infrastructure, build CI/CD pipelines, and master AWS to bridge the gap between development and operations. Prepare for AWS Solutions Architect certification.",
      duration: "5 Months",
      level: "Advanced",
      technologies: "AWS,Docker,Kubernetes,Linux,Terraform,GitHub Actions,Ansible",
      features: "AWS Certification prep,Microservices architecture,Cloud cost optimization,Real client infra setup,Kubernetes cluster management",
      price: "20000",
      popular: false,
    }
  });

  const course4 = await prisma.course.upsert({
    where: { id: 'course-java-004' },
    update: {},
    create: {
      id: 'course-java-004',
      title: "Core Java & Advanced OOP",
      description: "Build a rock-solid programming foundation with Core Java, OOP principles, Collections, Multithreading, and JDBC. The essential starting point for any software career.",
      duration: "3 Months",
      level: "Beginner",
      technologies: "Java,OOP,Collections Framework,Multithreading,JDBC,Maven",
      features: "Daily coding challenges,Doubt clearing sessions,Core concept deep dives,Mini project assignments,Certification of completion",
      price: "8000",
      popular: false,
    }
  });

  console.log('✅ Courses created');

  // ── USERS ─────────────────────────────────────────────────
  const hashedPwd = bcrypt.hashSync("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@nishad.com" },
    update: {},
    create: {
      name: "Nishad Admin",
      email: "admin@nishad.com",
      passwordHash: hashedPwd,
      role: "ADMIN"
    }
  });

  const instructor1 = await prisma.user.upsert({
    where: { email: "instructor@nishad.com" },
    update: {},
    create: {
      name: "Ramesh Kedari",
      email: "instructor@nishad.com",
      passwordHash: hashedPwd,
      role: "INSTRUCTOR"
    }
  });

  const student1 = await prisma.user.upsert({
    where: { email: "student@nishad.com" },
    update: {},
    create: {
      name: "Rahul Sharma",
      email: "student@nishad.com",
      passwordHash: hashedPwd,
      role: "STUDENT"
    }
  });

  const student2 = await prisma.user.upsert({
    where: { email: "priya@example.com" },
    update: {},
    create: {
      name: "Priya Patel",
      email: "priya@example.com",
      passwordHash: hashedPwd,
      role: "STUDENT"
    }
  });

  const student3 = await prisma.user.upsert({
    where: { email: "amit@example.com" },
    update: {},
    create: {
      name: "Amit Singh",
      email: "amit@example.com",
      passwordHash: hashedPwd,
      role: "STUDENT"
    }
  });

  const student4 = await prisma.user.upsert({
    where: { email: "sneha@example.com" },
    update: {},
    create: {
      name: "Sneha Deshpande",
      email: "sneha@example.com",
      passwordHash: hashedPwd,
      role: "STUDENT"
    }
  });

  console.log('✅ Users created');

  // ── BATCHES ───────────────────────────────────────────────
  const batch1 = await prisma.batch.upsert({
    where: { id: 'batch-qa-summer-2026' },
    update: {},
    create: {
      id: 'batch-qa-summer-2026',
      name: "QA-SUM-2026",
      startDate: new Date("2026-06-01"),
      schedule: "Tue & Thu, 7:00 PM - 9:00 PM",
      courseId: course1.id,
      instructorId: instructor1.id,
    }
  });

  const batch2 = await prisma.batch.upsert({
    where: { id: 'batch-fs-apr-2026' },
    update: {},
    create: {
      id: 'batch-fs-apr-2026',
      name: "FULLSTACK-APR-2026",
      startDate: new Date("2026-04-15"),
      schedule: "Mon, Wed & Fri, 8:00 PM - 10:00 PM",
      courseId: course2.id,
      instructorId: instructor1.id,
    }
  });

  const batch3 = await prisma.batch.upsert({
    where: { id: 'batch-devops-may-2026' },
    update: {},
    create: {
      id: 'batch-devops-may-2026',
      name: "DEVOPS-MAY-2026",
      startDate: new Date("2026-05-10"),
      schedule: "Sat & Sun, 10:00 AM - 12:00 PM",
      courseId: course3.id,
    }
  });

  const batch4 = await prisma.batch.upsert({
    where: { id: 'batch-java-apr-2026' },
    update: {},
    create: {
      id: 'batch-java-apr-2026',
      name: "JAVA-APR-2026",
      startDate: new Date("2026-04-20"),
      schedule: "Mon & Wed, 6:00 PM - 8:00 PM",
      courseId: course4.id,
      instructorId: instructor1.id,
    }
  });

  console.log('✅ Batches created');

  // ── ENROLLMENTS ───────────────────────────────────────────
  const enrollments = [
    { studentId: student1.id, batchId: batch1.id, paymentStatus: "PAID",    progress: 65 },
    { studentId: student1.id, batchId: batch4.id, paymentStatus: "PAID",    progress: 30 },
    { studentId: student2.id, batchId: batch2.id, paymentStatus: "PAID",    progress: 50 },
    { studentId: student2.id, batchId: batch1.id, paymentStatus: "PENDING", progress: 0  },
    { studentId: student3.id, batchId: batch3.id, paymentStatus: "PAID",    progress: 20 },
    { studentId: student4.id, batchId: batch2.id, paymentStatus: "PAID",    progress: 75 },
    { studentId: student4.id, batchId: batch4.id, paymentStatus: "PENDING", progress: 0  },
  ];

  for (const e of enrollments) {
    await prisma.enrollment.upsert({
      where: { studentId_batchId: { studentId: e.studentId, batchId: e.batchId } },
      update: { paymentStatus: e.paymentStatus, progress: e.progress },
      create: e,
    });
  }

  console.log('✅ Enrollments created');
  console.log('');
  console.log('🎉 Seeding complete! Demo accounts:');
  console.log('   Admin:      admin@nishad.com      / password123');
  console.log('   Student 1:  student@nishad.com    / password123');
  console.log('   Student 2:  priya@example.com     / password123');
  console.log('   Instructor: instructor@nishad.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
