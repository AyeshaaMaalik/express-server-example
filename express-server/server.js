const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const users = [];
const products = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 150 },
    { id: 3, name: 'Product C', price: 200 },
];

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { username, password }; 
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', username });
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
