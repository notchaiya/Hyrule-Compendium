const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const port = Number(process.env.PORT || 3000);
const publicDirectory = path.join(__dirname, "../public");

const requiredEnvironmentVariables = [
  "DB_HOST",
  "DB_PORT",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
];

const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
  (name) => !process.env[name],
);

if (missingEnvironmentVariables.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvironmentVariables.join(", ")}`,
  );
}

app.use(express.json());
app.use(express.static(publicDirectory));

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/hyrule/category/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  try {
    const query = "SELECT * FROM hyruleData WHERE category = $1";
    const result = await pool.query(query, [categoryName]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API route not found" });
});

app.use((req, res, next) => {
  if (req.method === "GET" && req.accepts("html")) {
    return res.sendFile(path.join(publicDirectory, "index.html"));
  }

  return next();
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Hyrule Compendium is listening on port ${port}`);
});
