import React, { useEffect, useMemo, useState } from 'react'
import Cards from '../components/Cards'
import MenuHero from '../components/menu/MenuHero'
import Search from '../components/Search'

function Favorites() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('fav_items')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    function handleStorage(e) {
      if (e.key === 'fav_items') {
        try {
          setItems(e.newValue ? JSON.parse(e.newValue) : [])
        } catch {}
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const removeById = (id) => {
    setItems(prev => {
      const next = prev.filter(x => x.id !== id)
      try { localStorage.setItem('fav_items', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase()
    if (!q) return items
    return items.filter(r =>
      (r.title || '').toLowerCase().includes(q) ||
      (r.description || '').toLowerCase().includes(q) ||
      (r.tags || []).some(t => (t || '').toLowerCase().includes(q))
    )
  }, [items, searchQuery])

  function getPriceFor(r) {
    if (!r) return 9.99
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

  return (
    <>
      <MenuHero
        title="Your Favorites"
        subtitle="All the dishes you love, collected in one place."
        categories={[]}
        activeCategory=""
      />

      <div className="max-w-3xl mx-auto px-6">
        <Search
          placeholder="Search favorites..."
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={setSearchQuery}
          suggestions={Array.from(new Set([...(items||[]).map(i => i.title), ...((items||[]).flatMap(i => i.tags||[]))])).filter(Boolean)}
        />
      </div>

      {(!items || items.length === 0) ? (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-600">
              No favorites yet.
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r) => (
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
                  onToggleFavorite={(isFav) => {
                    if (!isFav) removeById(r.id)
                  }}
                  favorite
                />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center text-gray-500">No favorites match your search.</div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Favorites
