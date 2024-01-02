const express = require('express');
const { createCart, fetchCart, fetchCartByUserId, deleteCart } = require('../controller/cartController');
const router = express.Router({ mergeParams: true });

router.get("/user/:userId/cart", fetchCartByUserId)

router.route('/cart')
    .post(createCart)

router.route('/cart/:id')
    .get(fetchCart)
    .delete(deleteCart)

module.exports = router