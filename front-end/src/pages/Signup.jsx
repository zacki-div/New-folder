import React from 'react'
import { Mail, Lock, UserPlus, Apple } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = React.useState({ name: '', email: '', password: '' })
  const [showPwd, setShowPwd] = React.useState(false)
  const [status, setStatus] = React.useState('idle') // idle | submitting | error

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    // Simulate sign up
    setTimeout(() => {
      setStatus('idle')
      navigate('/')
    }, 900)
  }

  return (
    <section className="pt-16 md:pt-20 pb-12" data-aos="fade-up">
      <div className="max-w-md mx-auto px-6 lg:px-8">
        <h1 className="font-serif font-bold text-3xl mb-6 text-center">Create your account</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-4" data-aos="fade-up" data-aos-delay="100">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <Mail className="w-4 h-4 absolute top-3 left-3 text-gray-400" />
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <Lock className="w-4 h-4 absolute top-3 left-3 text-gray-400" />
              <input id="password" name="password" type={showPwd ? 'text' : 'password'} value={form.password} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 pl-9 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPwd(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded">{showPwd ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-500">Already have an account?
              <Link to="/login" className="text-orange-600 hover:underline ml-1">Sign in</Link>
            </div>
          </div>

          <button type="submit" disabled={status==='submitting'} className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition disabled:opacity-60">
            <UserPlus className="w-4 h-4" />
            {status==='submitting' ? 'Creating…' : 'Create account'}
          </button>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <div className="relative flex justify-center"><span className="bg-white px-2 text-xs text-gray-500">or continue with</span></div>
          </div>

          {/* Social buttons (placeholders) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-aos="fade-up" data-aos-delay="150">
            <button type="button" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              {/* Google G */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="w-4 h-4" aria-hidden>
                <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.2H272v95.0h146.9c-6.3 34.1-25.2 63.0-53.8 82.3v68.3h86.9c50.8-46.8 81.5-115.7 81.5-195.4z"/>
                <path fill="#34A853" d="M272 544.3c72.9 0 134.2-24.1 178.9-65.5l-86.9-68.3c-24.1 16.2-55.0 25.8-92.0 25.8-70.7 0-130.6-47.7-152.0-111.9H30.7v70.1c44.7 88.3 136.6 149.8 241.3 149.8z"/>
                <path fill="#FBBC05" d="M120 324.4c-10.5-31.2-10.5-64.9 0-96.1v-70.1H30.7c-43.7 87.3-43.7 191.2 0 278.5l89.3-70.1z"/>
                <path fill="#EA4335" d="M272 106.1c39.6-.6 77.6 14.4 106.7 42.2l79.5-79.5C402.4 24.6 341.1.5 268.2.5 163.5.5 71.6 62.0 26.9 150.3l93.1 70.1C141.4 156.2 201.3 108.5 272 108.5z"/>
              </svg>
              <span className="text-sm">Google</span>
            </button>
            <button type="button" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <Apple className="w-4 h-4" />
              <span className="text-sm">Apple</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Signup
