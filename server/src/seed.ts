import bcrypt from "bcryptjs";
import { prisma } from "./prisma.js";

async function main() {
  const org = await prisma.org.upsert({
    where: { name: "DemoOrg" },
    update: {},
    create: { name: "DemoOrg" }
  });

  const adminHash = await bcrypt.hash("admin1234", 10);
  await prisma.user.upsert({
    where: { orgId_username: { orgId: org.id, username: "admin" } },
    update: {},
    create: { orgId: org.id, username: "admin", passwordHash: adminHash, role: "admin" }
  });

  await prisma.orgPlan.create({ data: { orgId: org.id, planCode: "starter", status: "trialing" } });

  console.log("Seed complete");
}
main().finally(async ()=> prisma.$disconnect());
