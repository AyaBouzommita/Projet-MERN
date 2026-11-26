# 🚀 Projet MERN - Filière Ingénieur Génie Logiciel (FIGL3)

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://github.com/AyaBouzommita/Projet-MERN)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-21+-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![JWT](https://img.shields.io/badge/Auth-JWT%20%2B%20Bcrypt-000000?logo=jsonwebtokens)](https://jwt.io/)

> **Auteur :** Aya Bouzommita  
> **Dépôt officiel :** [https://github.com/AyaBouzommita/Projet-MERN](https://github.com/AyaBouzommita/Projet-MERN)  
> **Cadre :** Projet académique d'amélioration et de refactorisation en Génie Logiciel (GL3).

---

## 📌 Présentation du Projet

Ce projet est une application web fullstack moderne reposant sur la pile **MERN** (*MongoDB, Express.js, React 19, Node.js*). 

Initialement conçu comme un CRUD basique, ce projet a été entièrement **refactorisé, sécurisé et enrichi** pour atteindre les exigences d'une architecture d'entreprise :
- Séparation stricte des couches selon le pattern **MVC (Modèle - Vue - Contrôleur)**.
- Système complet d'**Authentification & Autorisation (JWT + Bcrypt)** avec gestion de rôles (`Admin` / `User`).
- **Gestion d'état réactive avec Redux Toolkit** (suppression du rechargement forcé via state `ping`).
- Interface utilisateur responsive et moderne conçue avec **React-Bootstrap 5** et notifications **React-Toastify**.
- Catalogue de produits dynamique avec **recherche textuelle instantanée**, **filtrage par catégories**, et **tri par prix/nom**.

---

## 📊 Matrice d'Amélioration (Avant vs Après)

| Critère | Projet de Base | Projet Amélioré (Aya Bouzommita) |
| :--- | :--- | :--- |
| **Sécurité & Secrets** | URI MongoDB Atlas & credentials en clair dans le code | Variables d'environnement isolées (`dotenv`, `.env.example`, `.env` ignoré par Git) |
| **Architecture Backend** | Logique métier et base de données mélangées dans les routes | **Architecture MVC propre** (`controllers/`, `routes/`, `models/`, `middlewares/`) |
| **Authentification** | ❌ Aucune (pas de mot de passe, pas de login/register) | **Complète (JWT 7 jours, Bcrypt, Middleware `isAuth` & `isAdmin`)** |
| **Gestion des Erreurs** | `console.log(error)` silencieux bloquant les requêtes | Middlewares centralisés (`notFound` 404 & `errorHandler` avec codes HTTP normalisés) |
| **Sécurité HTTP** | Uniquement CORS basique | **Helmet HTTP Headers**, morgan logger, CORS sécurisé |
| **Catalogue Produits** | Affichage partiel en texte brut (pas de CRUD UI) | **CRUD complet côté client & serveur**, photos, stock, catégories |
| **Filtres & Recherche** | ❌ Inexistants | Recherche en temps réel, tri (prix asc/desc, nom), filtre par catégorie |
| **Gestion d'état Redux** | Bricolage via prop drilling `ping / setping` | **Redux Toolkit idiomatique** (reducers optimistes, `authSlice`, `userSlice`, `productSlice`) |
| **Expérience Utilisateur** | `alert()` natifs du navigateur, design minimaliste | **Toasts élégants (React-Toastify)**, modales de confirmation, thème moderne |

---

## 🏗️ Structure du Projet

```text
Projet-MERN/
├── config/
│   └── db.js                 # Connexion sécurisée à MongoDB via variables d'environnement
├── controllers/              # Logique métier pure (MVC)
│   ├── authController.js     # Register, Login, Current User
│   ├── productController.js  # CRUD produits, filtres, tri, catégories
│   └── userController.js     # CRUD utilisateurs, recherche
├── middlewares/              # Middlewares Express
│   ├── auth.js               # isAuth (JWT) & isAdmin
│   └── errorHandler.js       # Gestion centralisée des erreurs et 404
├── models/                   # Modèles de données Mongoose
│   ├── product.js            # Schéma Produit (nom, prix, catégorie, image, stock, etc.)
│   └── user.js               # Schéma Utilisateur (nom, email unique, password haché, rôle)
├── routes/                   # Définition des endpoints REST
│   ├── auth.js
│   ├── product.js
│   └── user.js
├── client/                   # Frontend React 19 + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/         # Login.jsx, Register.jsx
│   │   │   ├── Products/     # ProductList.jsx, ProductCard.jsx, AddProduct.jsx, EditProduct.jsx
│   │   │   ├── Users/        # UserList.jsx, UserCard.jsx, Adduser.jsx, Edituser.jsx
│   │   │   ├── Home.jsx      # Page d'accueil avec Hero section et métriques
│   │   │   ├── Navbarr.jsx   # Barre de navigation responsive avec profil et recherche
│   │   │   ├── Footer.jsx    # Pied de page informatif
│   │   │   ├── About.jsx     # Présentation GL3 du projet
│   │   │   └── Contact.jsx   # Formulaire de contact interactif
│   │   ├── redux/
│   │   │   ├── authSlice.jsx # Authentification et synchronisation localStorage
│   │   │   ├── productSlice.jsx
│   │   │   ├── userSlice.jsx
│   │   │   └── store.jsx     # Store Redux combiné
│   │   ├── App.jsx           # Routes et ToastContainer
│   │   └── App.css           # Thème personnalisé et responsive
├── .env.example              # Gabarit des variables d'environnement
├── server.js                 # Point d'entrée du serveur Express
└── package.json
```

---

## 🚀 Installation & Démarrage

### 1. Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- [Git](https://git-scm.com/)

### 2. Cloner le dépôt
```bash
git clone https://github.com/AyaBouzommita/Projet-MERN.git
cd Projet-MERN
```

### 3. Configurer l'environnement
Copiez le fichier `.env.example` en `.env` à la racine :
```bash
cp .env.example .env
```
Renseignez vos identifiants (ou utilisez la chaîne MongoDB Atlas configurée par défaut) :
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ondwve7.mongodb.net/mern_db
JWT_SECRET=votre_cle_secrete_jwt
NODE_ENV=development
```

### 4. Installer les dépendances
```bash
# Dépendances Backend
npm install

# Dépendances Frontend
cd client
npm install
cd ..
```

### 5. Lancer l'application
Pour exécuter le backend et le frontend en parallèle avec une seule commande :
```bash
npm run start
```
* **Frontend :** `http://localhost:5173`
* **Backend API :** `http://localhost:5000`

---

## 🔑 Endpoints API REST

### Authentification (`/api/auth`)
* `POST /api/auth/register` : Inscription d'un nouvel utilisateur (retourne un token JWT).
* `POST /api/auth/login` : Connexion utilisateur / admin (retourne un token JWT).
* `GET  /api/auth/current` : Récupère les données de session de l'utilisateur connecté *(nécessite le token `Bearer <token>`)*.

### Produits (`/api/product`)
* `GET    /api/product` : Liste des produits avec support des filtres (`?search=`, `?category=`, `?sortBy=`, `?minPrice=`, `?maxPrice=`).
* `GET    /api/product/:id` : Détails d'un produit.
* `POST   /api/product/add` : Création d'un nouveau produit.
* `PUT    /api/product/:id` : Mise à jour des informations d'un produit.
* `DELETE /api/product/:id` : Suppression d'un produit.
* `GET    /api/product/categories` : Liste des catégories distinctes.

### Utilisateurs (`/api/user`)
* `GET    /api/user` : Liste de tous les utilisateurs (avec filtre `?search=`).
* `GET    /api/user/:id` : Détail d'un utilisateur par son identifiant.
* `POST   /api/user/add` : Ajout manuel d'un utilisateur.
* `PUT    /api/user/:id` : Mise à jour d'un profil utilisateur.
* `DELETE /api/user/:id` : Suppression d'un utilisateur.

---

## 👩‍💻 Auteur

* **Aya Bouzommita**
* Étudiante en **Filière Ingénieur Génie Logiciel 3 (FIGL3)**
* GitHub : [@AyaBouzommita](https://github.com/AyaBouzommita)
