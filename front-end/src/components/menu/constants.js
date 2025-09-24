// Shared menu constants and helpers
import { MENU_CATEGORIES } from './MenuList'

export const DEFAULT_CATEGORY_NAME = MENU_CATEGORIES[0]?.name || 'Quick and easy'

export const CATEGORY_COPY = {
  'Quick and easy': {
    title: 'Quick and easy',
    subtitle: 'Fast bites for busy days — tasty, simple, and satisfying.',
  },
  'Desserts': {
    title: 'Desserts',
    subtitle: 'Indulge in sweet treats, from creamy classics to modern delights.',
  },
  'Lunch & Dinner': {
    title: 'Lunch & Dinner',
    subtitle: 'Hearty mains and comfort plates to power your day.',
  },
  'Drinks': {
    title: 'Drinks',
    subtitle: 'Refresh with juices, sodas, and specialty sips.',
  },
  'Salads': {
    title: 'Salads',
    subtitle: 'Crisp, fresh, and flavorful bowls packed with goodness.',
  },
  'Patisserie': {
    title: 'Patisserie',
    subtitle: 'Delicate pastries and baked delights crafted to perfection.',
  },
}

export function getCategoryCopy(name) {
  // Special case for unified menu view
  if (name === 'All') {
    return {
      title: 'Menu',
      subtitle: 'Browse all categories and dishes in one place.',
    }
  }
  const entry = CATEGORY_COPY[name]
  if (entry) return entry
  return {
    title: name || DEFAULT_CATEGORY_NAME,
    subtitle: 'Choose a category to explore our dishes.',
  }
}
