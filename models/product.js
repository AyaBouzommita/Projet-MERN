const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nameproduct: {
      type: String,
      required: [true, "Le nom du produit est obligatoire"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Le prix est obligatoire"],
      min: [0, "Le prix doit être positif"],
    },
    category: {
      type: String,
      default: "Informatique",
      trim: true,
    },
    description: {
      type: String,
      default: "Description du produit de qualité supérieure.",
    },
    img: {
      type: String,
      default: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    },
    countInStock: {
      type: Number,
      default: 10,
      min: [0, "Le stock ne peut pas être négatif"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
