import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MenuHero from '../components/menu/MenuHero'
import { MENU_CATEGORIES as CATEGORY_LIST, slugify } from '../components/menu/MenuList'
import { DEFAULT_CATEGORY_NAME, getCategoryCopy } from '../components/menu/constants'
import Search from '../components/Search'
import MenuCards from '../components/menu/MenuCards'
import { RECIPES } from '../components/menu/recipes'

 

function Menu() {
  const navigate = useNavigate()
  const { category } = useParams()
  const [searchQuery, setSearchQuery] = useState('')

  // Suggestions include categories + common recipe titles
  const RECIPE_TITLE_SUGGESTIONS = [
    'Classic Cheeseburger',
    'Margherita Pizza',
    'Chicken Caesar Salad',
    'Strawberry Cheesecake',
    'Grilled Chicken Bowl',
    'Fresh Lemonade',
    'Chocolate Croissant',
    'Veggie Pasta',
  ]

  // Derive a categories list for the menu page that includes a first "All" option
  const MENU_CATEGORIES_WITH_ALL = useMemo(() => {
    const countsByCat = CATEGORY_LIST.reduce((acc, c) => {
      acc[c.name] = RECIPES.filter(r => r.category === c.name).length
      return acc
    }, {})
    const withCounts = CATEGORY_LIST.map(c => ({ ...c, count: countsByCat[c.name] || 0 }))
    const total = RECIPES.length
    return [{ name: 'All', count: total }, ...withCounts]
  }, [CATEGORY_LIST])

  const activeCategory = useMemo(() => {
    // For the menu page without a category slug, use 'All' as the active category
    if (!category) return 'All'
    const found = CATEGORY_LIST.find(c => slugify(c.name) === category)
    return found ? found.name : 'All'
  }, [category])

  const handleCategorySelect = (name) => {
    if (name === 'All') navigate('/menu')
    else navigate(`/menu/${slugify(name)}`)
  }

  return (
    <>
      <MenuHero
        title={getCategoryCopy(activeCategory).title}
        subtitle={getCategoryCopy(activeCategory).subtitle}
        categories={MENU_CATEGORIES_WITH_ALL}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />
      <div className="max-w-3xl mx-auto px-6">
        <Search
          placeholder="Search dishes or categories..."
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={setSearchQuery}
          suggestions={[...CATEGORY_LIST.map(c => c.name), ...RECIPE_TITLE_SUGGESTIONS]}
        />
      </div>
      <MenuCards query={searchQuery} />
    </>
  )
}

export default Menu