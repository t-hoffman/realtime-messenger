import "dotenv/config";
import mysql from "mysql2";
import { URL } from "url";
import { drizzle } from "drizzle-orm/mysql2";

declare global {
  var _db: ReturnType<typeof drizzle> | undefined;
}

const dbUrl = process.env.DATABASE_URL
  ? new URL(process.env.DATABASE_URL)
  : null;

if (!dbUrl) throw new Error("DATABASE_URL is not defined.");

const pool = mysql.createPool({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  port: dbUrl.port ? Number(dbUrl.port) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = globalThis._db || drizzle(pool);

if (process.env.NODE_ENV !== "production") {
  globalThis._db = db;
}

export default db;
export {
  ConversationTable,
  MessageTable,
  UserConversationsTable,
  UserTable,
} from "@/db/schema";
