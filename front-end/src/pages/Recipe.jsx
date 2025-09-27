import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { RECIPES } from '../components/menu/recipes'
import { FiClock, FiStar, FiShoppingCart } from 'react-icons/fi'

// naive ingredient generator if dataset does not provide one
function guessIngredients(recipe) {
  const base = ['Salt', 'Pepper']
  if (!recipe) return base
  const fromTags = (recipe.tags || []).map((t) => t.charAt(0).toUpperCase() + t.slice(1))
  const byCategory = {
    'Lunch & Dinner': ['Olive Oil', 'Garlic', 'Onion'],
    'Quick and easy': ['Olive Oil', 'Garlic'],
    'Desserts': ['Sugar', 'Butter', 'Flour'],
    'Patisserie': ['Flour', 'Butter', 'Eggs'],
    'Salads': ['Olive Oil', 'Lemon', 'Lettuce'],
    'Drinks': ['Ice', 'Mint', 'Lemon'],
  }[recipe.category] || []
  const uniq = Array.from(new Set([...fromTags, ...byCategory, ...base]))
  return uniq
}

function Recipe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const editState = (location && location.state) || {}
  const recipe = React.useMemo(() => RECIPES.find(r => r.id === id), [id])
  const [ingredients, setIngredients] = React.useState(() => guessIngredients(recipe).map((name) => ({ name, include: true })))
  const [quantity, setQuantity] = React.useState(() => Math.max(1, editState.quantity || 1))
  const [added, setAdded] = React.useState(false)

  React.useEffect(() => {
    // when recipe changes or edit state provided
    const base = guessIngredients(recipe).map((name) => ({ name, include: true }))
    const removed = (editState.customizations && Array.isArray(editState.customizations.removedIngredients)) ? editState.customizations.removedIngredients : []
    if (removed.length) {
      setIngredients(base.map(it => ({ ...it, include: !removed.includes(it.name) })))
    } else {
      setIngredients(base)
    }
  }, [recipe, editState.customizations])

  if (!recipe) {
    return (
      <section className="pt-16 md:pt-20 pb-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center text-gray-600">Recette non trouvée.</div>
        </div>
      </section>
    )
  }

  function addToCart() {
    try {
      const raw = localStorage.getItem('cart_items')
      const arr = raw ? JSON.parse(raw) : []
      const removed = ingredients.filter(i => !i.include).map(i => i.name)
      const payload = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        price: typeof recipe.price === 'number' ? recipe.price : undefined,
        quantity,
        customizations: { removedIngredients: removed }
      }
      if (editState && editState.edit && typeof editState.index === 'number' && arr[editState.index]) {
        // Preserve existing price if present
        const existing = arr[editState.index]
        const nextItem = { ...existing, ...payload, price: existing.price ?? payload.price }
        arr[editState.index] = nextItem
      } else {
        const idx = arr.findIndex(x => x.id === payload.id && JSON.stringify(x.customizations||{}) === JSON.stringify(payload.customizations))
        if (idx >= 0) {
          arr[idx] = { ...arr[idx], quantity: (arr[idx].quantity || 1) + quantity }
        } else {
          arr.push(payload)
        }
      }
      localStorage.setItem('cart_items', JSON.stringify(arr))
      try { window.dispatchEvent(new Event('cart_items_updated')) } catch {}
      setAdded(true)
      setTimeout(() => setAdded(false), 1000)
      // After edit, navigate back to cart for clarity
      if (editState && editState.edit) {
        navigate('/cart')
      }
    } catch (e) {
      console.error('Failed to add to cart', e)
    }
  }

  const includeCount = ingredients.filter(i => i.include).length

  return (
    <section className="pt-16 md:pt-20 pb-12" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm" data-aos="fade-right">
          <img src={recipe.image} alt={recipe.title} className="w-full h-80 object-cover" onError={(e)=>{e.currentTarget.style.opacity='0.6'}} />
        </div>

        {/* Content */}
        <div className="space-y-4" data-aos="fade-left">
          <h1 className="font-serif font-bold text-3xl md:text-4xl">{recipe.title}</h1>
          <p className="text-gray-600">{recipe.description}</p>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1"><FiClock className="text-orange-600" /> {recipe.time}</span>
            <span className="inline-flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className={(i < Math.round(recipe.rating || 0)) ? 'text-yellow-400' : 'text-gray-300'} />
              ))}
            </span>
          </div>

          {/* Ingredients */}
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Ingrédients</h2>
            <p className="text-sm text-gray-500 mb-3">Décochez les ingrédients que vous souhaitez retirer avant d'ajouter au panier.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ingredients.map((ing, idx) => (
                <label key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!ing.include}
                    onChange={() => setIngredients(prev => prev.map((x,i)=> i===idx ? { ...x, include: !x.include } : x))}
                  />
                  <span className={ing.include ? 'text-gray-800' : 'text-gray-400 line-through'}>{ing.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quantity + Add */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button className="px-3 py-2 hover:bg-gray-50" onClick={()=> setQuantity(q => Math.max(1, q-1))}>-</button>
              <div className="px-4 py-2 min-w-10 text-center">{quantity}</div>
              <button className="px-3 py-2 hover:bg-gray-50" onClick={()=> setQuantity(q => q+1)}>+</button>
            </div>
            <button onClick={addToCart} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition ${added ? 'scale-[1.02]' : ''}`}>
              <FiShoppingCart />
              {added ? (editState && editState.edit ? 'Modifié !' : 'Ajouté !') : (editState && editState.edit ? 'Modifier' : 'Ajouter au Panier')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Recipe
