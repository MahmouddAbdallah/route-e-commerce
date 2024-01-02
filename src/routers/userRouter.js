const express = require('express');
const { updateUser, fetchUser, fetchUsers } = require('../controller/userController');
const router = express.Router();

router.get("/user", fetchUsers)

router.route("/user/:userId")
    .put(updateUser)
    .get(fetchUser)

module.exports = router