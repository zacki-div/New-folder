import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiMinus, FiTrash2, FiClock, FiStar } from 'react-icons/fi'
import Button from '../Button'
import fallbackImg from '../../assets/react.svg'

function CartItem({
  image = fallbackImg,
  title = 'Plat Délicieux',
  description = 'Savoureux et frais, recommandé par le chef.',
  time = '25 min',
  rating = 4.6,
  price = 9.99,
  quantity = 1,
  customizations = {},
  onIncrease = () => {},
  onDecrease = () => {},
  onRemove = () => {},
  onEdit = () => {},
}) {
  const total = Math.max(1, quantity) * price
  const removed = (customizations && Array.isArray(customizations.removedIngredients)) ? customizations.removedIngredients : []
  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex gap-4 items-center cursor-pointer" onClick={onEdit}>
      <img
        src={image}
        alt={title}
        className="w-20 h-20 rounded-lg object-cover"
        onError={(e) => {
          const t = e.currentTarget
          if (t.src !== fallbackImg) t.src = fallbackImg
        }}
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-medium text-[#1b2629] truncate">{title}</h4>
        <p className="text-sm text-gray-500 truncate">{description}</p>
        {removed.length > 0 && (
          <p className="text-xs text-gray-500 mt-1 truncate">Retiré: {removed.join(', ')}</p>
        )}
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1"><FiClock className="text-orange-600" /> {time}</span>
          <span className="inline-flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.round(rating || 0)
              return <FiStar key={i} className={filled ? 'text-yellow-400' : 'text-gray-300'} aria-hidden />
            })}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="text-[#1b2629] font-semibold">${total.toFixed(2)}</div>
        <div className="inline-flex items-center gap-2 border rounded-full px-2 py-1" onClick={(e)=> e.stopPropagation()}>
          <button
            type="button"
            onClick={onDecrease}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Diminuer la quantité"
          >
            <FiMinus />
          </button>
          <span className="min-w-6 text-center text-sm">{Math.max(1, quantity)}</span>
          <button
            type="button"
            onClick={onIncrease}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Augmenter la quantité"
          >
            <FiPlus />
          </button>
        </div>
        <button
          type="button"
          onClick={(e)=> { e.stopPropagation(); onRemove(); }}
          className="text-red-500 text-sm inline-flex items-center gap-1 hover:text-red-600"
        >
          <FiTrash2 /> Retirer
        </button>
      </div>
    </article>
  )
}

function CartCards({
  items = [
    { id: 'c1', title: 'Classic Cheeseburger', description: 'Juicy beef patty with cheddar.', time: '20 min', rating: 4.7, price: 9.99, quantity: 1, image: '/images/recipes/cheeseburger.jpg' },
    { id: 'c2', title: 'Margherita Pizza', description: 'Fresh mozzarella & basil.', time: '30 min', rating: 4.8, price: 12.5, quantity: 2, image: '/images/recipes/margherita.jpg' },
  ],
  onIncrease = () => {},
  onDecrease = () => {},
  onRemove = () => {},
  onClearCart = () => {},
}) {
  const navigate = useNavigate()
  if (!items || items.length === 0) {
    return (
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-600">
            Votre panier est vide.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex flex-col gap-4">
          {items.map((it, index) => (
            <CartItem
              key={it.id}
              image={it.image}
              title={it.title}
              description={it.description}
              time={it.time}
              rating={it.rating}
              price={it.price}
              quantity={it.quantity}
              customizations={it.customizations}
              onIncrease={() => onIncrease(it)}
              onDecrease={() => onDecrease(it)}
              onRemove={() => onRemove(it)}
              onEdit={() => navigate(`/recipe/${it.id}`, { state: { edit: true, fromCart: true, index, quantity: it.quantity, customizations: it.customizations || {} } })}
            />
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClearCart}
            disabled={!items || items.length === 0}
            className={`h-10 px-4 rounded-full border border-red-200 text-red-600 transition ${(!items || items.length === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50'}`}
          >
            Vider le Panier
          </button>
        </div>
      </div>
    </section>
  )
}

export default CartCards