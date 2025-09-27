import React from 'react'
import { FaHamburger, FaIceCream, FaPizzaSlice, FaGlassCheers, FaAppleAlt } from 'react-icons/fa'

export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const MENU_CATEGORIES = [
  { name: 'Rapide et facile', icon: FaHamburger, count: 24 },
  { name: 'Desserts', icon: FaIceCream, count: 12 },
  { name: 'Déjeuner & Dîner', icon: FaPizzaSlice, count: 32 },
  { name: 'Boissons', icon: FaGlassCheers, count: 8 },
  { name: 'Salades', icon: FaAppleAlt, count: 10 },
]

function MenuList({
  categories = MENU_CATEGORIES,
  activeCategory,
  onCategorySelect,
  center = false,
}) {
  return (
    <div className="w-full mt-2">
      <div className={`flex gap-3 overflow-x-auto py-1 ${center ? 'justify-center' : ''}`}>
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = cat.name === activeCategory
          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => onCategorySelect && onCategorySelect(cat.name)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full border text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-orange-600 text-white border-orange-600 shadow'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-700'
              }`}
            >
              {Icon && <Icon className={isActive ? 'text-white' : 'text-orange-600'} />}
              <span>{cat.name}</span>
              {typeof cat.count === 'number' && (
                <span className={`ml-1 text-xs rounded-full px-2 py-0.5 ${
                  isActive ? 'bg-white/20' : 'bg-orange-50 text-orange-700'
                }`}>
                  {cat.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MenuList
