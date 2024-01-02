const express = require('express');
const { fetchCategory, createCategory, fetchCategories, deleteCategory, updateCategory } = require('../controller/categoryController');
const { uploadSingle } = require('../middleware/upload');
const router = express.Router({ mergeParams: true });

router.route('/category')
    .post(uploadSingle("image"), createCategory)
    .get(fetchCategories)

router.route('/category/:id')
    .get(fetchCategory)
    .delete(deleteCategory)
    .put(updateCategory)

module.exports = router