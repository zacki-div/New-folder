# Backend d'Authentification - Application Restaurant

## 🚀 Fonctionnalités

### Authentification Sécurisée
- **Inscription** avec validation des données
- **Connexion** avec protection contre les attaques par force brute
- **Déconnexion** sécurisée
- **Gestion des sessions** avec JWT
- **Hashage des mots de passe** avec bcrypt (salt 12)
- **Protection contre les tentatives de connexion multiples**

### Gestion des Utilisateurs
- **Profils utilisateur** complets avec avatar
- **Mise à jour des informations** personnelles
- **Changement de mot de passe** sécurisé
- **Suppression de compte**
- **Système de rôles** (user, admin, manager)
- **Statistiques utilisateur**

### Sécurité
- **Validation des données** avec express-validator
- **Protection CORS** configurée
- **Limitation du taux de requêtes** (rate limiting)
- **Headers de sécurité** avec Helmet
- **Gestion centralisée des erreurs**

## 📁 Structure MVC

```
back-end/
├── controllers/          # Logique métier
│   ├── authController.js # Authentification
│   └── userController.js # Gestion utilisateurs
├── models/              # Modèles de données
│   └── User.js         # Modèle utilisateur Mongoose
├── routes/             # Routes API
│   ├── authRoutes.js   # Routes d'authentification
│   └── userRoutes.js   # Routes utilisateurs
├── middleware/         # Middlewares personnalisés
│   ├── auth.js        # Protection des routes
│   ├── validation.js  # Validation des données
│   └── errorHandler.js # Gestion des erreurs
├── .env               # Variables d'environnement
└── server.js          # Point d'entrée
```

## 🛠️ Installation

1. **Installer les dépendances**
```bash
cd back-end
npm install
```

2. **Configurer les variables d'environnement**
```bash
cp .env.example .env
# Modifier les valeurs dans .env
```

3. **Démarrer MongoDB**
```bash
# Assurez-vous que MongoDB est installé et en cours d'exécution
mongod
```

4. **Démarrer le serveur**
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## 📡 API Endpoints

### Authentification (`/api/auth`)

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/register` | Inscription | ❌ |
| POST | `/login` | Connexion | ❌ |
| POST | `/logout` | Déconnexion | ✅ |
| GET | `/me` | Profil utilisateur | ✅ |
| GET | `/verify-token` | Vérifier token | ✅ |
| PUT | `/profile` | Mettre à jour profil | ✅ |
| PUT | `/change-password` | Changer mot de passe | ✅ |
| DELETE | `/delete-account` | Supprimer compte | ✅ |

### Gestion Utilisateurs (`/api/users`) - Admin uniquement

| Méthode | Endpoint | Description | Rôle |
|---------|----------|-------------|------|
| GET | `/` | Liste utilisateurs | Admin/Manager |
| GET | `/stats` | Statistiques | Admin |
| GET | `/:id` | Utilisateur par ID | Admin/Manager |
| PUT | `/:id` | Modifier utilisateur | Admin |
| DELETE | `/:id` | Supprimer utilisateur | Admin |

## 🔐 Exemples d'utilisation

### Inscription
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean.dupont@email.com",
  "password": "MotDePasse123!",
  "phone": "0612345678"
}
```

### Connexion
```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "jean.dupont@email.com",
  "password": "MotDePasse123!"
}
```

### Requête authentifiée
```javascript
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

## 🔒 Sécurité Implémentée

### Validation des Mots de Passe
- Minimum 8 caractères
- Au moins une minuscule
- Au moins une majuscule
- Au moins un chiffre
- Au moins un caractère spécial

### Protection contre les Attaques
- **Limitation des tentatives** : 5 tentatives max, verrouillage 2h
- **Rate limiting** : 100 requêtes/15min par IP
- **Validation stricte** des données d'entrée
- **Sanitisation** des entrées utilisateur

### Tokens JWT
- **Expiration** : 7 jours par défaut
- **Signature sécurisée** avec secret fort
- **Payload minimal** (id, email, role)

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Tests avec couverture
npm run test:coverage
```

## 📊 Monitoring

### Health Check
```
GET /api/health
```

### Logs
- Erreurs automatiquement loggées
- Tentatives de connexion suspectes trackées
- Activité utilisateur enregistrée

## 🚨 Gestion des Erreurs

Le système gère automatiquement :
- Erreurs de validation Mongoose
- Erreurs de duplication (email existant)
- Erreurs JWT (token invalide/expiré)
- Erreurs de cast MongoDB
- Erreurs serveur génériques

## 🔧 Configuration

### Variables d'environnement requises
```env
MONGODB_URI=mongodb://localhost:27017/restaurant_auth
JWT_SECRET=votre_secret_jwt_tres_securise
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Base de données
- **MongoDB** avec Mongoose ODM
- **Indexes** optimisés pour les performances
- **Validation** au niveau schéma

## 📈 Performance

- **Pagination** pour les listes d'utilisateurs
- **Indexes** sur les champs fréquemment recherchés
- **Middleware** de mise en cache (à implémenter)
- **Compression** des réponses

## 🔄 Intégration Frontend

Le backend est conçu pour fonctionner avec :
- React avec Context API
- Service d'authentification centralisé
- Gestion d'état globale
- Intercepteurs de requêtes automatiques
