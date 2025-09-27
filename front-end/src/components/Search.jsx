import React, { useState, useEffect, useMemo } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'

function Search({
  value,
  defaultValue = '',
  onChange,
  onSearch,
  placeholder = 'Rechercher des plats, cuisines ou restaurants...',
  className = '',
  autoFocus = false,
  suggestions = [],
}) {
  const [query, setQuery] = useState(value ?? defaultValue)

  useEffect(() => {
    if (value !== undefined && value !== query) setQuery(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const hasText = (query || '').length > 0

  function handleChange(e) {
    const next = e.target.value
    if (value === undefined) setQuery(next)
    if (typeof onChange === 'function') onChange(next)
  }

  function handleClear() {
    if (value === undefined) setQuery('')
    if (typeof onChange === 'function') onChange('')
    if (typeof onSearch === 'function') onSearch('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (typeof onSearch === 'function') onSearch(query)
  }

  function handlePickSuggestion(text) {
    if (value === undefined) setQuery(text)
    if (typeof onChange === 'function') onChange(text)
    if (typeof onSearch === 'function') onSearch(text)
  }

  const shownSuggestions = useMemo(() => {
    const q = (query || '').trim().toLowerCase()
    if (!q) return []
    return (suggestions || [])
      .filter((s) => (s || '').toLowerCase().includes(q))
      .slice(0, 6)
  }, [query, suggestions])

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full h-12 pl-11 pr-28 rounded-full border border-gray-200 bg-white shadow-sm text-[#1b2629] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
        />

        {hasText && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Effacer la recherche"
            className="absolute right-28 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-medium shadow-sm"
        >
          Rechercher
        </button>
      </form>

      {shownSuggestions.length > 0 && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {shownSuggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[#1b2629]"
                  onClick={() => handlePickSuggestion(s)}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Search