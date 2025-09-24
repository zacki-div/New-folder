import React from 'react'
import { useParams } from 'react-router-dom'
import Cards from '../Cards'
import { MENU_CATEGORIES, slugify } from './MenuList'
import { RECIPES } from './recipes'

// Uses shared RECIPES from ./recipes

function MenuCards({ query = '' }) {
  const { category: slug } = useParams()

  const categoryName = React.useMemo(() => {
    if (!slug) return 'All'
    const match = MENU_CATEGORIES.find((c) => slugify(c.name) === slug)
    return match ? match.name : 'All'
  }, [slug])

  function getPriceFor(r) {
    if (typeof r.price === 'number') return r.price
    switch (r.category) {
      case 'Desserts': return 6.5
      case 'Drinks': return 3.0
      case 'Patisserie': return 3.0
      case 'Salads': return 8.0
      case 'Lunch & Dinner': return 12.0
      case 'Quick and easy': return 9.0
      default: return 9.99
    }
  }

  function addToCart(item) {
    try {
      const raw = localStorage.getItem('cart_items')
      const arr = raw ? JSON.parse(raw) : []
      const idx = arr.findIndex(x => x.id === item.id)
      if (idx >= 0) {
        arr[idx] = { ...arr[idx], quantity: (arr[idx].quantity || 1) + (item.quantity || 1) }
      } else {
        arr.push({ ...item, quantity: item.quantity || 1 })
      }
      localStorage.setItem('cart_items', JSON.stringify(arr))
      try { window.dispatchEvent(new Event('cart_items_updated')) } catch {}
    } catch (e) {
      console.error('Failed to add to cart', e)
    }
  }

  const items = React.useMemo(() => {
    // First filter by category
    const base = categoryName === 'All' ? RECIPES : RECIPES.filter((r) => r.category === categoryName)
    // Then filter by query (title, description, tags)
    const q = (query || '').trim().toLowerCase()
    if (!q) return base
    return base.filter((r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.tags || []).some((t) => (t || '').toLowerCase().includes(q))
    )
  }, [categoryName, query])

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((r) => (
            <Cards
              key={r.id}
              id={r.id}
              image={r.image}
              title={r.title}
              description={r.description}
              rating={r.rating}
              time={r.time}
              tags={r.tags}
              viewUrl={`/recipe/${r.id}`}
              onAdd={() => addToCart({ id: r.id, title: r.title, image: r.image, price: getPriceFor(r), quantity: 1 })}
            />
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No recipes found for this category.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default MenuCards