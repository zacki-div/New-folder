import React from 'react'
import Cards from '../Cards'
import { Link } from 'react-router-dom'
import sampleImg from '../../assets/react.svg'
import { RECIPES } from '../menu/recipes'

const sample = [
  { id: 'r2', title: 'Margherita Pizza', description: 'Fresh mozzarella, tomato, and basil.', rating: 4.8, time: '30 min', image: sampleImg },
  { id: 'r4', title: 'Strawberry Cheesecake', description: 'Creamy cheesecake with strawberry coulis.', rating: 4.9, time: '1 h', image: sampleImg },
  { id: 'r3', title: 'Chicken Caesar Salad', description: 'Grilled chicken with romaine and parmesan.', rating: 4.5, time: '15 min', image: sampleImg },
]
function FeaturedRecipes() {
  return (
    <section className="py-16" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-center text-3xl lg:text-4xl font-bold font-serif mb-10" data-aos="fade-up">
          Recettes Vedettes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {(RECIPES.slice(0, 3).length ? RECIPES.slice(0, 3) : sample).map((s, idx) => (
            <div
              key={s.id || s.title}
              data-aos={idx % 3 === 0 ? 'fade-left' : idx % 3 === 1 ? 'fade-up' : 'fade-right'}
              data-aos-delay={idx * 100}
            >
              <Cards id={s.id} image={s.image} title={s.title} description={s.description} rating={s.rating} time={s.time} price={s.price || 50} viewUrl={`/recipe/${s.id}`} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/menu" 
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-full transition shadow-sm hover:shadow-md"
          >
            Voir Toutes les Recettes
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedRecipes