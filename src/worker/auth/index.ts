import { createAuthClient } from "@neondatabase/neon-js/auth";
import { BetterAuthReactAdapter } from "@neondatabase/neon-js/auth/react";

// export const client = createClient({
//   auth: {
//     adapter: BetterAuthReactAdapter(),
//     url: import.meta.env.VITE_NEON_AUTH_URL,
//   },
//   dataApi: {
//     url: import.meta.env.VITE_NEON_DATA_API_URL,
//   },
// });
export const authClient = createAuthClient(import.meta.env.VITE_NEON_AUTH_URL, {
  adapter: BetterAuthReactAdapter(),
});
