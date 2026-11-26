const Product = require("../models/product");

// @desc    Get all projects with search, category filter, sorting
// @route   GET /product ou /api/product
const getProducts = async (req, res, next) => {
  try {
    const { search, category, status, sortBy } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { nameproduct: { $regex: search, $options: "i" } },
        { tagline: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { technologies: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (category && category !== "All" && category !== "Tous") {
      query.category = category;
    }

    if (status && status !== "Tous") {
      query.status = status;
    }

    let sortOption = { upvotes: -1, createdAt: -1 };
    if (sortBy === "upvotes_desc") sortOption = { upvotes: -1 };
    if (sortBy === "newest") sortOption = { createdAt: -1 };
    if (sortBy === "name_asc") sortOption = { nameproduct: 1 };

    const products = await Product.find(query).sort(sortOption);
    res.status(200).json({ products, msg: "all projects", count: products.length });
  } catch (error) {
    next(error);
  }
};

// @desc    Get project by id
// @route   GET /product/:id ou /api/product/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Projet non trouvé" });
    }
    res.status(200).json({ product, msg: "one project" });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit new project
// @route   POST /product/add ou /api/product/add
const addProduct = async (req, res, next) => {
  try {
    const {
      nameproduct,
      tagline,
      description,
      category,
      technologies,
      img,
      githubUrl,
      demoUrl,
      status,
      authorName,
      authorAvatar,
    } = req.body;

    if (!nameproduct || !description) {
      return res.status(400).json({ msg: "Le titre et la description sont obligatoires." });
    }

    let techArray = technologies;
    if (typeof technologies === "string") {
      techArray = technologies.split(",").map((t) => t.trim()).filter(Boolean);
    }

    const newProject = new Product({
      nameproduct,
      tagline: tagline || "Application logicielle développée par des étudiants.",
      description,
      category: category || "Web Fullstack",
      technologies: techArray && techArray.length > 0 ? techArray : ["React", "Node.js"],
      img: img || undefined,
      githubUrl: githubUrl || "https://github.com",
      demoUrl: demoUrl || undefined,
      status: status || "Bêta",
      authorName: authorName || "Étudiant GL3",
      authorAvatar: authorAvatar || undefined,
      upvotes: 1,
    });

    const result = await newProject.save();
    res.status(201).json({ product: result, msg: "project is submitted" });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /product/:id ou /api/product/:id
const updateProduct = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (typeof updateData.technologies === "string") {
      updateData.technologies = updateData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ msg: "Projet non trouvé" });
    }
    res.status(200).json({ product, msg: "project is updated" });
  } catch (error) {
    next(error);
  }
};

// @desc    Upvote a project
// @route   PUT /product/:id/upvote ou /api/product/:id/upvote
const upvoteProject = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ msg: "Projet non trouvé" });
    }
    res.status(200).json({ product, msg: "upvote registered" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /product/:id ou /api/product/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Projet non trouvé" });
    }
    res.status(200).json({ msg: "project is deleted" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get categories
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
  upvoteProject,
  deleteProduct,
  getCategories,
};
