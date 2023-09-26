const express = require('express');
const router = express.Router();

const {login, dashboard} = require('../controllers/main');

const authMiddleware = require('../middleware/auth')

//there will eventually be a middleware for authentication as well...
// router.route('/dashboard').get(dashboard);
router.route('/dashboard').get(authMiddleware, dashboard); //first will verify token by routing to authMiddleware, and then, once verified, will execute the dashboard waala route(since we have used next() in authMiddleware)
router.route('/login').post(login);

module.exports = router;