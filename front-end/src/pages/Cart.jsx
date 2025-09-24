import React, { useEffect, useState } from 'react'
import CartCards from '../components/cart/CartCards'
import Checkout from '../components/menu/Checkout'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const navigate = useNavigate()
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart_items')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cart_items', JSON.stringify(items))
      try { window.dispatchEvent(new Event('cart_items_updated')) } catch {}
    } catch {}
  }, [items])

  const handleIncrease = (it) => {
    setItems(prev => prev.map(x => x.id === it.id ? { ...x, quantity: (x.quantity || 1) + 1 } : x))
  }
  const handleDecrease = (it) => {
    setItems(prev => prev.map(x => x.id === it.id ? { ...x, quantity: Math.max(1, (x.quantity || 1) - 1) } : x))
  }
  const handleRemove = (it) => {
    setItems(prev => prev.filter(x => x.id !== it.id))
  }
  const handleCheckout = (order) => {
    if (!order) return
    if (order.payment === 'card') {
      navigate('/payment', { state: { order } })
    } else {
      navigate('/thank-you', { state: { order, method: 'cod' } })
    }
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <CartCards
              items={items}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
              onClearCart={() => setItems([])}
            />
          </div>
          <Checkout
            items={items}
            total={items.reduce((sum, it) => sum + Math.max(1, it.quantity || 1) * (it.price || 0), 0)}
            onPlaceOrder={handleCheckout}
            onClearCart={() => setItems([])}
          />
        </div>
      </div>
    </section>
  )
}

export default Cart