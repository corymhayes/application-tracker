import { eq } from "drizzle-orm";
import { createDB } from "..";
import { type SelectApplication, applicationTable } from "../schema";

export async function deleteApplication(
  env: string,
  id: SelectApplication["id"],
) {
  const db = createDB(env);
  await db.delete(applicationTable).where(eq(applicationTable.id, id));
}
