import { createDB } from "..";
import { applicationTable } from "../schema";

export async function getAllApplications(env: string) {
  const db = createDB(env);
  return db
    .select()
    .from(applicationTable)
    .orderBy(applicationTable.date_applied);
}
