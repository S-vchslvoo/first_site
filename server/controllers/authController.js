require('dotenv').config();
const pool = require('../db/connection');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const connection = await pool.getConnection();
    
    const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    await connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    
    const [user] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);
    const userId = user[0].id;

    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    connection.release();
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', token });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Попытка авторизации с данными:', { username, password });

    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    connection.release();

    if (username === 'admin' && password === 'admin') {
      console.log('Успешная авторизация для администратора:', username);
      const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(201).json({ message: 'Успешная авторизация для администратора', isAdmin: true, token });
    } else if (rows.length > 0) {
      console.log('Успешная авторизация для пользователя:', username);
      const userId = rows[0].id;
      console.log('ID пользователя:', userId);
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ message: 'Успешная авторизация', token, userId });
      
    } else {
      console.log('Ошибка авторизации: неправильное имя пользователя или пароль');
      res.status(401).json({ error: 'Неправильное имя пользователя или пароль' });
    }
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    res.status(500).json({ error: 'Ошибка при авторизации пользователя' });
  }
};
