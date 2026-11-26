const Product = require("../models/product");

// @desc    Get all products with search, category filter, sorting, flash sale
// @route   GET /product ou /api/product
const getProducts = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, sortBy, isFlashSale } = req.query;
    let query = {};

    if (search) {
      query.nameproduct = { $regex: search, $options: "i" };
    }

    if (category && category !== "All" && category !== "Tous") {
      query.category = category;
    }

    if (isFlashSale === "true") {
      query.isFlashSale = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sortBy === "price_asc") sortOption = { price: 1 };
    if (sortBy === "price_desc") sortOption = { price: -1 };
    if (sortBy === "name_asc") sortOption = { nameproduct: 1 };
    if (sortBy === "name_desc") sortOption = { nameproduct: -1 };
    if (sortBy === "discount_desc") sortOption = { discount: -1 };

    const products = await Product.find(query).sort(sortOption);
    res.status(200).json({ products, msg: "all products", count: products.length });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by id
// @route   GET /product/:id ou /api/product/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Produit non trouvé" });
    }
    res.status(200).json({ product, msg: "one product" });
  } catch (error) {
    next(error);
  }
};

// @desc    Add product
// @route   POST /product/add ou /api/product/add
const addProduct = async (req, res, next) => {
  try {
    const {
      nameproduct,
      price,
      oldPrice,
      discount,
      category,
      description,
      img,
      countInStock,
      sizes,
      colors,
      isFlashSale,
    } = req.body;

    if (!nameproduct || price === undefined || price === null) {
      return res.status(400).json({ msg: "Le nom du produit et le prix sont obligatoires." });
    }

    const calculatedOldPrice = oldPrice ? Number(oldPrice) : Math.round(Number(price) * 1.4);
    const calculatedDiscount = discount
      ? Number(discount)
      : Math.round(((calculatedOldPrice - Number(price)) / calculatedOldPrice) * 100);

    const newProduct = new Product({
      nameproduct,
      price: Number(price),
      oldPrice: calculatedOldPrice,
      discount: calculatedDiscount,
      category: category || "Robes",
      description: description || undefined,
      img: img || undefined,
      countInStock: countInStock !== undefined ? Number(countInStock) : 20,
      sizes: sizes || ["XS", "S", "M", "L", "XL"],
      colors: colors || ["#1e293b", "#f59e0b", "#ec4899", "#f1f5f9"],
      isFlashSale: Boolean(isFlashSale),
    });

    const result = await newProduct.save();
    res.status(201).json({ product: result, msg: "product is added" });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /product/:id ou /api/product/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ msg: "Produit non trouvé" });
    }
    res.status(200).json({ product, msg: "product is updated" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /product/:id ou /api/product/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Produit non trouvé" });
    }
    res.status(200).json({ msg: "product is deleted" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get list of distinct categories
// @route   GET /product/categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
