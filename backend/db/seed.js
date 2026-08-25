const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const rawData = fs.readFileSync(path.join(__dirname, "../data/hyrule.json"));
const hyruleData = JSON.parse(rawData);

const OLD_IMAGE_URL_PREFIX = "https://botw-compendium.herokuapp.com/api/v3/";
const NEW_IMAGE_URL_PREFIX = "https://api.hyrule-compendium.com/v3/";

function normalizeImageUrl(image) {
  if (!image) return null;

  return image.replace(OLD_IMAGE_URL_PREFIX, NEW_IMAGE_URL_PREFIX);
}

async function seedDatabase() {
  try {
    await client.connect();
    console.log("Connected to database.");

    await client.query("DROP TABLE IF EXISTS hyruleData");
    const createTableQuery = `
    CREATE TABLE hyruleData(
      id INTEGER PRIMARY KEY,
      name VARCHAR(100),
      category VARCHAR(50),
      common_locations TEXT[],
      cooking_effect VARCHAR(100),
      description TEXT,
      dlc BOOLEAN,
      edible BOOLEAN,
      hearts_recovered FLOAT,
      drops TEXT[],
      image TEXT,
      properties JSONB )
      `;
    await client.query(createTableQuery);
    console.log("Table created!");
    for (const hyrule of hyruleData.data) {
      const insertQuery = `
      INSERT INTO hyruleData (
      id, name, category, common_locations, cooking_effect,description,
      dlc, edible, hearts_recovered,drops, image, properties)
      VALUES($1,$2,$3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `;
      const values = [
        hyrule.id,
        hyrule.name,
        hyrule.category,
        hyrule.common_locations || null,
        hyrule.cooking_effect || null,
        hyrule.description,
        hyrule.dlc ?? null,
        hyrule.edible ?? null,
        hyrule.hearts_recovered ?? null,
        hyrule.drops || null,
        normalizeImageUrl(hyrule.image),
        hyrule.properties || null,
      ];
      await client.query(insertQuery, values);
      console.log(`Inserted ${hyrule.name}`);
    }
    console.log("All data seeded successfully!");
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
    console.log("disconnected!");
  }
}
seedDatabase();
