const express = require('express');
const { eq } = require('drizzle-orm');
const db = require('../db');
const { products } = require('../db/schema');

const router = express.Router();

router.post('/products', async (request, response) => {
  const { body } = request;

  await db.insert(products).values(body);

  return response.sendStatus(201);
});

router.get('/products', async (request, response) => {
  const products = await db.query.products.findMany();

  return response.json(products);
});

router.get('/users/:id/products', async (request, response) => {
  const { id } = request.params;

  const userProducts = await db.query.products.findMany({
    where: eq(products.userId, +id)
  });

  return response.json(userProducts);
});

module.exports = router;