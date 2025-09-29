// Script de test pour le système d'authentification
// Utilise uniquement les modules Node.js natifs pour éviter les problèmes de dépendances

const http = require('http');
const https = require('https');

// Configuration
const API_BASE = 'http://localhost:5000/api';

// Fonction utilitaire pour faire des requêtes HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const httpModule = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = httpModule.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: parsedData
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

// Tests
async function runTests() {
  console.log('🧪 Démarrage des tests d\'authentification...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣  Test Health Check...');
    const healthResponse = await makeRequest(`${API_BASE}/health`);
    console.log(`   Status: ${healthResponse.statusCode}`);
    console.log(`   Response: ${JSON.stringify(healthResponse.data, null, 2)}\n`);

    // Test 2: Inscription
    console.log('2️⃣  Test Inscription...');
    const registerData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test${Date.now()}@example.com`,
      password: 'TestPassword123!',
      phone: '0612345678'
    };

    const registerResponse = await makeRequest(`${API_BASE}/auth/register`, {
      method: 'POST',
      body: registerData
    });
    
    console.log(`   Status: ${registerResponse.statusCode}`);
    if (registerResponse.statusCode === 201) {
      console.log('   ✅ Inscription réussie');
      console.log(`   Token reçu: ${registerResponse.data.token ? 'Oui' : 'Non'}`);
    } else {
      console.log('   ❌ Échec de l\'inscription');
      console.log(`   Erreur: ${JSON.stringify(registerResponse.data, null, 2)}`);
    }
    console.log();

    // Test 3: Connexion
    console.log('3️⃣  Test Connexion...');
    const loginResponse = await makeRequest(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: {
        email: registerData.email,
        password: registerData.password
      }
    });

    console.log(`   Status: ${loginResponse.statusCode}`);
    let authToken = null;
    
    if (loginResponse.statusCode === 200) {
      console.log('   ✅ Connexion réussie');
      authToken = loginResponse.data.token;
      console.log(`   Token reçu: ${authToken ? 'Oui' : 'Non'}`);
    } else {
      console.log('   ❌ Échec de la connexion');
      console.log(`   Erreur: ${JSON.stringify(loginResponse.data, null, 2)}`);
    }
    console.log();

    // Test 4: Accès au profil (route protégée)
    if (authToken) {
      console.log('4️⃣  Test Accès Profil (Route Protégée)...');
      const profileResponse = await makeRequest(`${API_BASE}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      console.log(`   Status: ${profileResponse.statusCode}`);
      if (profileResponse.statusCode === 200) {
        console.log('   ✅ Accès au profil réussi');
        console.log(`   Utilisateur: ${profileResponse.data.user.firstName} ${profileResponse.data.user.lastName}`);
      } else {
        console.log('   ❌ Échec de l\'accès au profil');
        console.log(`   Erreur: ${JSON.stringify(profileResponse.data, null, 2)}`);
      }
      console.log();

      // Test 5: Mise à jour du profil
      console.log('5️⃣  Test Mise à jour Profil...');
      const updateResponse = await makeRequest(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: {
          bio: 'Bio mise à jour par le test automatique',
          address: '123 Rue de Test, 75001 Paris'
        }
      });

      console.log(`   Status: ${updateResponse.statusCode}`);
      if (updateResponse.statusCode === 200) {
        console.log('   ✅ Mise à jour du profil réussie');
      } else {
        console.log('   ❌ Échec de la mise à jour du profil');
        console.log(`   Erreur: ${JSON.stringify(updateResponse.data, null, 2)}`);
      }
      console.log();

      // Test 6: Déconnexion
      console.log('6️⃣  Test Déconnexion...');
      const logoutResponse = await makeRequest(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      console.log(`   Status: ${logoutResponse.statusCode}`);
      if (logoutResponse.statusCode === 200) {
        console.log('   ✅ Déconnexion réussie');
      } else {
        console.log('   ❌ Échec de la déconnexion');
        console.log(`   Erreur: ${JSON.stringify(logoutResponse.data, null, 2)}`);
      }
      console.log();
    }

    // Test 7: Tentative d'accès sans token
    console.log('7️⃣  Test Accès Sans Token (Sécurité)...');
    const unauthorizedResponse = await makeRequest(`${API_BASE}/auth/me`, {
      method: 'GET'
    });

    console.log(`   Status: ${unauthorizedResponse.statusCode}`);
    if (unauthorizedResponse.statusCode === 401) {
      console.log('   ✅ Accès correctement refusé');
    } else {
      console.log('   ❌ Problème de sécurité détecté');
    }
    console.log();

    console.log('🎉 Tests terminés!');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Suggestions:');
      console.log('   - Vérifiez que le serveur backend est démarré');
      console.log('   - Vérifiez que MongoDB est en cours d\'exécution');
      console.log('   - Vérifiez que le port 5000 est disponible');
    }
  }
}

// Vérification de la disponibilité du serveur
async function checkServerAvailability() {
  try {
    console.log('🔍 Vérification de la disponibilité du serveur...');
    await makeRequest(`${API_BASE}/health`);
    console.log('✅ Serveur disponible\n');
    return true;
  } catch (error) {
    console.log('❌ Serveur non disponible');
    console.log('💡 Assurez-vous que le serveur backend est démarré sur le port 5000\n');
    return false;
  }
}

// Point d'entrée
async function main() {
  console.log('🚀 Test du Système d\'Authentification');
  console.log('=====================================\n');
  
  const serverAvailable = await checkServerAvailability();
  
  if (serverAvailable) {
    await runTests();
  } else {
    console.log('⚠️  Impossible d\'exécuter les tests sans serveur backend');
    console.log('\nPour démarrer le serveur:');
    console.log('1. cd back-end');
    console.log('2. npm install');
    console.log('3. npm run dev');
  }
}

// Exécuter les tests
main().catch(console.error);
