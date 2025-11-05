const express = require('express');
require('dotenv').config();

const categoryRoutes = require('./src/routes/categoryRoutes');
const subcategoryRoutes = require('./src/routes/subcategoryRoutes');
const itemRoutes = require('./src/routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Menu Management API',
    endpoints: {
      categories: '/api/categories',
      subcategories: '/api/subcategories',
      items: '/api/items'
    }
  });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
