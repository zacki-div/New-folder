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
            <h1 className="font-serif font-bold text-3xl md:text-5xl leading-tight mb-4">Our Story, Your Taste</h1>
            <p className="text-gray-600 text-base md:text-lg">We’re on a mission to make great food accessible to everyone — crafted with fresh ingredients, delivered fast, and served with care. From local favorites to chef-inspired dishes, quality and convenience are our core values.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <Stat value="100+" label="Partner Restaurants" />
            <Stat value="25k+" label="Orders Delivered" delay={100} />
            <Stat value="4.8/5" label="Average Rating" delay={200} />
            <Stat value="30 min" label="Avg. Delivery Time" delay={300} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-center text-3xl lg:text-4xl font-bold font-serif mb-10">What We Believe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
              icon: Leaf, title: 'Fresh Ingredients', desc: 'We source seasonal produce and cook with real, honest ingredients.'
            }, {
              icon: Clock, title: 'Speed & Reliability', desc: 'Smart routing and efficient kitchens keep your food hot and fresh.'
            }, {
              icon: Award, title: 'Quality First', desc: 'Every dish goes through tasting and QA for consistency you can trust.'
            }, {
              icon: Truck, title: 'Sustainable Delivery', desc: 'We optimize routes and use eco‑friendly packaging where possible.'
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
            <h2 className="font-serif font-bold text-2xl md:text-4xl mb-4">From a Small Kitchen to a City‑Wide Favorite</h2>
            <p className="text-gray-600">We started with a simple goal — to deliver meals we’re proud to serve our friends and families. Today, we partner with talented chefs and beloved local spots to bring you a curated menu that balances comfort, creativity, and value.</p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-center gap-2"><ThumbsUp className="text-orange-600 w-4 h-4" /> Curated partnerships with trusted kitchens</li>
              <li className="flex items-center gap-2"><Users className="text-orange-600 w-4 h-4" /> Community‑driven feedback loops</li>
              <li className="flex items-center gap-2"><Truck className="text-orange-600 w-4 h-4" /> Continuous improvements to delivery speed</li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-2xl h-64 md:h-80 flex items-center justify-center" data-aos="fade-left">
            <div className="text-orange-600 font-serif text-5xl">🍽️</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold">Ready to taste the difference?</h3>
              <p className="text-gray-600 mt-1">Browse our full menu or reach out — we’d love to hear from you.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/menu" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition">View Menu</Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50 transition">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About