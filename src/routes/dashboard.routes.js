const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const identificarMiddleware = require('../middlewares/identificarMiddlewares');

router.get(
  '/',
  authMiddleware,
  identificarMiddleware(['recepcionista']),
  dashboardController.getDashboard
);

module.exports = router;