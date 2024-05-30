const shoppingCartPool = require('../db/shopping_cart');
const sneakersPool = require('../db/sneakers');
const pool = require('../db/connection');

exports.getCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    const [rows, fields] = await shoppingCartPool.query(`
      SELECT s.id, s.brand, s.name, s.image_url, s.sizes, s.price
      FROM cart c
      JOIN sneakers.sneakers s ON c.product_id = s.id
      WHERE c.user_id = ?
    `, [userId]);
    res.json(rows);
    console.log('SQL запрос:', `
      SELECT s.id, s.brand, s.name, s.image_url, s.sizes, s.price
      FROM cart c
      JOIN sneakers.sneakers s ON c.product_id = s.id
      WHERE c.user_id = ?
    `);
    console.log('Параметры:', [userId]);
    console.log('Результат запроса:', rows);
  } catch (error) {
    console.error('Ошибка при получении содержимого корзины:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};


exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log('Добавление в корзину:', userId, productId, quantity); 

  try {
    await shoppingCartPool.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)', [userId, productId]);
    res.status(201).json({ message: 'Товар успешно добавлен в корзину' });
  } catch (error) {
    console.error('Ошибка при добавлении товара в корзину:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

exports.checkCartItem = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  try {
    const [rows, fields] = await shoppingCartPool.query('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);

    if (rows.length > 0) {
      res.json({ isInCart: true });
    } else {
      res.json({ isInCart: false });
    }
  } catch (error) {
    console.error('Ошибка при проверке наличия товара в корзине:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

exports.removeFromCart = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  try {
    await shoppingCartPool.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);
    res.json({ message: 'Товар успешно удален из корзины' });
  } catch (error) {
    console.error('Ошибка при удалении товара из корзины:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

exports.purchaseItem = async (req, res) => {
  const { userId, country, city, street, houseNumber, phone } = req.body;

  try {
    const existingPurchaseQuery = `
      SELECT * FROM purchases WHERE user_id = ?;
    `;
    const [existingPurchase] = await pool.query(existingPurchaseQuery, [userId]);

    if (existingPurchase.length) {
      const updatePurchaseQuery = `
        UPDATE purchases
        SET country = ?, city = ?, street = ?, house_number = ?, phone = ?
        WHERE user_id = ?;
      `;
      await pool.query(updatePurchaseQuery, [country, city, street, houseNumber, phone, userId]);
    } else {
      const insertPurchaseQuery = `
        INSERT INTO purchases (user_id, country, city, street, house_number, phone)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      await pool.query(insertPurchaseQuery, [userId, country, city, street, houseNumber, phone]);
    }

   

    res.status(200).json({ message: 'Покупка успешно оформлена' });
  } catch (error) {
    console.error('Ошибка при оформлении покупки:', error);
    await pool.query('ROLLBACK');
    res.status(500).json({ message: 'Ошибка при оформлении покупки' });
  }
};

exports.getPurchaseDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log('Getting purchase details for user:', userId); 
    const purchaseQuery = `
      SELECT * FROM purchases WHERE user_id = ?;
    `;
    const [purchase] = await pool.query(purchaseQuery, [userId]);

    console.log('Purchase details:', purchase); 

    if (purchase.length) {
      res.status(200).json(purchase[0]);
    } else {
      res.status(404).json({ message: 'Данные о покупке не найдены' });
    }
  } catch (error) {
    console.error('Ошибка при получении данных о покупке:', error);
    res.status(500).json({ message: 'Ошибка при получении данных о покупке' });
  }
};
