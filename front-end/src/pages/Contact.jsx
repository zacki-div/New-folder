import React from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

function InfoItem({ icon: Icon, title, text, delay = 0 }) {
  return (
    <div className="flex items-start gap-3" data-aos="fade-up" data-aos-delay={delay}>
      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-orange-600" />
      </div>
      <div>
        <div className="font-semibold text-gray-900">{title}</div>
        <div className="text-gray-600 text-sm">{text}</div>
      </div>
    </div>
  )
}

function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' })
  const [status, setStatus] = React.useState('idle') // idle | sending | sent | error

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      return
    }
    setStatus('sending')
    // Simulate async send
    setTimeout(() => {
      setStatus('sent')
    }, 900)
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-16 md:pt-20 pb-8 bg-transparent" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif font-bold text-3xl md:text-5xl leading-tight mb-4">Entrer en Contact</h1>
            <p className="text-gray-600 text-base md:text-lg">Questions, commentaires ou idées de partenariat ? Nous aimerions avoir de vos nouvelles. Notre équipe répond généralement dans un délai d'un jour ouvrable.</p>
          </div>
        </div>
      </section>

      {/* Content grid */}
      <section className="py-8" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold mb-2">Informations de Contact</h2>
            <InfoItem icon={Mail} title="Email" text="support@foodieapp.com" />
            <InfoItem icon={Phone} title="Téléphone" text="(+1) 555-0199" delay={100} />
            <InfoItem icon={MapPin} title="Adresse" text="123 Market Street, San Francisco, CA" delay={200} />
            <InfoItem icon={Clock} title="Heures" text="Lun–Sam: 9:00–20:00, Dim: 10:00–18:00" delay={300} />
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-4" data-aos="fade-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                  <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="Votre nom" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="vous@exemple.com" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows="6" value={form.message} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="Comment pouvons-nous vous aider ?" />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition disabled:opacity-60"
                  disabled={status === 'sending' || status === 'sent'}
                >
                  <Send className="w-4 h-4" />
                  {status === 'sending' ? 'Envoi en cours…' : status === 'sent' ? 'Envoyé !' : 'Envoyer le Message'}
                </button>
                {status === 'error' && (
                  <span className="text-sm text-red-600">Veuillez remplir tous les champs.</span>
                )}
                {status === 'sent' && (
                  <span className="text-sm text-green-600">Merci ! Nous vous répondrons bientôt.</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map moved to About page */}

    </>
  )
}

export default Contact