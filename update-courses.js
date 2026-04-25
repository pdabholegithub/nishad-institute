const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Updating existing courses...");
  
  // Update all existing courses to price 1999 and duration "30 Days"
  await prisma.course.updateMany({
    data: {
      price: "1999",
      duration: "30 Days"
    }
  });
  
  // Check if "QA Mock Interviews" already exists
  const existing = await prisma.course.findFirst({
    where: { title: "QA Mock Interviews" }
  });
  
  if (!existing) {
    console.log("Creating QA Mock Interviews course...");
    await prisma.course.create({
      data: {
        title: "QA Mock Interviews",
        description: "1-on-1 intensive mock interview session with industry experts to prepare you for top tech company interviews. Get personalized feedback and tips.",
        duration: "1 Session",
        level: "All Levels",
        technologies: "QA, Playwright, Selenium, Java, JavaScript, HR",
        features: "1-on-1 Feedback, Resume Review, Technical Round Prep, HR Round Prep",
        price: "99",
        popular: true
      }
    });
  } else {
    console.log("QA Mock Interviews course already exists, updating its price and duration...");
    await prisma.course.update({
      where: { id: existing.id },
      data: {
        price: "99",
        duration: "1 Session"
      }
    });
  }
  
  console.log("All courses updated successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
