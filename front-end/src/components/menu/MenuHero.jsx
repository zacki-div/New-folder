import React from 'react'
import MenuList from './MenuList'
import { MENU_CATEGORIES } from './MenuList'

function MenuHero({
  title = 'Our Menu',
  subtitle = 'Explore a variety of delicious dishes crafted with fresh ingredients and delivered fast.',
  categories = MENU_CATEGORIES,
  activeCategory = MENU_CATEGORIES[0]?.name,
  onCategorySelect,
}) {
  return (
    <section className="pt-16 md:pt-20 pb-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4">
          <h3 className="font-serif font-bold text-3xl md:text-4xl">
            <span className="text-orange-600">{title.split(' ')[0]}</span>{' '}
            {title.split(' ').slice(1).join(' ')}
          </h3>
          <p className="text-gray-600 max-w-2xl">
            {subtitle}
          </p>

          {categories && categories.length > 0 && (
            <MenuList
              categories={categories}
              activeCategory={activeCategory}
              onCategorySelect={onCategorySelect}
              center
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default MenuHero