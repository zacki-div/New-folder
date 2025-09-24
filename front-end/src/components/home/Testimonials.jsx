import React, { useEffect, useRef, useState } from 'react'
import { Quote, Star } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    { id: 1, name: 'Emily Johnson', rating: 5, text: "The flavors at this restaurant are absolutely incredible! Every dish I've tried has been a delightful experience." },
    { id: 2, name: 'Michael Chen', rating: 4, text: 'Great food and excellent service. The staff was very attentive and knowledgeable about the menu.' },
    { id: 3, name: 'Sarah Thompson', rating: 5, text: 'This place is a hidden gem! The attention to detail in both the food presentation and taste is remarkable.' },
    { id: 4, name: 'David Rodriguez', rating: 5, text: "I've been to many restaurants, but this one stands out. The ambiance, the service, and most importantly, the food are all top-notch." },
    { id: 5, name: 'Lisa Patel', rating: 4, text: 'A wonderful dining experience! The fusion of flavors in their signature dishes is truly unique and delightful.' },
  ]

  const [index, setIndex] = useState(0)
  const [perView, setPerView] = useState(3)
  const timeoutRef = useRef(null)

  useEffect(() => {
    function updatePerView() {
      const w = window.innerWidth
      if (w < 768) setPerView(1)
      else if (w < 1024) setPerView(2)
      else setPerView(3)
    }

    updatePerView()
    window.addEventListener('resize', updatePerView)
    return () => window.removeEventListener('resize', updatePerView)
  }, [])

  useEffect(() => {
    const delay = 3500
    timeoutRef.current = setInterval(() => {
      setIndex(i => (i + 1) % testimonials.length)
    }, delay)
    return () => clearInterval(timeoutRef.current)
  }, [testimonials.length])

  const slidePercent = 100 / perView
  const safeIndex = index % testimonials.length

  return (
    <section className="py-10">
      <h3 className="text-center text-3xl lg:text-4xl font-serif font-bold mb-3">What Our Customers Say</h3>
      <div className="max-w-6xl mx-auto py-10 px-3 overflow-hidden">
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${safeIndex * slidePercent}%)` }}>
          {/* Duplicate testimonials to make seamless loop */}
          {[...testimonials, ...testimonials].map((item, idx) => (
            <div key={idx} className="px-3" style={{ flex: `0 0 ${slidePercent}%`, boxSizing: 'border-box' }}>
              <div className="border border-gray-200 rounded-lg flex flex-col p-6 h-full shadow-sm hover:shadow-md transition bg-white">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={i < item.rating ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                </div>

                <p className="py-3 text-gray-700 flex-1">{item.text}</p>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <h3 className="font-semibold text-orange-600 text-lg">{item.name}</h3>
                    <p className="text-sm mt-1 text-gray-500">Customer</p>
                  </div>
                  <Quote className="text-orange-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
