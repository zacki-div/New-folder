// Shared menu constants and helpers
import { MENU_CATEGORIES } from './MenuList'

export const DEFAULT_CATEGORY_NAME = MENU_CATEGORIES[0]?.name || 'Rapide et facile'

export const CATEGORY_COPY = {
  'Rapide et facile': {
    title: 'Rapide et facile',
    subtitle: 'Plats rapides pour les journées chargées — savoureux, simples et satisfaisants.',
  },
  'Desserts': {
    title: 'Desserts',
    subtitle: 'Savourez des douceurs sucrées, des classiques crémeux aux délices modernes.',
  },
  'Déjeuner & Dîner': {
    title: 'Déjeuner & Dîner',
    subtitle: 'Plats copieux et réconfortants pour vous donner de l\'énergie toute la journée.',
  },
  'Boissons': {
    title: 'Boissons',
    subtitle: 'Rafraîchissez-vous avec des jus, sodas et boissons spéciales.',
  },
  'Salades': {
    title: 'Salades',
    subtitle: 'Bolons croquants, frais et savoureux pleins de bienfaits.',
  },
}

export function getCategoryCopy(name) {
  // Special case for unified menu view
  if (name === 'All') {
    return {
      title: 'Menu',
      subtitle: 'Parcourez toutes les catégories et plats en un seul endroit.',
    }
  }
  const entry = CATEGORY_COPY[name]
  if (entry) return entry
  return {
    title: name || DEFAULT_CATEGORY_NAME,
    subtitle: 'Choisissez une catégorie pour explorer nos plats.',
  }
}
