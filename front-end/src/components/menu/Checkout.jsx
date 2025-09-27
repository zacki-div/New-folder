import React, { useState } from 'react'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

function Checkout({
  items = [],
  total = 0,
  onPlaceOrder = () => {},
}) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    payment: 'card',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const order = { ...form, items, total }
    // Navigate based on selection; also call parent callback for any side effects
    try { onPlaceOrder(order) } catch {}
    if (form.payment === 'card') navigate('/payment', { state: { order } })
    else navigate('/thank-you', { state: { order, method: 'cod' } })
  }

  const lineCount = items.reduce((sum, it) => sum + (it.quantity || 1), 0)
  const isEmpty = (items?.length || 0) === 0

  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-lg font-semibold mb-4">Commande</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nom complet" className="h-11 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-200 outline-none" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Téléphone" className="h-11 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-200 outline-none" />
        </div>

        <textarea name="address" value={form.address} onChange={handleChange} placeholder="Adresse de livraison" className="w-full min-h-20 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-200 outline-none" required />
        <select name="city" value={form.city} onChange={handleChange} className="h-11 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-200 outline-none w-full" required>
          <option value="">Sélectionner une ville</option>
          <option value="Casablanca">Casablanca</option>
          <option value="Rabat">Rabat</option>
          <option value="Marrakech">Marrakech</option>
          <option value="Fes">Fes</option>
          <option value="Tangier">Tangier</option>
          <option value="Agadir">Agadir</option>
          <option value="Meknes">Meknes</option>
          <option value="Oujda">Oujda</option>
          <option value="Kenitra">Kenitra</option>
          <option value="Tetouan">Tetouan</option>
          <option value="Safi">Safi</option>
          <option value="El Jadida">El Jadida</option>
          <option value="Nador">Nador</option>
          <option value="Beni Mellal">Beni Mellal</option>
          <option value="Ouarzazate">Ouarzazate</option>
        </select>

        <div className="space-y-2">
          <div className="font-medium">Paiement</div>
          <div className="flex gap-3">
            <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${form.payment === 'card' ? 'border-orange-400 bg-orange-50' : 'border-gray-200'}`}>
              <input type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={handleChange} />
              Carte
            </label>
            <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${form.payment === 'cod' ? 'border-orange-400 bg-orange-50' : 'border-gray-200'}`}>
              <input type="radio" name="payment" value="cod" checked={form.payment === 'cod'} onChange={handleChange} />
              Paiement à la livraison
            </label>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Articles</span>
            <span>{lineCount}</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold mt-2">
            <span>Total</span>
            <span>${Number(total).toFixed(2)}</span>
          </div>
        </div>

        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white h-11 rounded-full">
          Acheter Maintenant
        </Button>
      </form>
    </aside>
  )
}

export default Checkout