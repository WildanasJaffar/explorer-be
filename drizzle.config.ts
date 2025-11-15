import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`,
  },
});