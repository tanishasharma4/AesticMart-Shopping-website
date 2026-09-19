import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { getDBStatus } from '../config/db.js';
import { seedProducts, seedCategories } from '../seeders/seedData.js';

// Helper for filtering in-memory products array
const filterProductsInMemory = (products, query) => {
  const { search, category, minPrice, maxPrice, rating, sort } = query;
  let result = [...products];

  if (search) {
    const s = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        p.brand.toLowerCase().includes(s)
    );
  }

  if (category && category !== 'all') {
    result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (minPrice) {
    result = result.filter((p) => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    result = result.filter((p) => p.price <= parseFloat(maxPrice));
  }

  if (rating) {
    result = result.filter((p) => p.rating >= parseFloat(rating));
  }

  if (sort) {
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sort === 'newest') result.sort((a, b) => (b.isNewArrival ? 1 : -1));
    else if (sort === 'popular') result.sort((a, b) => b.numReviews - a.numReviews);
  }

  return result;
};

// @desc    Get all products with search, filter, and sort
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, rating, sort } = req.query;

    if (getDBStatus()) {
      let queryFilter = {};

      if (search) {
        queryFilter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
        ];
      }

      if (category && category !== 'all') {
        queryFilter.category = category;
      }

      if (minPrice || maxPrice) {
        queryFilter.price = {};
        if (minPrice) queryFilter.price.$gte = Number(minPrice);
        if (maxPrice) queryFilter.price.$lte = Number(maxPrice);
      }

      if (rating) {
        queryFilter.rating = { $gte: Number(rating) };
      }

      let sortOptions = {};
      if (sort === 'price-asc') sortOptions.price = 1;
      else if (sort === 'price-desc') sortOptions.price = -1;
      else if (sort === 'rating') sortOptions.rating = -1;
      else if (sort === 'popular') sortOptions.numReviews = -1;
      else sortOptions.createdAt = -1; // newest

      const products = await Product.find(queryFilter).sort(sortOptions);
      return res.json(products);
    } else {
      // In-memory filter
      const storeProducts = req.inMemoryStore ? req.inMemoryStore.products : seedProducts;
      const filtered = filterProductsInMemory(storeProducts, req.query);
      return res.json(filtered);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    if (getDBStatus()) {
      const product = await Product.findById(req.params.id);
      if (product) {
        return res.json(product);
      } else {
        return res.status(404).json({ message: 'Product not found' });
      }
    } else {
      const storeProducts = req.inMemoryStore ? req.inMemoryStore.products : seedProducts;
      const product = storeProducts.find((p) => p._id.toString() === req.params.id || p.slug === req.params.id);
      if (product) {
        return res.json(product);
      } else {
        return res.status(404).json({ message: 'Product not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ message: 'Please provide both a rating and a comment' });
  }

  try {
    if (getDBStatus()) {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
      if (alreadyReviewed) {
        return res.status(400).json({ message: 'You have already reviewed this product' });
      }

      const review = {
        user: req.user._id,
        userName: req.user.name,
        userAvatar: req.user.avatar,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

      await product.save();
      return res.status(201).json({ message: 'Review added successfully', reviews: product.reviews, rating: product.rating });
    } else {
      const storeProducts = req.inMemoryStore.products;
      const product = storeProducts.find((p) => p._id.toString() === req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      const review = {
        _id: 'rev_' + Date.now(),
        userName: req.user ? req.user.name : 'Verified Customer',
        userAvatar: req.user ? req.user.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        rating: Number(rating),
        comment,
        createdAt: new Date().toISOString(),
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = parseFloat(
        (product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length).toFixed(1)
      );

      return res.status(201).json({ message: 'Review added successfully', reviews: product.reviews, rating: product.rating });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all product categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    if (getDBStatus()) {
      const categories = await Category.find({});
      res.json(categories);
    } else {
      const categories = req.inMemoryStore ? req.inMemoryStore.categories : seedCategories;
      res.json(categories);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
