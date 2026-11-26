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
    oldPrice: {
      type: Number,
      default: function () {
        return Math.round(this.price * 1.4);
      },
    },
    discount: {
      type: Number,
      default: 30,
    },
    category: {
      type: String,
      default: "Robes",
      trim: true,
    },
    description: {
      type: String,
      default: "Tissu fluide de qualité supérieure, coupe moderne et confortable.",
    },
    img: {
      type: String,
      default: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    },
    countInStock: {
      type: Number,
      default: 25,
      min: [0, "Le stock ne peut pas être négatif"],
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewsCount: {
      type: Number,
      default: 142,
    },
    sizes: {
      type: [String],
      default: ["XS", "S", "M", "L", "XL"],
    },
    colors: {
      type: [String],
      default: ["#1e293b", "#f59e0b", "#ec4899", "#f1f5f9"],
    },
    isFlashSale: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
