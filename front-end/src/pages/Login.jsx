import React from 'react'
import { Mail, Lock, LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = React.useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = React.useState(false)
  const [status, setStatus] = React.useState('idle') // idle | submitting | error

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email.trim() || !form.password.trim()) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    // Simulate auth
    setTimeout(() => {
      setStatus('idle')
      navigate('/')
    }, 800)
  }

  return (
    <section className="pt-16 md:pt-20 pb-12" data-aos="fade-up">
      <div className="max-w-md mx-auto px-6 lg:px-8">
        <h1 className="font-serif font-bold text-3xl mb-6 text-center">Bon retour</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-4" data-aos="fade-up" data-aos-delay="100">
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

          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-500">Pas de compte ?
              <Link to="/signup" className="text-orange-600 hover:underline ml-1">En créer un</Link>
            </div>
            <Link to="#" className="text-gray-500 hover:underline">Mot de passe oublié ?</Link>
          </div>

          <button type="submit" disabled={status==='submitting'} className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition disabled:opacity-60">
            <LogIn className="w-4 h-4" />
            {status==='submitting' ? 'Connexion en cours…' : 'Se connecter'}
          </button>

        </form>
      </div>
    </section>
  )
}

export default Login
