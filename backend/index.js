const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const catalogue = require('./catalogue.json');
const users = require('./users.json');

const SECRET_KEY = 'wav_scrt_key';

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());


// GET product by id
app.get('/api/catalogue/:id', (req, res) => {
    const id = req.params.id;
    const product = catalogue.find(product => product.id.toString() === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Produit non trouvé" });
    }
});

// GET filtered products
app.get('/api/catalogue', (req, res) => {
    let filteredCatalogue = catalogue;
    const { type, query } = req.query;
    if (type && type !== 'Tous les types') {
        filteredCatalogue = filteredCatalogue.filter(product => product.album_type.toLowerCase() === type.toLowerCase());
    }
    if (query) {
        filteredCatalogue = filteredCatalogue.filter(product => product.album_name.toLowerCase().includes(query.toLowerCase()));
    }
    res.json(filteredCatalogue);
});


// POST login
app.post('/api/user/login', (req, res) => {
    const { login, password } = req.body;
    const user = users.find(user => user.login === login);
    
    if (user) {
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (passwordIsValid) {
            const token = jwt.sign({ id: user.id }, SECRET_KEY, {
                expiresIn: 86400 // 24 hours
            });
            res.setHeader('Authorization', 'Bearer ' + token);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid Password!' });
        }
    } else {
        res.status(404).json({ error: 'User Not Found!' });
    }
});

// GET users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// POST new user
app.post('/api/user', (req, res) => {
    const newUser = req.body;

    // Hash the password before storing it
    newUser.password = bcrypt.hashSync(newUser.password, 8);

    // Ajouter l'ID automatique pour les nouveaux utilisateurs
    newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(newUser);

    // Sauvegarder les utilisateurs dans users.json
    fs.writeFile('./users.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error saving users:', err);
            res.status(500).json({ error: "Erreur lors de la sauvegarde des utilisateurs" });
        } else {
            res.json(newUser);
        }
    });
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
