import { createDB } from "..";
import { type InsertApplication, applicationTable } from "../schema";

export async function insertApplication(env: string, data: InsertApplication) {
  const db = createDB(env);
  await db.insert(applicationTable).values(data);
}
