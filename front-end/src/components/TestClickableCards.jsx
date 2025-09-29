import React from 'react';
import Cards from './Cards';
import { RECIPES } from './menu/recipes';

// Composant de test pour vérifier que les images et titres sont cliquables
function TestClickableCards() {
  const testRecipes = RECIPES.slice(0, 3);

  const handleAddToCart = (recipe) => {
    console.log('Ajouté au panier:', recipe.title);
    alert(`${recipe.title} ajouté au panier !`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Test des Cartes Cliquables</h2>
      
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Instructions de test :</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Cliquez sur l'image d'une recette → devrait rediriger vers la page de recette</li>
          <li>• Cliquez sur le titre d'une recette → devrait rediriger vers la page de recette</li>
          <li>• Cliquez sur le bouton "Voir" → devrait rediriger vers la page de recette</li>
          <li>• Cliquez sur le bouton cœur → devrait demander l'authentification si non connecté</li>
          <li>• Cliquez sur "Ajouter" → devrait demander l'authentification si non connecté</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testRecipes.map((recipe) => (
          <Cards
            key={recipe.id}
            id={recipe.id}
            image={recipe.image}
            title={recipe.title}
            description={recipe.description}
            rating={recipe.rating}
            time={recipe.time}
            tags={recipe.tags}
            viewUrl={`/recipe/${recipe.id}`}
            onAdd={() => handleAddToCart(recipe)}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-700">
          ✅ Si vous voyez cette page, les modifications ont été appliquées avec succès !
        </p>
      </div>
    </div>
  );
}

export default TestClickableCards;
