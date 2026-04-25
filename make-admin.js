const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = "admin@nishad.com";
  
  const user = await prisma.user.findUnique({
    where: { email }
  });
  
  if (user) {
    console.log(`Found user ${email} with current role: ${user.role}`);
    await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" }
    });
    console.log(`Successfully updated ${email} role to ADMIN!`);
  } else {
    console.log(`User ${email} not found!`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
