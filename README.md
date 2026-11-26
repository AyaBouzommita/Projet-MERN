# DevShowcase — Le Product Hunt des Projets Étudiants & Ingénieurs (MERN)

> **Auteur :** Aya Bouzommita  
> **Filière :** Diplôme National d'Ingénieur en Génie Logiciel (FIGL3)  
> **Dépôt officiel :** [https://github.com/AyaBouzommita/Projet-MERN](https://github.com/AyaBouzommita/Projet-MERN)  

---

## 1. Description du Projet

**DevShowcase** est une plateforme communautaire et collaborative inspirée de Product Hunt, spécialement conçue pour les étudiants ingénieurs en informatique.

L'objectif est d'offrir une vitrine publique durable aux projets académiques, projets de fin d'études (PFE), prototypes d'intelligence artificielle et outils open-source qui restent trop souvent confinés aux machines locales après les soutenances.

### Fonctionnalités Clés :
* **Système d'Upvotes en direct** : Les visiteurs et étudiants votent pour les projets les plus ingénieux et prometteurs.
* **Fiches Projets Détaillées** : Capture d'écran, accroche (tagline), description, liens directs vers le code source GitHub et la démo en ligne.
* **Badges Technologiques** : Tags des technos employées (*React, FastAPI, Docker, Node.js, Flutter, PyTorch, MongoDB*).
* **Statuts de Projet** : *En ligne*, *Bêta*, *Prototype*, *Recherche de contributeurs*.
* **Soumission & Modération** : Formulaire complet de publication de projets avec modération administrateur.
* **Annuaire des Développeurs** : Profils des étudiants et créateurs de projets.

---

## 2. Architecture & Génie Logiciel

* **Backend MVC (Node.js & Express.js 5)** : Architecture séparée en couches (`controllers/`, `routes/`, `models/`, `middlewares/`), gestion centralisée des erreurs avec codes HTTP normalisés.
* **Sécurité & Contrôle d'accès** : Variables d'environnement isolées (`dotenv`), hachage Bcrypt, jeton d'authentification JWT et en-têtes Helmet.
* **Frontend Moderne (React 19 & Redux Toolkit)** : État réactif sans ping manuel, requêtes asynchrones avec `createAsyncThunk`, interface responsive avec Plus Jakarta Sans.

---

## 3. Guide de Démarrage & Configuration

### Prérequis :
* Node.js (>= 18)
* Un cluster **MongoDB Atlas** (ou MongoDB en local)

### Installation :
```bash
# 1. Cloner le dépôt
git clone https://github.com/AyaBouzommita/Projet-MERN.git
cd Projet-MERN

# 2. Configurer les variables d'environnement
# Créer le fichier .env à la racine (basé sur .env.example) :
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/devshowcase?retryWrites=true&w=majority
JWT_SECRET=supersecret_mern_token_gl3_2026
NODE_ENV=development

# 3. Installer les dépendances (serveur + client)
npm install
cd client && npm install && cd ..

# 4. Peupler la base avec les projets et utilisateurs de démo
node seed.js

# 5. Démarrer le projet fullstack (Backend + Frontend en simultané)
npm run start
```

* **Interface Web :** `http://localhost:5173`
* **API REST :** `http://localhost:5000`
