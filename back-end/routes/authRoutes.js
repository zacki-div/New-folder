const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  deleteAccount,
  verifyToken
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword
} = require('../middleware/validation');

const router = express.Router();

// Routes publiques
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Routes protégées
router.use(protect); // Toutes les routes suivantes nécessitent une authentification

router.post('/logout', logout);
router.get('/me', getMe);
router.get('/verify-token', verifyToken);
router.put('/profile', validateUpdateProfile, updateProfile);
router.put('/change-password', validateChangePassword, changePassword);
router.delete('/delete-account', deleteAccount);

module.exports = router;
