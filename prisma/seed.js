const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with consolidated program data...');

  // ── COURSES ──────────────────────────────────────────────
  const courses = [
    {
      id: 'course-qa-001',
      title: "QA Automation Engineering",
      description: "Master automated testing from scratch using Java, Selenium, Playwright, and CI/CD tools. Build a professional portfolio of test frameworks.",
      duration: "30 Days",
      level: "Beginner",
      technologies: "Java, Selenium WebDriver, Playwright, TestNG, Jenkins",
      features: "Real-world project testing, Resume building workshop, LinkedIn profile review",
      price: "1999",
      popular: true,
    },
    {
      id: 'course-playwright-005',
      title: "Playwright Automation Mastery",
      description: "Master end-to-end testing with Playwright using TypeScript and Java. Learn the most modern automation tool in the industry.",
      duration: "30 Days",
      level: "Advanced",
      technologies: "Playwright, TypeScript, Node.js",
      features: "Live Projects, 24/7 support",
      price: "1999",
      popular: true,
    },
    {
      id: 'course-mock-006',
      title: "QA Mock Interviews",
      description: "1-on-1 intensive mock interview session with industry experts to prepare you for top tech company interviews. Get personalized feedback.",
      duration: "1 Session",
      level: "All Levels",
      technologies: "QA, Playwright, Selenium, Java, HR",
      features: "1-on-1 Feedback, Resume Review, Technical Round Prep",
      price: "99",
      popular: true,
    },
    {
      id: 'course-ai-qa-007',
      title: "AI in QA & Test Automation",
      description: "Future-proof your career. Learn how to integrate LLMs into your testing strategy to generate scripts and analyze logs.",
      duration: "30 Days",
      level: "Advanced",
      technologies: "OpenAI, Prompt Engineering, Python",
      features: "AI Tool Integration, Automated Defect Triage, Prompt Engineering for QA",
      price: "1999",
      popular: true,
    },
    {
      id: 'course-fs-002',
      title: "Full-Stack Web Development",
      description: "Build scalable, production-ready web applications front-to-back using the modern MERN stack and Next.js.",
      duration: "30 Days",
      level: "Intermediate",
      technologies: "React, Next.js, Node.js, Express, MongoDB, TypeScript",
      features: "E-commerce capstone project, System design basics, REST & GraphQL APIs",
      price: "1999",
      popular: true,
    },
    {
      id: 'course-devops-003',
      title: "Cloud & DevOps Mastery",
      description: "Automate infrastructure, build CI/CD pipelines, and master AWS to bridge the gap between development and operations.",
      duration: "30 Days",
      level: "Advanced",
      technologies: "AWS, Docker, Kubernetes, Linux, Terraform",
      features: "AWS Certification prep, Microservices architecture, Cloud cost optimization",
      price: "1999",
      popular: true,
    },
    {
      id: 'course-java-004',
      title: "Core Java & Advanced OOP",
      description: "Build a rock-solid programming foundation with Core Java, OOP principles, Collections, Multithreading, and JDBC.",
      duration: "30 Days",
      level: "Beginner",
      technologies: "Java, OOP, Collections Framework, Multithreading",
      features: "Daily coding challenges, Doubt clearing sessions, Core concept deep dives",
      price: "1999",
      popular: false,
    },
    {
      id: 'course-python-008',
      title: "Python for Automation Engineers",
      description: "Master Python from scratch with a strict focus on test automation. Learn to build robust Pytest frameworks.",
      duration: "30 Days",
      level: "Beginner to Intermediate",
      technologies: "Python, Pytest, Playwright, REST APIs",
      features: "Live Code Reviews, API Automation Setup, Pytest Architecture",
      price: "1999",
      popular: false,
    }
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { id: course.id },
      update: course,
      create: course,
    });
  }

  console.log('✅ All courses synced');

  // ── USERS ─────────────────────────────────────────────────
  const hashedPwd = bcrypt.hashSync("password123", 10);

  await prisma.user.upsert({
    where: { email: "admin@nishad.com" },
    update: {},
    create: {
      name: "Nishad Admin",
      email: "admin@nishad.com",
      passwordHash: hashedPwd,
      role: "ADMIN"
    }
  });

  console.log('✅ Admin user synced');

  // ── FAQ ───────────────────────────────────────────────────
  const faqs = [
    { question: "Do I need a technical background to start?", answer: "No! Our courses are designed to take you from scratch to an expert level. We start with basics and gradually move to advanced concepts." },
    { question: "Will I get a certificate after completion?", answer: "Yes, you will receive an industry-recognized certificate from Nishad IT Solutions upon successful completion of your course and projects." },
    { question: "Is job placement assistance provided?", answer: "Absolutely. We offer dedicated placement support, including resume building, mock interviews, and referrals to our hiring partners." },
    { question: "Are the classes live or pre-recorded?", answer: "Most of our primary sessions are 100% Live Zoom sessions with expert mentors, accompanied by recorded backups for your future reference." }
  ];

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: `faq-${faq.question.slice(0, 10)}` },
      update: faq,
      create: { ...faq, id: `faq-${faq.question.slice(0, 10)}` },
    });
  }
  console.log('✅ FAQ data synced');

  // ── TESTIMONIALS ──────────────────────────────────────────
  const testimonials = [
    { name: "Priya Patel", role: "QA Engineer @ TCS", text: "The QA Automation course was extremely practical. I landed my first job within 2 months of completing the program. Highly recommend!", rating: 5 },
    { name: "Rahul Sharma", role: "Full-Stack Dev @ Infosys", text: "Best investment I ever made. The mentors have real industry experience and the batch schedule was perfect for working professionals.", rating: 5 },
    { name: "Sneha Deshpande", role: "DevOps Engineer @ Wipro", text: "The DevOps curriculum is up-to-date with the latest tools. The live sessions and hands-on projects gave me the confidence I needed.", rating: 5 },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${t.name.slice(0, 5)}` },
      update: t,
      create: { ...t, id: `testimonial-${t.name.slice(0, 5)}` },
    });
  }
  console.log('✅ Testimonials data synced');

  // ── SITE SETTINGS ────────────────────────────────────────
  await prisma.siteSetting.upsert({
    where: { key: 'countdown_date' },
    update: {},
    create: { key: 'countdown_date', value: '2026-06-01T00:00:00' }
  });
  console.log('✅ Site settings synced');

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
