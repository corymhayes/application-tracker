import { drizzle } from "drizzle-orm/node-postgres";

export function createDB(env: string) {
  return drizzle({
    connection: {
      connectionString: env,
    },
  });
}
