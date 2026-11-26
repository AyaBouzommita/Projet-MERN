require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const Product = require("./models/product");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[Seeder] Connected to MongoDB Atlas...");

    // Clear existing collections
    await User.deleteMany();
    await Product.deleteMany();
    console.log("[Seeder] Cleared existing Users and Products...");

    // Users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);
    const adminHashedPassword = await bcrypt.hash("admin123", salt);

    const users = [
      {
        name: "Aya Bouzommita",
        email: "aya.bouzommita@isimg.tn",
        password: adminHashedPassword,
        age: 22,
        role: "admin",
        isAdmin: true,
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Sarra Trabelsi",
        email: "sarra.trabelsi@gmail.com",
        password: hashedPassword,
        age: 24,
        role: "user",
        isAdmin: false,
        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Ines Guesmi",
        email: "ines.guesmi@yahoo.fr",
        password: hashedPassword,
        age: 26,
        role: "user",
        isAdmin: false,
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Yassine Mansour",
        email: "yassine.m@outlook.com",
        password: hashedPassword,
        age: 30,
        role: "user",
        isAdmin: false,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      },
    ];

    await User.insertMany(users);
    console.log(`[Seeder] Injected ${users.length} users...`);

    // 16 Fashion Items (SHEIN Style)
    const products = [
      {
        nameproduct: "Robe Longue Évasée Satinée à Dos Nu",
        price: 69,
        oldPrice: 129,
        discount: 46,
        category: "Robes",
        description: "Robe longue fluide coupe sirène avec décolleté élégant et fente latérale. Tissu satiné doux et respirant.",
        img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        countInStock: 35,
        rating: 4.9,
        reviewsCount: 384,
        sizes: ["XS", "S", "M", "L"],
        colors: ["#be185d", "#1e293b", "#047857"],
        isFlashSale: true,
      },
      {
        nameproduct: "Robe Fleurie Mi-Longue Bohème Chic",
        price: 49,
        oldPrice: 89,
        discount: 45,
        category: "Robes",
        description: "Imprimé floral vintage, manches courtes bouffantes et taille cintrée élastique. Idéale pour la saison estivale.",
        img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
        countInStock: 48,
        rating: 4.8,
        reviewsCount: 512,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#fef08a", "#fbcfe8", "#bbf7d0"],
        isFlashSale: true,
      },
      {
        nameproduct: "Blazer Tailleur Oversize Coupe Droite",
        price: 89,
        oldPrice: 159,
        discount: 44,
        category: "Vestes & Manteaux",
        description: "Veste blazer structurée à double boutonnage, épaulettes légères et poches à rabat. Look chic urbain.",
        img: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80",
        countInStock: 22,
        rating: 4.9,
        reviewsCount: 267,
        sizes: ["S", "M", "L"],
        colors: ["#d6d3d1", "#0f172a", "#f59e0b"],
        isFlashSale: false,
      },
      {
        nameproduct: "Veste en Denim Déchirée Style Streetwear",
        price: 79,
        oldPrice: 119,
        discount: 33,
        category: "Vestes & Manteaux",
        description: "Denim 100% coton prélavé, détails usés aux coudes et boutons métalliques gravés. Coupe décontractée.",
        img: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
        countInStock: 30,
        rating: 4.7,
        reviewsCount: 198,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["#60a5fa", "#1e3a8a", "#000000"],
        isFlashSale: true,
      },
      {
        nameproduct: "T-Shirt Coton Bio Graphique Vintage",
        price: 29,
        oldPrice: 49,
        discount: 40,
        category: "Hauts & Tops",
        description: "Coton peigné doux toucher velouté, coupe loose décontractée et imprimé sérigraphié résistant aux lavages.",
        img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
        countInStock: 60,
        rating: 4.8,
        reviewsCount: 742,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#ffffff", "#000000", "#78716c"],
        isFlashSale: true,
      },
      {
        nameproduct: "Crop Top Asymétrique en Maille Côtelée",
        price: 25,
        oldPrice: 45,
        discount: 44,
        category: "Hauts & Tops",
        description: "Haut court à une manche bretelle, matière élastique gainante et respirante. Parfait pour les sorties.",
        img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
        countInStock: 45,
        rating: 4.6,
        reviewsCount: 310,
        sizes: ["XS", "S", "M"],
        colors: ["#ec4899", "#1e293b", "#f97316"],
        isFlashSale: false,
      },
      {
        nameproduct: "Pantalon Cargo Large Taille Haute à Poches",
        price: 59,
        oldPrice: 99,
        discount: 40,
        category: "Pantalons & Bas",
        description: "Pantalon parachute parachute tendance Y2K avec cordons de serrage ajustables aux chevilles et poches utilitaires.",
        img: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=800&q=80",
        countInStock: 28,
        rating: 4.8,
        reviewsCount: 420,
        sizes: ["XS", "S", "M", "L"],
        colors: ["#4d7c0f", "#334155", "#e2e8f0"],
        isFlashSale: true,
      },
      {
        nameproduct: "Jean Droit Évasé Taille Haute Vintage",
        price: 69,
        oldPrice: 109,
        discount: 36,
        category: "Pantalons & Bas",
        description: "Denim bleu délavé authentique, coupe droite légèrement évasée mettant en valeur la silhouette.",
        img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
        countInStock: 34,
        rating: 4.9,
        reviewsCount: 560,
        sizes: ["26", "28", "30", "32"],
        colors: ["#3b82f6", "#1e40af", "#000000"],
        isFlashSale: false,
      },
      {
        nameproduct: "Baskets Platform Chunky Sneakers Blanches",
        price: 89,
        oldPrice: 149,
        discount: 40,
        category: "Chaussures",
        description: "Semelle épaisse crantée confortable amortissante, cuir synthétique résistant et lacets contrastés.",
        img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
        countInStock: 19,
        rating: 4.9,
        reviewsCount: 689,
        sizes: ["36", "37", "38", "39", "40"],
        colors: ["#ffffff", "#f1f5f9", "#000000"],
        isFlashSale: true,
      },
      {
        nameproduct: "Sandales à Talons Carrés et Brides Croisées",
        price: 65,
        oldPrice: 110,
        discount: 41,
        category: "Chaussures",
        description: "Talon bloc stable de 7 cm, bride cheville réglable avec boucle dorée et semelle intérieure moussée.",
        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        countInStock: 24,
        rating: 4.7,
        reviewsCount: 180,
        sizes: ["36", "37", "38", "39", "40"],
        colors: ["#f59e0b", "#000000", "#be185d"],
        isFlashSale: false,
      },
      {
        nameproduct: "Sac Bandoulière Matelassé Chaîne Dorée",
        price: 49,
        oldPrice: 85,
        discount: 42,
        category: "Sacs & Accessoires",
        description: "Cuir PU matelassé à motifs chevrons, fermoir métallique pivotant et chaîne bandoulière tressée.",
        img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        countInStock: 40,
        rating: 4.9,
        reviewsCount: 820,
        sizes: ["Taille Unique"],
        colors: ["#000000", "#f8fafc", "#78350f"],
        isFlashSale: true,
      },
      {
        nameproduct: "Lunettes de Soleil Œil de Chat Rétro",
        price: 22,
        oldPrice: 39,
        discount: 43,
        category: "Sacs & Accessoires",
        description: "Monture épaisse rétro verres teintés avec protection UV400 complète catégorie 3. Étui rigide offert.",
        img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        countInStock: 50,
        rating: 4.8,
        reviewsCount: 450,
        sizes: ["Taille Unique"],
        colors: ["#000000", "#ca8a04", "#7f1d1d"],
        isFlashSale: true,
      },
      {
        nameproduct: "Combinaison Pantalon Fluide Ceinturée",
        price: 79,
        oldPrice: 139,
        discount: 43,
        category: "Robes",
        description: "Encolure cache-cœur élégante, jambes larges plissées et ceinture assortie à boucle ronde.",
        img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        countInStock: 18,
        rating: 4.8,
        reviewsCount: 290,
        sizes: ["S", "M", "L"],
        colors: ["#047857", "#1e293b", "#b91c1c"],
        isFlashSale: false,
      },
      {
        nameproduct: "Trench-Coat Beige Long Croisé avec Ceinture",
        price: 119,
        oldPrice: 199,
        discount: 40,
        category: "Vestes & Manteaux",
        description: "Intemporel classique déperlant, bavolet tempête, double rangée de boutons corne et doublure satinée.",
        img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
        countInStock: 15,
        rating: 4.9,
        reviewsCount: 340,
        sizes: ["S", "M", "L", "XL"],
        colors: ["#e5e7eb", "#d97706", "#000000"],
        isFlashSale: true,
      },
      {
        nameproduct: "Chemise Satinée Oversize à Col Revers",
        price: 39,
        oldPrice: 69,
        discount: 43,
        category: "Hauts & Tops",
        description: "Matière soyeuse brillante ultra-légère, coupe ample fluide avec poignets boutonnés allongés.",
        img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
        countInStock: 35,
        rating: 4.8,
        reviewsCount: 410,
        sizes: ["XS", "S", "M", "L"],
        colors: ["#ffffff", "#047857", "#c084fc"],
        isFlashSale: false,
      },
      {
        nameproduct: "Jupe Midi Plissée Métallisée Soleil",
        price: 45,
        oldPrice: 79,
        discount: 43,
        category: "Pantalons & Bas",
        description: "Plissé accordéon fluide scintillant, taille haute avec élastique lurex doré confortable.",
        img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80",
        countInStock: 25,
        rating: 4.7,
        reviewsCount: 220,
        sizes: ["S", "M", "L"],
        colors: ["#ca8a04", "#94a3b8", "#000000"],
        isFlashSale: true,
      },
    ];

    await Product.insertMany(products);
    console.log(`[Seeder] Injected ${products.length} fashion items...`);

    console.log("[Seeder] Fashion database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("[Seeder Error]:", error);
    process.exit(1);
  }
};

seedData();
