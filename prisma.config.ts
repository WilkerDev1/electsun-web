import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://solarsim_user:solarsim_secret_2026@solarsim-db:5432/electsun_prod",
  },
});
