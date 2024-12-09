const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Bienvenue sur MD7 Creation!');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});


const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware pour analyser les données JSON
app.use(bodyParser.json());

// ** Remplacez cette URL par votre propre URI MongoDB **
const DB_URI = 'mongodb://127.0.0.1:27017/md7creation';

// Connexion à MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Modèle utilisateur
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// ** Route d'inscription **
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Nom d\'utilisateur déjà utilisé');
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Sauvegarder l'utilisateur
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).send('Utilisateur inscrit avec succès');
    } catch (err) {
        res.status(500).send('Erreur lors de l\'inscription : ' + err.message);
    }
});

// ** Route de connexion **
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Rechercher l'utilisateur
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('Utilisateur introuvable');
        }

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Mot de passe incorrect');
        }

        // Génération du token JWT
        const token = jwt.sign({ id: user._id }, 'votre_cle_secrete', { expiresIn: '1h' });

        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        res.status(500).send('Erreur lors de la connexion : ' + err.message);
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
