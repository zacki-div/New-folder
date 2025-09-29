import React from 'react'
import { Mail, Lock, UserPlus, AlertCircle, User, Phone } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Signup() {
  const navigate = useNavigate()
  const { register, isLoading, error, clearError, isAuthenticated } = useAuth()
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  })
  const [showPwd, setShowPwd] = React.useState(false)

  // Scroll vers le haut au montage du composant
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [])

  // Rediriger si déjà connecté
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    // Effacer les erreurs lors de la saisie
    if (error) {
      clearError()
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.password.trim()) {
      return
    }

    try {
      await register(form)
      navigate('/')
    } catch (err) {
      // L'erreur est gérée par le contexte
      console.error('Erreur d\'inscription:', err)
    }
  }

  return (
    <section className="pt-16 md:pt-20 pb-12" data-aos="fade-up">
      <div className="max-w-md mx-auto px-6 lg:px-8">
        <h1 className="font-serif font-bold text-3xl mb-6 text-center">Créer votre compte</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-4" data-aos="fade-up" data-aos-delay="100">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
              <div className="mt-1 relative">
                <User className="w-4 h-4 absolute top-3 left-3 text-gray-400" />
                <input id="firstName" name="firstName" type="text" value={form.firstName} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="Jean" />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
              <div className="mt-1 relative">
                <User className="w-4 h-4 absolute top-3 left-3 text-gray-400" />
                <input id="lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="Dupont" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <Mail className="w-4 h-4 absolute top-3 left-3 text-gray-400" />
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <div className="mt-1 relative">
              <Lock className="w-4 h-4 absolute top-3 left-3 text-gray-400" />
              <input id="password" name="password" type={showPwd ? 'text' : 'password'} value={form.password} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 pl-9 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPwd(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded">{showPwd ? 'Masquer' : 'Afficher'}</button>
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone (optionnel)</label>
            <div className="mt-1 relative">
              <Phone className="w-4 h-4 absolute top-3 left-3 text-gray-400" />
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="06 12 34 56 78" />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-500">Vous avez déjà un compte ?
              <Link to="/login" className="text-orange-600 hover:underline ml-1">Se connecter</Link>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition disabled:opacity-60">
            <UserPlus className="w-4 h-4" />
            {isLoading ? 'Création en cours…' : 'Créer le compte'}
          </button>

        </form>
      </div>
    </section>
  )
}

export default Signup
