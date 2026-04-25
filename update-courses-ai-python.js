const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Adding new Python & AI courses...");
  
  // 1. Check & Add Python Course
  const pythonCourse = await prisma.course.findFirst({
    where: { title: "Python for Automation Engineers" }
  });
  
  if (!pythonCourse) {
    await prisma.course.create({
      data: {
        title: "Python for Automation Engineers",
        description: "Master Python from scratch with a strict focus on test automation. Learn to build robust Pytest frameworks and automate backend APIs.",
        duration: "30 Days",
        level: "Beginner to Intermediate",
        technologies: "Python, Pytest, Playwright, REST APIs",
        features: "Live Code Reviews, API Automation Setup, Pytest Architecture",
        price: "1999",
        popular: false
      }
    });
    console.log("Added Python course!");
  } else {
    console.log("Python course already exists.");
  }

  // 2. Check & Add AI Course
  const aiCourse = await prisma.course.findFirst({
    where: { title: "AI in QA & Test Automation" }
  });
  
  if (!aiCourse) {
    await prisma.course.create({
      data: {
        title: "AI in QA & Test Automation",
        description: "Future-proof your career. Learn how to integrate LLMs (like ChatGPT & Claude) into your testing strategy to generate scripts, analyze logs, and predict flaky tests.",
        duration: "30 Days",
        level: "Advanced",
        technologies: "OpenAI, Prompt Engineering, Python, CI/CD AI Tools",
        features: "AI Tool Integration, Automated Defect Triage, Prompt Engineering for QA",
        price: "1999",
        popular: true
      }
    });
    console.log("Added AI course!");
  } else {
    console.log("AI course already exists.");
  }
  
  console.log("Database update complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
