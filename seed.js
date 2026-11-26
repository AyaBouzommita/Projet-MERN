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
    console.log("[Seeder] Cleared existing Users and Projects...");

    // Users (Student Developers)
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
        email: "karim.bs@isimg.tn",
        password: hashedPassword,
        age: 23,
        role: "user",
        isAdmin: false,
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Sarra Trabelsi",
        email: "sarra.trabelsi@gmail.com",
        password: hashedPassword,
        age: 22,
        role: "user",
        isAdmin: false,
        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Yassine Mansour",
        email: "yassine.m@outlook.com",
        password: hashedPassword,
        age: 24,
        role: "user",
        isAdmin: false,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Ines Guesmi",
        email: "ines.guesmi@yahoo.fr",
        password: hashedPassword,
        age: 23,
        role: "user",
        isAdmin: false,
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      },
    ];

    await User.insertMany(users);
    console.log(`[Seeder] Injected ${users.length} student developers...`);

    // 12 Realistic Student Projects
    const projects = [
      {
        nameproduct: "AutoCV — Générateur intelligent de CV pour étudiants",
        tagline: "Générez un CV conforme aux filtres ATS en quelques clics grâce à l'IA.",
        description: "Application web qui analyse le profil GitHub et LinkedIn d'un étudiant pour formuler automatiquement des descriptions de compétences et générer des templates PDF modernes compatibles avec les recruteurs internationaux.",
        category: "IA & Machine Learning",
        technologies: ["React", "FastAPI", "OpenAI", "TailwindCSS"],
        img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
        githubUrl: "https://github.com/AyaBouzommita/AutoCV",
        demoUrl: "https://autocv-demo.vercel.app",
        upvotes: 142,
        status: "En ligne",
        authorName: "Aya Bouzommita",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      },
      {
        nameproduct: "EduPulse — Système de QCM interactif en temps réel",
        tagline: "Engagez les étudiants en amphi avec des sondages et quiz en direct via WebSockets.",
        description: "Alternative open-source et gratuite à Kahoot conçue pour les universités. Permet aux enseignants de diffuser des questionnaires avec affichage en direct du classement et analyse des lacunes des étudiants.",
        category: "Web Fullstack",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
        img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        githubUrl: "https://github.com/karim-bs/EduPulse",
        demoUrl: "https://edupulse.tn",
        upvotes: 98,
        status: "En ligne",
        authorName: "Karim Ben Salem",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      {
        nameproduct: "CampusShare — Covoiturage solidaire universitaire",
        tagline: "Partagez vos trajets quotidiens entre étudiants et réduisez votre empreinte carbone.",
        description: "Plateforme communautaire réservée aux adresses institutionnelles (.tn) pour planifier des trajets quotidiens sécurisés entre campus et résidences avec partage équitable des frais d'essence.",
        category: "Mobile & Applications",
        technologies: ["Flutter", "Firebase", "Google Maps API", "Node.js"],
        img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
        githubUrl: "https://github.com/sarra-tr/CampusShare",
        demoUrl: "https://campusshare.tn",
        upvotes: 87,
        status: "Bêta",
        authorName: "Sarra Trabelsi",
        authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      },
      {
        nameproduct: "SmartParking — Détection de places de parking par vision",
        tagline: "Surveillance de parking universitaire par caméra et modèle de détection YOLOv8.",
        description: "Système complet de vision par ordinateur déployé sur caméra IP qui cartographie en temps réel les places libres et oriente les conducteurs vers les zones disponibles via une interface web fluide.",
        category: "IA & Machine Learning",
        technologies: ["Python", "YOLOv8", "OpenCV", "Flask", "React"],
        img: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        githubUrl: "https://github.com/yassine-m/smart-parking",
        demoUrl: "https://smartparking.demo.tn",
        upvotes: 76,
        status: "Prototype",
        authorName: "Yassine Mansour",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      },
      {
        nameproduct: "SecureVault — Gestionnaire de secrets Zero-Knowledge",
        tagline: "Stockez vos clés d'API et mots de passe avec chiffrement de bout en bout AES-256.",
        description: "Solution légère conçue pour les équipes de projet étudiant permettant de partager en toute sécurité les variables d'environnement (.env) et tokens sans risque de fuite sur les dépôts publics GitHub.",
        category: "Cybersécurité",
        technologies: ["TypeScript", "WebCrypto API", "Express", "PostgreSQL"],
        img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
        githubUrl: "https://github.com/AyaBouzommita/SecureVault",
        demoUrl: "https://securevault-dev.com",
        upvotes: 65,
        status: "En ligne",
        authorName: "Aya Bouzommita",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      },
      {
        nameproduct: "DevCollab — Espace collaboratif de revue de code",
        tagline: "Relectures de code interactives, annotations visuelles et chat vocal entre pairs.",
        description: "Plateforme web pensée pour les étudiants ingénieurs afin de pratiquer la revue de code avant les soutenances. Intègre un éditeur Monaco (VSCode en ligne) et un système d'annotations ligne par ligne.",
        category: "Web Fullstack",
        technologies: ["React", "Monaco Editor", "WebRTC", "Express", "Docker"],
        img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        githubUrl: "https://github.com/ines-g/DevCollab",
        demoUrl: "https://devcollab.isimg.tn",
        upvotes: 61,
        status: "Recherche de contributeurs",
        authorName: "Ines Guesmi",
        authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      },
      {
        nameproduct: "EcoSort — Reconnaissance et tri sélectif des déchets",
        tagline: "Identifiez les matériaux recyclables instantanément avec l'appareil photo du smartphone.",
        description: "Application mobile intégrant un réseau neuronal convolutif (CNN) capable de classifier un déchet en 0.2 seconde et d'indiquer le bac de tri approprié avec calcul d'impact carbone positif.",
        category: "IA & Machine Learning",
        technologies: ["TensorFlow Lite", "React Native", "Python", "FastAPI"],
        img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
        githubUrl: "https://github.com/sarra-tr/EcoSort",
        demoUrl: "https://ecosort.tn",
        upvotes: 54,
        status: "Bêta",
        authorName: "Sarra Trabelsi",
        authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      },
      {
        nameproduct: "CloudDeploy — Déploiement automatisé de micro-services",
        tagline: "Déployez vos conteneurs Docker sur VPS en une seule commande CLI sans complexité.",
        description: "Mini-PaaS pédagogique inspiré de Vercel et Dokku permettant aux étudiants d'héberger gratuitement leurs backends Node.js, Spring Boot et Python avec génération automatique de certificats SSL Let's Encrypt.",
        category: "DevOps & Cloud",
        technologies: ["Go", "Docker API", "Nginx", "React", "Linux"],
        img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
        githubUrl: "https://github.com/yassine-m/cloud-deploy",
        demoUrl: "https://clouddeploy.dev",
        upvotes: 49,
        status: "Recherche de contributeurs",
        authorName: "Yassine Mansour",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      },
      {
        nameproduct: "HealthTrack — Carnet de santé numérique et rappels",
        tagline: "Gestion sécurisée des ordonnances et rappels de prise de médicaments.",
        description: "Application mobile centrée sur le patient avec stockage chiffré des analyses de sang, historique médical et alertes intelligentes en cas d'incompatibilité de traitements.",
        category: "Mobile & Applications",
        technologies: ["React Native", "Express", "MongoDB", "Redux Toolkit"],
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        githubUrl: "https://github.com/ines-g/health-track",
        demoUrl: "https://healthtrack.tn",
        upvotes: 43,
        status: "Prototype",
        authorName: "Ines Guesmi",
        authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      },
      {
        nameproduct: "BudgetColoc — Gestion des dépenses partagées d'étudiants",
        tagline: "Fini les calculs compliqués en colocation : équilibrez les comptes équitablement.",
        description: "Application progressive (PWA) de calcul automatique des soldes entre colocataires avec scanning OCR des tickets de caisse de supermarché pour répartition automatique par colocataire.",
        category: "Web Fullstack",
        technologies: ["Vue.js", "Node.js", "Tesseract OCR", "MongoDB"],
        img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
        githubUrl: "https://github.com/karim-bs/BudgetColoc",
        demoUrl: "https://budgetcoloc.tn",
        upvotes: 38,
        status: "En ligne",
        authorName: "Karim Ben Salem",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      {
        nameproduct: "IoT-HomeSense — Centrale domotique open-source",
        tagline: "Surveillance de la qualité de l'air et température avec ESP32 et dashboard React.",
        description: "Solution matérielle et logicielle combinant des capteurs DHT22 et MQ-135 connectés en MQTT à un broker local et restitués sur une interface de télémétrie fluide en temps réel.",
        category: "IoT & Embarqué",
        technologies: ["C++", "ESP32", "MQTT", "Node.js", "React"],
        img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80",
        githubUrl: "https://github.com/AyaBouzommita/HomeSense-IoT",
        demoUrl: "https://homesense.isimg.tn",
        upvotes: 35,
        status: "Bêta",
        authorName: "Aya Bouzommita",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      },
      {
        nameproduct: "CodeSnippet — Bibliothèque collaborative de fragments de code",
        tagline: "Sauvegardez et partagez vos composants et snippets réutilisables préférés.",
        description: "Plateforme communautaire permettant aux étudiants de stocker leurs algorithmes et composants React avec coloration syntaxique, recherche par langage et possibilité de tester dans un bac à sable en direct.",
        category: "Web Fullstack",
        technologies: ["Next.js", "Prisma", "TypeScript", "TailwindCSS"],
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        githubUrl: "https://github.com/AyaBouzommita/CodeSnippet",
        demoUrl: "https://codesnippet.dev",
        upvotes: 31,
        status: "En ligne",
        authorName: "Aya Bouzommita",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      },
    ];

    await Product.insertMany(projects);
    console.log(`[Seeder] Injected ${projects.length} student projects...`);

    console.log("[Seeder] DevShowcase database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("[Seeder Error]:", error);
    process.exit(1);
  }
};

seedData();
