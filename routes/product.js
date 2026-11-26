const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  upvoteProject,
  deleteProduct,
  getCategories,
} = require("../controllers/productController");

// Specific routes
router.get("/categories", getCategories);
router.put("/:id/upvote", upvoteProject);

// CRUD routes
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/add", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
