const API_BASE_URL = 'http://localhost:5000/api';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  // Configuration des headers avec token
  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` })
    };
  }

  // Inscription
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("📛 Erreurs:", data);
        throw new Error(data.message || "Erreur inconnue");
      }

      // Stocker le token et l'utilisateur
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));

      // Déclencher un événement personnalisé
      window.dispatchEvent(new CustomEvent('auth_state_changed', {
        detail: { isAuthenticated: true, user: this.user }
      }));

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Connexion
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la connexion');
      }

      // Stocker le token et l'utilisateur
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));

      // Déclencher un événement personnalisé
      window.dispatchEvent(new CustomEvent('auth_state_changed', {
        detail: { isAuthenticated: true, user: this.user }
      }));

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Déconnexion
  async logout() {
    try {
      if (this.token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: this.getAuthHeaders()
        });
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Nettoyer le stockage local
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Déclencher un événement personnalisé
      window.dispatchEvent(new CustomEvent('auth_state_changed', {
        detail: { isAuthenticated: false, user: null }
      }));
    }
  }

  // Obtenir le profil utilisateur
  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: this.getAuthHeaders()
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération du profil');
      }

      // Mettre à jour l'utilisateur local
      this.user = data.user;
      localStorage.setItem('user', JSON.stringify(this.user));

      return data.user;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour le profil
  async updateProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour du profil');
      }

      // Mettre à jour l'utilisateur local
      this.user = data.user;
      localStorage.setItem('user', JSON.stringify(this.user));

      // Déclencher un événement personnalisé
      window.dispatchEvent(new CustomEvent('profile_updated', {
        detail: { user: this.user }
      }));

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Changer le mot de passe
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors du changement de mot de passe');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  // Obtenir l'utilisateur actuel
  getCurrentUser() {
    return this.user;
  }

  // Obtenir le token
  getToken() {
    return this.token;
  }

  // Vérifier la validité du token
  async verifyToken() {
    if (!this.token) {
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        // Token invalide, nettoyer
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      // Erreur de réseau ou autre, nettoyer par sécurité
      this.logout();
      return false;
    }
  }

  // Initialiser le service (vérifier le token au démarrage)
  async initialize() {
    if (this.token) {
      const isValid = await this.verifyToken();
      if (!isValid) {
        this.logout();
      }
    }
    return this.isAuthenticated();
  }
}

// Créer une instance unique
const authService = new AuthService();

export default authService;
