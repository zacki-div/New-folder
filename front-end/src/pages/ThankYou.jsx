import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import orderService from '../services/orderService'
import { useAuth } from '../contexts/AuthContext'

function ThankYou() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const order = (location && location.state && location.state.order) || { total: 0, items: [], payment: 'cod' }
  const method = (location && location.state && location.state.method) || order.payment || 'cod'

  React.useEffect(() => {
    // Clear cart when order is completed
    try {
      localStorage.setItem('cart_items', JSON.stringify([]))
      try { window.dispatchEvent(new Event('cart_items_updated')) } catch {}
    } catch {}

    // Add order to user's profile if authenticated
    if (isAuthenticated && order && order.items && order.items.length > 0) {
      try {
        orderService.addOrder(order);
        console.log('Order added to user profile');
      } catch (error) {
        console.error('Failed to add order to profile:', error);
      }
    }
  }, [isAuthenticated, order])

  return (
    <section className="pt-16 md:pt-20 pb-12" data-aos="fade-up">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="font-serif font-bold text-3xl md:text-4xl">Merci pour votre commande&nbsp;!</h1>
        <p className="text-gray-600 mt-2">
          {method === 'card' 
            ? 'Votre paiement a été reçu et votre commande est en préparation.' 
            : 'Votre commande a été passée. Veuillez préparer le montant en espèces à la livraison.'}
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mt-6 text-left">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">Total</div>
            <div className="text-lg font-semibold">{Number(order.total || 0).toFixed(2)} DH</div>
          </div>
          <div className="mt-3 text-sm text-gray-500">Articles&nbsp;: {(order.items || []).reduce((n, it) => n + (it.quantity || 1), 0)}</div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/menu" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition">Commander encore</Link>
          <button onClick={() => navigate(-1)} className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50 transition">Retour</button>
        </div>
      </div>
    </section>
  )
}

export default ThankYou
