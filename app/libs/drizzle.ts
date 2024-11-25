import "dotenv/config";
import mysql from "mysql2";
import { URL } from "url";
import { drizzle } from "drizzle-orm/mysql2";

declare global {
  var _db: ReturnType<typeof drizzle> | undefined;
}

const dbUrl = process.env.NEXT_PUBLIC_DATABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_DATABASE_URL)
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
  idleTimeout: 60000,
});

const db = globalThis._db || drizzle(pool);

if (process.env.NODE_ENV !== "production") {
  globalThis._db = db;
}

let isShutdownListenerAdded = false;

async function shutdown(signal: string) {
  if (isShutdownListenerAdded) return;
  isShutdownListenerAdded = true;

  console.log(`Received ${signal}. Closing resources...`);

  pool.end((err) => {
    if (err) {
      console.error("Error closing the database pool:", err);
      process.exit(1);
    } else {
      console.log("Database pool closed.");
      process.exit(0);
    }
  });
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));

export default db;
export {
  ConversationTable,
  MessageTable,
  UserConversationsTable,
  UserTable,
} from "@/db/schema";
