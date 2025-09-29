const express = require('express');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
} = require('../controllers/userController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(protect);

// Routes pour les administrateurs seulement
router.get('/', authorize('admin', 'manager'), getUsers);
router.get('/stats', authorize('admin'), getUserStats);
router.get('/:id', authorize('admin', 'manager'), getUserById);
router.put('/:id', authorize('admin'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;
