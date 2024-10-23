import pool from "./pool.js";

const db = await pool.connect();

export default db;