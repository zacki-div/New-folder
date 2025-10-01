import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CreditCard } from 'lucide-react'

function Payment() {
  const navigate = useNavigate()
  const location = useLocation()
  const order = (location && location.state && location.state.order) || { total: 0, items: [] }

  const [form, setForm] = React.useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
  })
  const [status, setStatus] = React.useState('idle') // idle | processing

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.number || !form.expiry || !form.cvc) return
    setStatus('processing')
    // Simulate card payment
    setTimeout(() => {
      navigate('/thank-you', { state: { order, method: 'card' } })
    }, 900)
  }

  return (
    <section className="pt-16 md:pt-20 pb-12" data-aos="fade-up">
      <div className="max-w-md mx-auto px-6 lg:px-8">
        <h1 className="font-serif font-bold text-3xl mb-6 text-center">Paiement</h1>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="mb-4 text-gray-600 text-sm">Total de la commande: <span className="font-semibold text-[#1b2629]">{Number(order.total || 0).toFixed(2)} DH</span></div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom sur la carte</label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="Jean Dupont" />
            </div>
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">Numéro de carte</label>
              <input id="number" name="number" inputMode="numeric" value={form.number} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="4242 4242 4242 4242" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiration</label>
                <input id="expiry" name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                <input id="cvc" name="cvc" inputMode="numeric" placeholder="123" value={form.cvc} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" />
              </div>
            </div>
            <button type="submit" disabled={status==='processing'} className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition disabled:opacity-60">
              <CreditCard className="w-4 h-4" />
              {status==='processing' ? 'Traitement en cours…' : 'Payer maintenant'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Payment
