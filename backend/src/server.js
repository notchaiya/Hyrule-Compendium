const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST, // localhost:5432
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/api/hyrule/category/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  try {
    const query = "SELECT * FROM hyruleData WHERE category =$1";
    const result = await pool.query(query, [categoryName]);
    res.json(result.rows);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`server has started on ${port}`);
});
