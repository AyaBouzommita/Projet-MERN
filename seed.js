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

    // Realistic Users
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
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Karim Ben Salem",
        email: "karim.bensalem@techstore.tn",
        password: hashedPassword,
        age: 28,
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
        name: "Yassine Mansour",
        email: "yassine.m@outlook.com",
        password: hashedPassword,
        age: 31,
        role: "user",
        isAdmin: false,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
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
        name: "Mehdi Chaabane",
        email: "mehdi.c@freelance.tn",
        password: hashedPassword,
        age: 29,
        role: "user",
        isAdmin: false,
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      },
    ];

    await User.insertMany(users);
    console.log(`[Seeder] Injected ${users.length} users...`);

    // Realistic Products
    const products = [
      {
        nameproduct: "MacBook Pro 16\" M3 Max",
        price: 10499,
        category: "Informatique",
        description: "Puce Apple M3 Max 16 cœurs CPU, 40 cœurs GPU, 36 Go mémoire unifiée, 1 To SSD. Écran Liquid Retina XDR 120Hz.",
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        countInStock: 8,
      },
      {
        nameproduct: "Dell XPS 15 OLED Touch",
        price: 6890,
        category: "Informatique",
        description: "Intel Core i9-13900H, 32 Go DDR5, 1 To SSD NVMe, NVIDIA RTX 4070 8 Go, écran 3.5K OLED tactile InfinityEdge.",
        img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
        countInStock: 12,
      },
      {
        nameproduct: "iPhone 16 Pro Max 256 Go",
        price: 5299,
        category: "Smartphones",
        description: "Titane naturel, puce A18 Pro, nouveau bouton Commande de l'appareil photo, téléobjectif 5x, écran Super Retina XDR 6.9\".",
        img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        countInStock: 15,
      },
      {
        nameproduct: "Samsung Galaxy S24 Ultra",
        price: 4799,
        category: "Smartphones",
        description: "Cadre en titane, processeur Snapdragon 8 Gen 3 for Galaxy, capteur photo 200 MP avec Galaxy AI intégrée, S Pen inclus.",
        img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
        countInStock: 9,
      },
      {
        nameproduct: "Sony WH-1000XM5 ANC",
        price: 1199,
        category: "Audio",
        description: "Casque Bluetooth sans fil à réduction de bruit active leader du marché, 8 micros, autonomie 30h, audio haute résolution LDAC.",
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        countInStock: 25,
      },
      {
        nameproduct: "AirPods Pro 2 USB-C",
        price: 899,
        category: "Audio",
        description: "Puce H2, audio adaptatif, réduction active du bruit 2x plus performante, boîtier MagSafe USB-C résistant à la poussière.",
        img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
        countInStock: 30,
      },
      {
        nameproduct: "Écran Asus ROG Swift 32\" 4K OLED",
        price: 3899,
        category: "Gaming",
        description: "Dalle QD-OLED 4K (3840x2160), taux de rafraîchissement 240 Hz, temps de réponse 0.03 ms, G-Sync compatible, HDR10.",
        img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
        countInStock: 5,
      },
      {
        nameproduct: "PlayStation 5 Slim 1 To",
        price: 2199,
        category: "Gaming",
        description: "Console de salon Sony dernière génération avec lecteur de disque Blu-ray Ultra HD, manette DualSense avec retour haptique.",
        img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
        countInStock: 14,
      },
      {
        nameproduct: "Clavier Keychron Q1 Pro Wireless",
        price: 649,
        category: "Accessoires",
        description: "Clavier mécanique sans fil custom 75%, châssis tout aluminium CNC, switches Gateron Jupiter Red pré-lubrifiés, QMK/VIA.",
        img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
        countInStock: 18,
      },
      {
        nameproduct: "Souris Logitech MX Master 3S",
        price: 349,
        category: "Accessoires",
        description: "Capteur optique 8000 DPI sur toutes surfaces y compris le verre, clics silencieux, défilement ultra-rapide MagSpeed.",
        img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
        countInStock: 40,
      },
      {
        nameproduct: "iPad Pro 13\" M4 OLED",
        price: 4999,
        category: "Informatique",
        description: "Nouvelle puce Apple M4 révolutionnaire, écran Ultra Retina XDR Tandem OLED, design ultra-fin 5.1 mm, support Apple Pencil Pro.",
        img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
        countInStock: 7,
      },
      {
        nameproduct: "Enceinte Devialet Phantom II 98dB",
        price: 3950,
        category: "Audio",
        description: "Enceinte active compacte sans fil haute fidélité, 400W RMS, amplification hybride analogique-numérique ADH, Bluetooth, Wi-Fi.",
        img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
        countInStock: 4,
      },
    ];

    await Product.insertMany(products);
    console.log(`[Seeder] Injected ${products.length} products...`);

    console.log("[Seeder] Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("[Seeder Error]:", error);
    process.exit(1);
  }
};

seedData();
