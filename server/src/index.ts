import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { assertEnv, env } from "./env.js";

assertEnv();

const app = express();
app.set("trust proxy", 1);

app.use(cors({ origin: env.APP_ORIGIN, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

/**
 * SERVE CLIENT IN PRODUCTION
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.join(__dirname, "../../client/dist");

app.use(express.static(clientDist));

app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(env.PORT, () => {
  console.log([server] running on port );
});
