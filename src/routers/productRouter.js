const express = require('express');
const {
    createProduct,
    fetchProducts,
    deleteProduct,
    fetchProductsByCategoryId,
    updateProduct
} = require('../controller/productController');
const { uploadMulti } = require('../middleware/upload');
const router = express.Router();

router.route('/product')
    .post(uploadMulti("images", 2), createProduct)
    .get(fetchProducts)
router.route('/product/:id')
    .delete(deleteProduct)
    .put(updateProduct)

//Fetch products by categoryId
router.get('/product/:categoryId/category', fetchProductsByCategoryId)
module.exports = router