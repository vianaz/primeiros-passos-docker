import express from 'express';
import pool from '../../db/pool.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await pool.connect();
    await db.query('SELECT NOW()');

    res.status(200);
    res.json({
      status: 'success',
      health: {
        db: true,
        app: true,
      }
    })
  } catch (error) {
    res.status(500);
    res.json({
      status: 'error',
      error: error.message,
    })
  }
})

export default router;