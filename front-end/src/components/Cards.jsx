import React, { useState } from 'react'
import { FiStar, FiClock, FiShoppingCart } from 'react-icons/fi'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import Button from './Button'
import { Link } from 'react-router-dom'

import fallbackImg from '../assets/react.svg'

const DEFAULT_IMG = fallbackImg

function Cards({
  id = undefined,
  image = DEFAULT_IMG,
  title = 'Plat Délicieux',
  description = 'Savoureux et frais, recommandé par le chef.',
  rating = 4.6,
  time = '25 min',
  level = 'Facile',
  onAdd = () => {},
  onToggleFavorite = null,
  favorite = false,
  viewUrl = null,
  onView = null,
  tags = [],
}) {
  function isInLocalFavorites(itemId) {
    if (!itemId) return false
    try {
      const raw = localStorage.getItem('fav_items')
      const arr = raw ? JSON.parse(raw) : []
      return arr.some(x => x.id === itemId)
    } catch { return false }
  }

  const [fav, setFav] = useState(() => !!favorite || isInLocalFavorites(id))
  const [added, setAdded] = useState(false)

  function toggleFav(e) {
    e.preventDefault()
    const next = !fav
    setFav(next)
    // Optional external callback
    if (typeof onToggleFavorite === 'function') onToggleFavorite(next)
    // Persist to localStorage
    if (id) {
      try {
        const raw = localStorage.getItem('fav_items')
        const arr = raw ? JSON.parse(raw) : []
        const idx = arr.findIndex(x => x.id === id)
        if (next) {
          // add if not exists
          if (idx === -1) arr.push({ id, title, description, image, time, rating, tags })
        } else {
          // remove if exists
          if (idx >= 0) arr.splice(idx, 1)
        }
        localStorage.setItem('fav_items', JSON.stringify(arr))
        // notify any listeners (e.g., header) to refresh fav count immediately
        try { window.dispatchEvent(new Event('fav_items_updated')) } catch {}
      } catch {}
    }
  }

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.01] transition-all duration-200 p-4 flex flex-col focus-within:ring-2 focus-within:ring-orange-200">
      <div className="relative rounded-lg overflow-hidden group">
        <img
          src={image || DEFAULT_IMG}
          alt={title}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // fallback to local asset if remote image fails
            const target = e.currentTarget
            if (target.src !== DEFAULT_IMG) target.src = DEFAULT_IMG
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />

        {level && (
          <div className="absolute left-3 bottom-3 bg-white/90 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full border border-orange-100">{level}</div>
        )}

        <button
          onClick={toggleFav}
          aria-pressed={fav}
          aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="absolute right-3 top-3 bg-white p-2 rounded-full shadow-sm hover:scale-105 transition text-red-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
        >
          {fav ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4 text-gray-400" />}
        </button>
      </div>

      <div className="mt-3 flex-1">
        <h4 className="text-lg font-medium text-[#1b2629]">{title}</h4>
        <p className="text-sm text-gray-500 mt-1">{description}</p>

        {tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">{t}</span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1">
            <FiClock className="text-orange-600" /> {time}
          </span>
          <span className="inline-flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.round(rating || 0)
              return (
                <FiStar
                  key={i}
                  className={filled ? 'text-yellow-400' : 'text-gray-300'}
                  aria-hidden
                />
              )
            })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {viewUrl ? (
            <Link to={viewUrl} className="inline-block">
              <Button variant="ghost" className="text-[#1b2629] px-4 py-2 hover:bg-gray-100">Voir</Button>
            </Link>
          ) : (
            <Button variant="ghost" className="text-[#1b2629] px-4 py-2 hover:bg-gray-100" onClick={onView}>Voir</Button>
          )}

          <Button
            variant="solid"
            className={`bg-orange-600 hover:bg-orange-700 px-3 py-2 flex items-center gap-2 transition-transform duration-150 ${added ? 'scale-105' : ''}`}
            onClick={() => {
              try { onAdd() } catch {}
              setAdded(true)
              setTimeout(() => setAdded(false), 900)
            }}
          >
            <FiShoppingCart />
            {added ? 'Ajouté!' : 'Ajouter'}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default Cards