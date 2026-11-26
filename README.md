# TechStore Pro — Plateforme MERN de Gestion de Catalogue

> **Auteur :** Aya Bouzommita  
> **Filière :** Diplôme National d'Ingénieur en Génie Logiciel (FIGL3)  
> **Dépôt officiel :** [https://github.com/AyaBouzommita/Projet-MERN](https://github.com/AyaBouzommita/Projet-MERN)  

---

## 1. Description du Projet

TechStore Pro est une application web fullstack d'entreprise développée sur la pile technologique **MERN** (MongoDB Atlas, Express.js, React 19, Node.js).

Conçu à partir d'un squelette minimal, ce projet a fait l'objet d'une refonte architecturale approfondie afin d'implémenter les normes de qualité du Génie Logiciel :
* **Architecture MVC découplée** : Contrôleurs dédiés, validation des données d'entrée, gestionnaires d'exceptions unifiés.
* **Sécurité & Authentification** : Authentification par jeton JWT (JSON Web Tokens), chiffrement asymétrique des mots de passe avec Bcrypt, et gestion des rôles d'accès (RBAC).
* **Isolation des environnements** : Paramétrage centralisé via `dotenv` et sécurisation des en-têtes avec Helmet.
* **Gestion d'état prédictible** : Implémentation de Redux Toolkit (`createAsyncThunk`, `extraReducers`) sans artifice de rechargement manuel.
* **Design System professionnel** : Interface moderne et responsive développée avec React-Bootstrap et la typographie Plus Jakarta Sans, intégrant des filtres par facettes, recherche en temps réel et notifications toast.

---

## 2. Synthèse Comparative des Travaux Réalisés

| Composant | Implémentation Initiale | Implémentation Finale (Aya Bouzommita) |
| :--- | :--- | :--- |
| **Sécurité des accès** | Clés et mot de passe de base de données en clair | Variables d'environnement isolées (`.env`), en-têtes Helmet, CORS paramétré |
| **Authentification** | Inexistante (pas de mot de passe) | Inscription, connexion, génération de jeton JWT 7 jours, chiffrement Bcrypt |
| **Modèle de données** | Schémas basiques (2 champs pour les produits) | Schémas complets (référence, description, stock, catégorie, horodatage, rôles) |
| **Gestion des erreurs** | Journalisation muette sans retour client | Middleware centralisé avec codes d'état HTTP normalisés (400, 401, 403, 404, 500) |
| **Catalogue & Produits** | Affichage partiel textuel sans formulaire UI | CRUD intégral, filtrage par facettes (catégories), tri par prix et nom |
| **Architecture Redux** | Déclencheurs manuels (`ping / setping`) | État global immuable avec Redux Toolkit (`authSlice`, `productSlice`, `userSlice`) |
| **Interface Utilisateur** | Alertes natives du navigateur, mise en page brute | Design System moderne, modales de confirmation, notifications discrètes |

---

## 3. Structure de l'Arborescence

```text
Projet-MERN/
├── config/
│   └── db.js                 # Initialisation de la connexion MongoDB
├── controllers/              # Logique applicative (MVC)
│   ├── authController.js     # Gestion des sessions et accès
│   ├── productController.js  # Opérations d'inventaire et requêtes filtrées
│   └── userController.js     # Annuaire des collaborateurs
├── middlewares/              # Intercepteurs de requêtes
│   ├── auth.js               # Validation des jetons JWT et contrôle de rôle
│   └── errorHandler.js       # Capture et formatage des erreurs HTTP
├── models/                   # Définitions de schémas Mongoose
│   ├── product.js
│   └── user.js
├── routes/                   # Définition des points d'accès de l'API
│   ├── auth.js
│   ├── product.js
│   └── user.js
├── client/                   # Interface client (React 19 + Vite)
│   ├── src/
│   │   ├── components/       # Composants modulaires (Auth, Products, Users, etc.)
│   │   ├── redux/            # Store et gestionnaires d'état Redux Toolkit
│   │   ├── App.jsx           # Définition des routes applicatives
│   │   └── App.css           # Feuille de style du Design System
├── seed.js                   # Script de peuplement de la base de données
├── server.js                 # Point d'entrée du serveur Express
└── README.md
```

---

## 4. Guide d'Installation et Exécution

### Prérequis
* Node.js (version 18 ou supérieure)
* Gestionnaire de paquets npm

### Procédure de mise en service
```bash
# 1. Cloner le dépôt
git clone https://github.com/AyaBouzommita/Projet-MERN.git
cd Projet-MERN

# 2. Configurer les variables d'environnement
cp .env.example .env

# 3. Installer les dépendances serveur et client
npm install
cd client && npm install && cd ..

# 4. (Optionnel) Peupler la base avec le jeu de données de test
node seed.js

# 5. Lancer l'application complète
npm run start
```

* Application Frontend : `http://localhost:5173`
* Serveur d'API Backend : `http://localhost:5000`

---

## 5. Comptes de Démonstration (Jeu de données de test)

* **Administrateur :** `aya.bouzommita@isimg.tn` / mot de passe : `admin123`
* **Collaborateur standard :** `sarra.trabelsi@gmail.com` / mot de passe : `password123`
