import { Hono, type Next, type Context } from "hono";
import { validator } from "hono/validator";
import * as z from "zod";
import { type Application, applicationSchema } from "../applicationSchema";
import { getAllApplications } from "./db/queries/select";
import { insertApplication } from "./db/queries/insert";
import { deleteApplication } from "./db/queries/delete";
import { updateApplication } from "./db/queries/update";
import {
  findApplicationsInMonth,
  findInProgress,
  findResponseRate,
  getCurrentMonth,
  getPreviousMonth,
  pipelineValues,
} from "./utils/stats";
import * as jose from "jose";

type AppVariables = { userId: string };

type Env = {
  HYPERDRIVE: Hyperdrive;
};

const app = new Hono<{ Bindings: Env }>();

const JWKS = jose.createRemoteJWKSet(
  new URL(`${import.meta.env.VITE_NEON_AUTH_URL}/.well-known/jwks.json`),
);

const authMiddleware = async (
  c: Context<{ Variables: AppVariables }>,
  next: Next,
) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const token = authHeader.split(" ")[1];

  try {
    const { payload } = await jose.jwtVerify(token, JWKS, {
      issuer: new URL(import.meta.env.VITE_NEON_AUTH_URL).origin,
    });
    if (!payload.sub) {
      return c.json({ error: "Invalid Token" }, 401);
    }

    c.set("userId", payload.sub);
    await next();
  } catch (err) {
    console.error("Verification failed: ", err);
    return c.json({ error: "Invalid Token" }, 401);
  }
};

app.get("/api", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const data = await getAllApplications(
    c.env.HYPERDRIVE.connectionString,
    userId,
  );
  return c.json(data);
});

app.post(
  "/api",
  validator("json", (value, c) => {
    const result = applicationSchema.safeParse(value);
    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }
    return result.data;
  }),
  authMiddleware,
  async (c) => {
    const user_id = c.get("userId");
    const data = c.req.valid("json");
    const res = { ...data, user_id };
    await insertApplication(c.env.HYPERDRIVE.connectionString, res);
    return c.json("", { status: 200 });
  },
);

app.put(
  "/api/:id",
  validator("param", (value, c) => {
    const schema = z.object({ id: z.uuid() });
    const result = schema.safeParse(value);

    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }

    return result.data;
  }),
  validator("json", (value, c) => {
    const result = applicationSchema.safeParse(value);
    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }

    return result.data;
  }),
  authMiddleware,
  async (c) => {
    const id = c.req.valid("param");
    const data = c.req.valid("json");
    const user_id = c.get("userId");
    const res = { ...data, user_id };

    await updateApplication(c.env.HYPERDRIVE.connectionString, id.id, res);

    return c.json("", { status: 200 });
  },
);

app.delete("/api/:id", async (c) => {
  const id = c.req.param("id");
  await deleteApplication(c.env.HYPERDRIVE.connectionString, id);

  return c.json("", { status: 200 });
});

app.get("/api/stats", authMiddleware, async (c) => {
  const user_id = c.get("userId");
  const results: Application[] = await getAllApplications(
    c.env.HYPERDRIVE.connectionString,
    user_id,
  );
  const currentMonth = getCurrentMonth(results);
  const previousMonth = getPreviousMonth(results);
  return c.json({
    applications_in_month: findApplicationsInMonth(currentMonth, previousMonth),
    in_progress: findInProgress(currentMonth, previousMonth),
    response_rate: findResponseRate(currentMonth, previousMonth),
    pipeline: pipelineValues(results),
  });
});

export default app;
