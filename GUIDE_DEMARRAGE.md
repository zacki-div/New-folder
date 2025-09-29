# 🚀 Guide de Démarrage - Système d'Authentification Restaurant

## 📋 Prérequis

1. **Node.js** (version 16 ou supérieure)
2. **MongoDB** (version 4.4 ou supérieure)
3. **Git** (optionnel)

## 🛠️ Installation Rapide

### 1. Backend (API d'authentification)

```bash
# Naviguer vers le dossier backend
cd back-end

# Installer les dépendances (si npm fonctionne)
npm install

# OU installer manuellement les packages principaux
# Si vous avez des problèmes avec npm, vous pouvez essayer:
# - Activer l'exécution de scripts PowerShell
# - Utiliser yarn à la place
# - Ou installer les packages un par un
```

### 2. Démarrer MongoDB

```bash
# Windows (si MongoDB est installé)
mongod

# OU utiliser MongoDB Compass
# OU utiliser un service cloud comme MongoDB Atlas
```

### 3. Configuration

```bash
# Le fichier .env est déjà configuré avec des valeurs par défaut
# Vous pouvez modifier back-end/.env si nécessaire
```

### 4. Démarrer le serveur backend

```bash
# Depuis le dossier back-end
node server.js

# Le serveur démarre sur http://localhost:5000
```

### 5. Frontend (Interface utilisateur)

```bash
# Dans un nouveau terminal, naviguer vers le frontend
cd front-end

# Le serveur de développement devrait déjà être en cours
# Si ce n'est pas le cas:
node node_modules/vite/bin/vite.js

# L'application s'ouvre sur http://localhost:5173
```

## 🧪 Test du Système

### Test Automatique

```bash
# Depuis le dossier back-end
node test-auth.js
```

### Test Manuel

1. **Ouvrir l'application** : http://localhost:5173
2. **S'inscrire** : Cliquer sur "S'inscrire" dans la navigation
3. **Se connecter** : Utiliser les identifiants créés
4. **Accéder au profil** : Cliquer sur l'icône utilisateur
5. **Modifier le profil** : Tester la modification des informations
6. **Se déconnecter** : Cliquer sur l'icône de déconnexion

## 🎯 Fonctionnalités Disponibles

### ✅ Authentification
- [x] Inscription avec validation
- [x] Connexion sécurisée
- [x] Déconnexion
- [x] Protection des routes
- [x] Gestion des sessions JWT

### ✅ Profil Utilisateur
- [x] Affichage des informations
- [x] Modification du profil
- [x] Upload d'avatar
- [x] Statistiques utilisateur

### ✅ Sécurité
- [x] Hashage des mots de passe
- [x] Validation des données
- [x] Protection CORS
- [x] Rate limiting
- [x] Gestion des erreurs

### ✅ Interface Utilisateur
- [x] Design responsive
- [x] Navigation adaptative
- [x] Gestion d'état globale
- [x] Messages d'erreur
- [x] Indicateurs de chargement

## 🔧 Résolution des Problèmes

### Problème: "Scripts disabled" avec npm

**Solution 1 - PowerShell:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Solution 2 - Utiliser yarn:**
```bash
npm install -g yarn
yarn install
yarn dev
```

**Solution 3 - Commande directe:**
```bash
node server.js
```

### Problème: MongoDB non disponible

**Solution 1 - Installation locale:**
- Télécharger MongoDB Community Server
- Installer et démarrer le service
- Ou utiliser MongoDB Compass

**Solution 2 - MongoDB Atlas (Cloud):**
- Créer un compte sur MongoDB Atlas
- Modifier `MONGODB_URI` dans `.env`

**Solution 3 - Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### Problème: Port déjà utilisé

```bash
# Changer le port dans back-end/.env
PORT=5001

# Ou tuer le processus utilisant le port
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Problème: CORS

Si vous avez des erreurs CORS, vérifiez que `FRONTEND_URL` dans `.env` correspond à l'URL de votre frontend.

## 📱 Utilisation de l'Application

### 1. Page d'Accueil
- Navigation vers les différentes sections
- Affichage du statut de connexion

### 2. Inscription
- Formulaire avec validation en temps réel
- Vérification de la force du mot de passe
- Redirection automatique après inscription

### 3. Connexion
- Authentification sécurisée
- Gestion des erreurs (compte verrouillé, etc.)
- Persistance de la session

### 4. Profil Utilisateur
- Affichage des informations personnelles
- Mode édition avec validation
- Upload d'avatar
- Statistiques d'activité

### 5. Navigation
- **Desktop** : Icônes dans la barre de navigation
- **Mobile** : Menu hamburger avec options complètes
- **État connecté** : Affichage du nom d'utilisateur
- **Déconnexion** : Bouton accessible facilement

## 🔐 Sécurité Implémentée

### Côté Backend
- **JWT** avec expiration configurable
- **Bcrypt** pour le hashage des mots de passe
- **Rate limiting** contre les attaques par force brute
- **Validation stricte** des données d'entrée
- **Protection CORS** configurée
- **Headers de sécurité** avec Helmet

### Côté Frontend
- **Gestion sécurisée des tokens**
- **Validation côté client**
- **Protection des routes sensibles**
- **Nettoyage automatique des données**
- **Gestion des erreurs utilisateur**

## 📊 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Profil utilisateur
- `PUT /api/auth/profile` - Mise à jour profil
- `PUT /api/auth/change-password` - Changement mot de passe

### Utilitaires
- `GET /api/health` - État du serveur
- `GET /api/auth/verify-token` - Vérification token

## 🎨 Personnalisation

### Thème et Couleurs
- Couleurs principales : Orange (#ea580c) et Rose (#ec4899)
- Framework CSS : Tailwind CSS
- Icônes : Feather Icons (react-icons/fi)

### Configuration
- Variables d'environnement dans `.env`
- Configuration Tailwind dans `tailwind.config.js`
- Configuration Vite dans `vite.config.js`

## 📈 Prochaines Étapes

### Améliorations Possibles
- [ ] Réinitialisation de mot de passe par email
- [ ] Vérification d'email
- [ ] Authentification à deux facteurs
- [ ] OAuth (Google, Facebook)
- [ ] Gestion des rôles avancée
- [ ] Historique des connexions
- [ ] Notifications push
- [ ] Mode sombre

### Intégrations
- [ ] Service d'email (SendGrid, Mailgun)
- [ ] Stockage d'images (Cloudinary, AWS S3)
- [ ] Analytics (Google Analytics)
- [ ] Monitoring (Sentry)
- [ ] Tests automatisés (Jest, Cypress)

## 🆘 Support

En cas de problème :

1. **Vérifiez les logs** dans la console du navigateur et du serveur
2. **Consultez la documentation** des erreurs affichées
3. **Testez avec le script** `test-auth.js`
4. **Vérifiez la configuration** dans les fichiers `.env`
5. **Redémarrez les services** (MongoDB, serveurs)

## 🏆 Félicitations !

Vous avez maintenant un système d'authentification complet et sécurisé ! 🎉

L'application est prête pour la production avec quelques ajustements de configuration pour l'environnement de déploiement.
