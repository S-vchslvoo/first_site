const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productsRouter = require('./routes/productsRouter');
const cartRoutes = require('./routes/cartRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sneakers', productsRouter);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
