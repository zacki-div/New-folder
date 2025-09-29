import React from 'react';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import Button from './Button';

// Composant de test pour vérifier la redirection d'authentification
function TestAuthRedirect() {
  const { requireAuth, isAuthenticated } = useAuthRedirect();

  const handleTestFavorite = requireAuth(() => {
    alert('Ajouté aux favoris !');
  });

  const handleTestCart = requireAuth(() => {
    alert('Ajouté au panier !');
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Test de Redirection d'Authentification</h3>
      
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          État: {isAuthenticated ? (
            <span className="text-green-600 font-medium">✅ Connecté</span>
          ) : (
            <span className="text-red-600 font-medium">❌ Non connecté</span>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleTestFavorite}
            variant="ghost"
            className="flex items-center gap-2 px-4 py-2 border border-pink-200 text-pink-600 hover:bg-pink-50"
          >
            <FiHeart className="w-4 h-4" />
            Test Favoris
          </Button>

          <Button
            onClick={handleTestCart}
            variant="solid"
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white hover:bg-orange-700"
          >
            <FiShoppingCart className="w-4 h-4" />
            Test Panier
          </Button>
        </div>

        <div className="text-xs text-gray-500">
          {isAuthenticated ? (
            "Les boutons ci-dessus devraient fonctionner normalement."
          ) : (
            "Cliquez sur les boutons ci-dessus pour être redirigé vers la page d'inscription."
          )}
        </div>
      </div>
    </div>
  );
}

export default TestAuthRedirect;
