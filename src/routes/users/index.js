import express from 'express';
import Joi from 'joi';
import db from '../../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM users');
  return res.send(rows);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);

  if (rows.length === 0) {
    res.status(404);
    return res.send('User not found');
  }

  return res.send(rows[0]);
})

router.post('/', async (req, res) => {
  const validationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = validationSchema.validate(req.body);

  if (error) {
    res.status(422);
    res.send(error.details[0].message);
    return;
  }

  const { email, password } = req.body;
  const { rows } = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
  res.status(201);
  return res.send(rows[0]);
})

export default router;