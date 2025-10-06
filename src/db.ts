import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.POSTGRES_HOST || "localhost",
  user: process.env.POSTGRES_USER || "testuser",
  password: process.env.POSTGRES_PASSWORD || "testpass",
  database: process.env.POSTGRES_DB || "testdb",
  port: 5432,
});
