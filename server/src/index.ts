import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { assertEnv, env } from "./env.js";

assertEnv();

const app = express();
app.set("trust proxy", 1);
app.use(cors({ origin: env.APP_ORIGIN, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(env.PORT, () => console.log(`[server] http://localhost:${env.PORT}`));
