// import { eq } from "drizzle-orm";
// import { createDB } from "..";
// import { type SelectApplication, applicationTable } from "../schema";

// export async function updateApplication(
//   env: string,
//   id: SelectApplication["id"],
//   data: Partial<Omit<SelectApplication, "id">>,
// ) {
//   const db = createDB(env);
//   await db
//     .update(applicationTable)
//     .set(data)
//     .where(eq(applicationTable.id, id));
// }
