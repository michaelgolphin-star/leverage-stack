import bcrypt from "bcryptjs";
import { prisma } from "./prisma.js";

async function main() {
  const ORG_ID = "demo-org"; // stable unique id for seeding

  const org = await prisma.org.upsert({
    where: { id: ORG_ID },
    update: { name: "DemoOrg" },
    create: { id: ORG_ID, name: "DemoOrg" },
  });

  const adminHash = await bcrypt.hash("admin1234", 10);

  await prisma.user.upsert({
    where: { orgId_username: { orgId: org.id, username: "admin" } },
    update: {},
    create: {
      orgId: org.id,
      username: "admin",
      passwordHash: adminHash,
      role: "admin",
    },
  });

  // Avoid duplicate orgPlan rows on repeated seeds
  await prisma.orgPlan.upsert({
    where: { orgId_planCode: { orgId: org.id, planCode: "starter" } },
    update: { status: "trialing" },
    create: { orgId: org.id, planCode: "starter", status: "trialing" },
  });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
