const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} = require("../controllers/productController");

// Specific routes first
router.get("/categories", getCategories);

// CRUD routes
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/add", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
