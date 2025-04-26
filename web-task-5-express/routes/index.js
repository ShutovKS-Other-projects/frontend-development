const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const rootDir = path.join(__dirname, '..');

router.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'public', 'pages', 'index.html'));
});
router.get('/info', (req, res) => {
    res.sendFile(path.join(rootDir, 'public', 'pages', 'info.html'));
});
router.get('/form', (req, res) => {
    res.sendFile(path.join(rootDir, 'public', 'pages', 'form.html'));
});
router.post('/form', (req, res) => {
    const {name, phone, message} = req.body;
    const entry = {name, phone, message, date: new Date().toISOString()};
    const filePath = path.join(rootDir, 'requests.json');
    const data = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
        : [];
    data.push(entry);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.sendFile(path.join(rootDir, 'public', 'pages', 'form-success.html'));
});
router.get('/requests', (req, res) => {
    res.sendFile(path.join(rootDir, 'public', 'pages', 'requests.html'));
});
router.get(['/landing', '/product'], (req, res) => {
    res.sendFile(path.join(rootDir, 'public', 'pages', 'landing.html'));
});

module.exports = router;
