import React from 'react'
import { Clock, Award, Leaf, Truck, Users, ThumbsUp } from 'lucide-react'
import { Link } from 'react-router-dom'

function Stat({ value, label, delay = 0 }) {
  const ref = React.useRef(null)
  const [shown, setShown] = React.useState(false)
  const [display, setDisplay] = React.useState('0')

  // Parse numeric target and suffix e.g. "25k+" -> 25 and "k+"
  const { target, decimals, suffix } = React.useMemo(() => {
    const m = String(value).trim().match(/^([0-9]+(?:\.[0-9]+)?)(.*)$/)
    const num = m ? parseFloat(m[1]) : 0
    const suff = m ? m[2] : ''
    const dec = m && m[1].includes('.') ? (m[1].split('.')[1]?.length || 0) : 0
    return { target: isNaN(num) ? 0 : num, decimals: dec, suffix: suff }
  }, [value])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let io
    const onVisible = () => {
      if (shown) return
      setShown(true)
      const duration = 1200 // ms
      const start = performance.now()
      const from = 0
      const animate = (t) => {
        const p = Math.min(1, (t - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
        const current = from + (target - from) * eased
        setDisplay(current.toFixed(decimals))
        if (p < 1) requestAnimationFrame(animate)
        else setDisplay(target.toFixed(decimals))
      }
      requestAnimationFrame(animate)
    }
    // Start on mount if already visible, else observe
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          onVisible()
          io.disconnect()
        }
      }, { threshold: 0.2 })
      io.observe(el)
    } else {
      onVisible()
    }
    return () => io && io.disconnect()
  }, [shown, target, decimals])

  return (
    <div className="text-center" data-aos="fade-up" data-aos-delay={delay} ref={ref}>
      <div className="text-3xl md:text-4xl font-extrabold text-orange-600">{display}{suffix}</div>
      <div className="text-sm md:text-base text-gray-600 mt-1">{label}</div>
    </div>
  )
}

function About() {
  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-16 bg-transparent" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif font-bold text-3xl md:text-5xl leading-tight mb-4">Notre Histoire, Votre Goût</h1>
            <p className="text-gray-600 text-base md:text-lg">Nous avons pour mission de rendre la bonne nourriture accessible à tous — préparée avec des ingrédients frais, livrée rapidement et servie avec soin. Des favoris locaux aux plats inspirés par les chefs, la qualité et la commodité sont nos valeurs fondamentales.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <Stat value="100+" label="Restaurants Partenaires" />
            <Stat value="25k+" label="Commandes Livrées" delay={100} />
            <Stat value="4.8/5" label="Note Moyenne" delay={200} />
            <Stat value="30 min" label="Temps de Livraison Moyen" delay={300} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-center text-3xl lg:text-4xl font-bold font-serif mb-10">Ce En Quoi Nous Croyons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
              icon: Leaf, title: 'Ingrédients Frais', desc: 'Nous nous approvisionnons en produits de saison et cuisinons avec de vrais ingrédients authentiques.'
            }, {
              icon: Clock, title: 'Rapidité et Fiabilité', desc: 'Un routage intelligent et des cuisines efficaces gardent votre nourriture chaude et fraîche.'
            }, {
              icon: Award, title: 'Qualité d\'Abord', desc: 'Chaque plat passe par une dégustation et un contrôle qualité pour une cohérence en laquelle vous pouvez avoir confiance.'
            }, {
              icon: Truck, title: 'Livraison Durable', desc: 'Nous optimisons les itinéraires et utilisons des emballages écologiques quand c\'est possible.'
            }].map((f, i) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-12" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div data-aos="fade-right">
            <h2 className="font-serif font-bold text-2xl md:text-4xl mb-4">D'une Petite Cuisine à un Favori de Toute la Ville</h2>
            <p className="text-gray-600">Nous avons commencé avec un objectif simple — livrer des repas dont nous sommes fiers de servir à nos amis et familles. Aujourd'hui, nous nous associons avec des chefs talentueux et des endroits locaux bien-aimés pour vous apporter un menu sélectionné qui équilibre confort, créativité et valeur.</p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-center gap-2"><ThumbsUp className="text-orange-600 w-4 h-4" /> Partenariats sélectionnés avec des cuisines de confiance</li>
              <li className="flex items-center gap-2"><Users className="text-orange-600 w-4 h-4" /> Boucles de retour d'information communautaires</li>
              <li className="flex items-center gap-2"><Truck className="text-orange-600 w-4 h-4" /> Améliorations continues de la vitesse de livraison</li>
            </ul>
          </div>
          <div className="relative group">
            <div className="w-72 h-72 md:w-96 md:h-96 bg-orange-50 rounded-[50%] flex items-center justify-center text-orange-600 text-[6rem] md:text-[8rem] shadow-xl group-hover:shadow-2xl transform-gpu transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-[-6deg] animate-float">
              <img src="logo.svg" alt="logo" className="w-[80%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-10" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.126748727925!2d-122.4194151846817!3d37.77492977975974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c2f0f4afd%3A0xbadf1c9c356ef!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1616621234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold">Prêt à goûter la différence ?</h3>
              <p className="text-gray-600 mt-1">Parcourez notre menu complet ou contactez-nous — nous aimerions avoir de vos nouvelles.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/menu" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition">Voir le Menu</Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50 transition">Nous Contacter</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About