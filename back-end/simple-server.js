// Serveur d'authentification simplifié utilisant uniquement les modules natifs Node.js
const http = require('http');
const url = require('url');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Base de données en mémoire (pour la démo)
const users = new Map();
const sessions = new Map();

// Configuration
const PORT = 5000;
const JWT_SECRET = 'super_secret_jwt_key_for_restaurant_app_2024_secure';

// Utilitaires
function generateId() {
  return crypto.randomBytes(16).toString('hex');
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, hash) {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
}

function generateJWT(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payloadStr}`).digest('base64url');
  return `${header}.${payloadStr}.${signature}`;
}

function verifyJWT(token) {
  try {
    const [header, payload, signature] = token.split('.');
    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url');
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    return JSON.parse(Buffer.from(payload, 'base64url').toString());
  } catch (error) {
    return null;
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // Au moins 8 caractères, une majuscule, une minuscule, un chiffre, un caractère spécial
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function getAuthToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

// Handlers
async function handleRegister(req, res) {
  try {
    const { firstName, lastName, email, password, phone } = await parseBody(req);
    
    // Validation
    if (!firstName || !lastName || !email || !password) {
      return sendResponse(res, 400, {
        success: false,
        message: 'Tous les champs obligatoires doivent être remplis'
      });
    }
    
    if (!validateEmail(email)) {
      return sendResponse(res, 400, {
        success: false,
        message: 'Adresse email invalide'
      });
    }
    
    if (!validatePassword(password)) {
      return sendResponse(res, 400, {
        success: false,
        message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
      });
    }
    
    // Vérifier si l'utilisateur existe déjà
    if (users.has(email)) {
      return sendResponse(res, 400, {
        success: false,
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }
    
    // Créer l'utilisateur
    const { salt, hash } = hashPassword(password);
    const userId = generateId();
    const user = {
      id: userId,
      firstName,
      lastName,
      email,
      phone: phone || '',
      address: '',
      birthDate: '',
      bio: '',
      avatar: null,
      role: 'user',
      isActive: true,
      emailVerified: false,
      createdAt: new Date().toISOString(),
      salt,
      hash,
      stats: {
        ordersCount: 0,
        favoritesCount: 0,
        reviewsCount: 0
      }
    };
    
    users.set(email, user);
    
    // Générer le token
    const token = generateJWT({
      id: userId,
      email,
      role: 'user',
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 jours
    });
    
    // Créer la session
    sessions.set(token, userId);
    
    // Réponse (sans données sensibles)
    const { salt: _, hash: __, ...publicUser } = user;
    
    sendResponse(res, 201, {
      success: true,
      message: 'Inscription réussie',
      token,
      user: publicUser
    });
    
  } catch (error) {
    console.error('Erreur inscription:', error);
    sendResponse(res, 500, {
      success: false,
      message: 'Erreur serveur lors de l\'inscription'
    });
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = await parseBody(req);
    
    if (!email || !password) {
      return sendResponse(res, 400, {
        success: false,
        message: 'Email et mot de passe requis'
      });
    }
    
    const user = users.get(email);
    if (!user) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Identifiants invalides'
      });
    }
    
    if (!verifyPassword(password, user.salt, user.hash)) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Identifiants invalides'
      });
    }
    
    // Générer le token
    const token = generateJWT({
      id: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60)
    });
    
    sessions.set(token, user.id);
    
    // Mettre à jour la dernière connexion
    user.lastLogin = new Date().toISOString();
    
    const { salt: _, hash: __, ...publicUser } = user;
    
    sendResponse(res, 200, {
      success: true,
      message: 'Connexion réussie',
      token,
      user: publicUser
    });
    
  } catch (error) {
    console.error('Erreur connexion:', error);
    sendResponse(res, 500, {
      success: false,
      message: 'Erreur serveur lors de la connexion'
    });
  }
}

async function handleLogout(req, res) {
  try {
    const token = getAuthToken(req);
    if (token) {
      sessions.delete(token);
    }
    
    sendResponse(res, 200, {
      success: true,
      message: 'Déconnexion réussie'
    });
    
  } catch (error) {
    console.error('Erreur déconnexion:', error);
    sendResponse(res, 500, {
      success: false,
      message: 'Erreur serveur lors de la déconnexion'
    });
  }
}

async function handleGetProfile(req, res) {
  try {
    const token = getAuthToken(req);
    if (!token) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Token manquant'
      });
    }
    
    const payload = verifyJWT(token);
    if (!payload || !sessions.has(token)) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Token invalide'
      });
    }
    
    const user = Array.from(users.values()).find(u => u.id === payload.id);
    if (!user) {
      return sendResponse(res, 404, {
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    const { salt: _, hash: __, ...publicUser } = user;
    
    sendResponse(res, 200, {
      success: true,
      user: publicUser
    });
    
  } catch (error) {
    console.error('Erreur profil:', error);
    sendResponse(res, 500, {
      success: false,
      message: 'Erreur serveur'
    });
  }
}

async function handleUpdateProfile(req, res) {
  try {
    const token = getAuthToken(req);
    if (!token) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Token manquant'
      });
    }
    
    const payload = verifyJWT(token);
    if (!payload || !sessions.has(token)) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Token invalide'
      });
    }
    
    const user = Array.from(users.values()).find(u => u.id === payload.id);
    if (!user) {
      return sendResponse(res, 404, {
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    const updates = await parseBody(req);
    
    // Mettre à jour les champs autorisés
    const allowedFields = ['firstName', 'lastName', 'phone', 'address', 'birthDate', 'bio', 'avatar'];
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        user[field] = updates[field];
      }
    });
    
    const { salt: _, hash: __, ...publicUser } = user;
    
    sendResponse(res, 200, {
      success: true,
      message: 'Profil mis à jour avec succès',
      user: publicUser
    });
    
  } catch (error) {
    console.error('Erreur mise à jour profil:', error);
    sendResponse(res, 500, {
      success: false,
      message: 'Erreur serveur'
    });
  }
}

function handleHealth(req, res) {
  sendResponse(res, 200, {
    message: 'Serveur d\'authentification fonctionnel',
    timestamp: new Date().toISOString(),
    environment: 'development',
    users: users.size,
    sessions: sessions.size
  });
}

// Serveur principal
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  
  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    });
    res.end();
    return;
  }
  
  console.log(`${method} ${path}`);
  
  try {
    // Routes
    if (path === '/api/health' && method === 'GET') {
      handleHealth(req, res);
    } else if (path === '/api/auth/register' && method === 'POST') {
      await handleRegister(req, res);
    } else if (path === '/api/auth/login' && method === 'POST') {
      await handleLogin(req, res);
    } else if (path === '/api/auth/logout' && method === 'POST') {
      await handleLogout(req, res);
    } else if (path === '/api/auth/me' && method === 'GET') {
      await handleGetProfile(req, res);
    } else if (path === '/api/auth/verify-token' && method === 'GET') {
      await handleGetProfile(req, res); // Même logique
    } else if (path === '/api/auth/profile' && method === 'PUT') {
      await handleUpdateProfile(req, res);
    } else {
      sendResponse(res, 404, {
        success: false,
        message: 'Route non trouvée'
      });
    }
  } catch (error) {
    console.error('Erreur serveur:', error);
    sendResponse(res, 500, {
      success: false,
      message: 'Erreur serveur interne'
    });
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Serveur d'authentification démarré sur le port ${PORT}`);
  console.log(`📡 API disponible sur: http://localhost:${PORT}/api`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💾 Base de données: En mémoire (${users.size} utilisateurs)`);
  console.log(`\n✅ Prêt à recevoir les requêtes du frontend !`);
});

// Gestion propre de l'arrêt
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du serveur...');
  server.close(() => {
    console.log('✅ Serveur arrêté proprement');
    process.exit(0);
  });
});
