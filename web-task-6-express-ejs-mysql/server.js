// server.js
const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: false}));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/add_info', (req, res) => {
    res.render('add_info', { title: 'Добавить товар' });
});

app.post('/add_info', async (req, res, next) => {
    try {
        const {name, price, description} = req.body;
        const [result] = await db.execute(
            'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
            [name, price, description]
        );
        const insertId = result.insertId;
        res.render('add_result', {product: {id: insertId, name, price, description}});
    } catch (e) {
        next(e);
    }
});

app.get('/del', async (req, res, next) => {
    try {
        const [products] = await db.query('SELECT id, name, price, description FROM products');
        res.render('del', {products});
    } catch (e) {
        next(e);
    }
});

app.post('/del/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const [rows] = await db.execute('SELECT id, name, price, description FROM products WHERE id = ?', [id]);
        if (!rows.length) return res.status(404).send('Товар не найден');
        const product = rows[0];
        await db.execute('DELETE FROM products WHERE id = ?', [id]);
        res.render('del_result', {product});
    } catch (e) {
        next(e);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Что-то пошло не так');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
