const pool = require('../db/sneakers');

exports.addSneakers = async (req, res) => {
    try {
        const { brand, name, imageUrl, sizes, price } = req.body;

        if (!brand || !name || !imageUrl || !sizes || !price) {
            return res.status(400).json({ error: 'Не все данные о кроссовках предоставлены' });
        }

        const sql = 'INSERT INTO sneakers (brand, name, image_url, sizes, price) VALUES (?, ?, ?, ?, ?)';

        const connection = await pool.getConnection();
        await connection.query(sql, [brand, name, imageUrl, sizes, price]);
        connection.release();

        console.log('Кроссовки успешно добавлены в базу данных!');

        res.status(201).json({ message: 'Новые кроссовки успешно добавлены' });
    } catch (error) {
        console.error('Ошибка при добавлении кроссовок:', error);
        res.status(500).json({ error: 'Ошибка при добавлении кроссовок' });
    }
};

exports.getUserSneakers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM sneakers';
        const connection = await pool.getConnection();
        const [sneakers] = await connection.query(sql);
        connection.release();

        if (!sneakers || sneakers.length === 0) {
            return res.status(404).json({ message: 'Кроссовки не найдены' });
        }
        res.status(200).json({ sneakers });
    } catch (error) {
        console.error('Ошибка при получении всех кроссовок:', error);
        res.status(500).json({ message: 'Ошибка при получении всех кроссовок' });
    }
};
exports.deleteSneaker = async (req, res) => {
    try {
      const { sneakerId } = req.params; 
      
      if (isNaN(sneakerId)) {
        return res.status(400).json({ message: 'Некорректный идентификатор кроссовок' });
      }
  
      const [result] = await pool.query('DELETE FROM sneakers WHERE id = ?', [sneakerId]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Кроссовки с указанным идентификатором не найдены' });
      }
  
      res.status(200).json({ message: 'Кроссовки успешно удалены!' });
    } catch (error) {
      console.error('Ошибка при удалении кроссовок:', error);
      res.status(500).json({ message: 'Ошибка при удалении кроссовок. Пожалуйста, попробуйте еще раз.' });
    }
};

exports.updateSneaker = async (req, res) => {
    try {
        const { sneakerId } = req.params;
        const { name, price, sizes, image_url } = req.body;

        if (isNaN(sneakerId)) {
            return res.status(400).json({ message: 'Некорректный идентификатор кроссовок' });
        }

        const [result] = await pool.query(
            'UPDATE sneakers SET name = ?, price = ?, sizes = ?, image_url = ? WHERE id = ?',
            [name, price, sizes, image_url, sneakerId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Кроссовки с указанным идентификатором не найдены' });
        }

        res.status(200).json({ message: 'Кроссовки успешно обновлены!' });
    } catch (error) {
        console.error('Ошибка при обновлении кроссовок:', error);
        res.status(500).json({ message: 'Ошибка при обновлении кроссовок. Пожалуйста, попробуйте еще раз.' });
    }
};

