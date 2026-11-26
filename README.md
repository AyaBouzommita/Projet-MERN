# SHEIN Tunisie — Plateforme E-Commerce Mode & Prêt-à-Porter (MERN)

> **Auteur :** Aya Bouzommita  
> **Filière :** Diplôme National d'Ingénieur en Génie Logiciel (FIGL3)  
> **Dépôt officiel :** [https://github.com/AyaBouzommita/Projet-MERN](https://github.com/AyaBouzommita/Projet-MERN)  

---

## 1. Description du Projet

Ce projet transforme l'application de base en une **plateforme e-commerce complète inspirée du géant mondial de la mode SHEIN**, adaptée au marché tunisien.

L'application intègre toutes les fonctionnalités emblématiques d'un site de vente en ligne moderne :
* **Expérience d'achat intégrale** : Panier d'achat coulissant dynamique (*Cart Drawer*), gestion des quantités, sélection des tailles (XS, S, M, L, XL) et pastilles de couleurs.
* **Système de codes promotionnels** : Application de coupons instantanés (`SHEIN20` pour -20%, `BIENVENUE` pour -15%) avec jauge d'éligibilité à la livraison gratuite (dès 100 TND).
* **Ventes Flash avec compte à rebours** : Section dédiée aux offres temporaires avec minuteur en temps réel (heures, minutes, secondes).
* **Validation de commande (*Checkout*)** : Formulaire de livraison avec sélection des 24 gouvernorats tunisiens et options de paiement (Paiement à la livraison / Carte bancaire).
* **Liste d'envies (*Wishlist*)** : Sauvegarde des articles favoris avec indicateur en direct dans la barre de navigation.
* **Architecture MERN robuste** : Backend MVC, authentification JWT, hachage Bcrypt, gestion d'état centralisée avec Redux Toolkit et persistance `localStorage`.

---

## 2. Fonctionnalités E-Commerce Clés

* **Bandeau défilant (*Top Announcement Ticker*)** : Annonces des offres promotionnelles et seuil de livraison offerte.
* **Navigation thématique** : Rayons Nouveautés, Robes, Hauts & Tops, Vestes, Pantalons, Chaussures, Accessoires et Ventes Flash.
* **Fiches produits stylisées** : Ratios d'images portrait (3:4), étiquettes de remises en rouge (`-45%`), notes étoiles clients et pastilles de tailles et teintes.
* **Tunnel d'achat fluide** : Tiroir latéral sans interruption de navigation permettant de commander en quelques clics.

---

## 3. Guide de Démarrage

```bash
# 1. Cloner le dépôt
git clone https://github.com/AyaBouzommita/Projet-MERN.git
cd Projet-MERN

# 2. Configurer les variables d'environnement
cp .env.example .env

# 3. Installer les dépendances
npm install
cd client && npm install && cd ..

# 4. Peupler le catalogue de mode
node seed.js

# 5. Lancer le projet
npm run start
```

* **Boutique en ligne :** `http://localhost:5173`
* **Serveur API :** `http://localhost:5000`
