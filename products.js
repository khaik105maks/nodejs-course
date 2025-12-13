const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Product 1', brand: 'Brand A' },
  { id: 2, name: 'Product 2', brand: 'Brand B' },
  { id: 3, name: 'Product 3', brand: 'Brand A' },
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:brand', (req, res, next) => {
  try {
    const { brand } = req.params;

    if (brand === 'Brand C') {
      const err = new Error('Unavailable Brand');
      err.status = 403;
      throw err;
    }

    const filtered = products.filter(p => p.brand === brand);
    res.json(filtered);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
