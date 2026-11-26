const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    nameproduct: {
      type: String,
      required: [true, "Le titre du projet est obligatoire"],
      trim: true,
    },
    tagline: {
      type: String,
      default: "Solution logicielle innovante développée par des étudiants.",
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La description du projet est obligatoire"],
    },
    category: {
      type: String,
      default: "Web Fullstack",
      trim: true,
    },
    technologies: {
      type: [String],
      default: ["React", "Node.js", "MongoDB"],
    },
    img: {
      type: String,
      default: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    },
    githubUrl: {
      type: String,
      default: "https://github.com",
    },
    demoUrl: {
      type: String,
      default: "https://demo.devshowcase.tn",
    },
    upvotes: {
      type: Number,
      default: 1,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Prototype", "Bêta", "En ligne", "Recherche de contributeurs"],
      default: "Bêta",
    },
    authorName: {
      type: String,
      default: "Aya Bouzommita",
    },
    authorAvatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", projectSchema);
module.exports = Product;
