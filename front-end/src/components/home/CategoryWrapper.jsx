import { FaPizzaSlice } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MENU_CATEGORIES, slugify } from '../menu/MenuList'
import { RECIPES } from '../menu/recipes'

function CategoryWrapper() {
  // Build categories with real counts from recipes
  const countsByCat = MENU_CATEGORIES.reduce((acc, c) => {
    acc[c.name] = RECIPES.filter(r => r.category === c.name).length
    return acc
  }, {})
  const categoriesWithCounts = MENU_CATEGORIES.map(c => ({ ...c, count: countsByCat[c.name] || 0 }))
  return (
    <section className="py-16 bg-white" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-center text-3xl lg:text-4xl font-bold font-serif mb-10" data-aos="fade-up">Découvrez Notre Menu</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-8 mx-auto max-w-5xl">
          {categoriesWithCounts.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <Link
                to={`/menu/${slugify(cat.name)}`}
                key={cat.name}
                className="group bg-white rounded-2xl p-6 flex flex-col items-center gap-4 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-orange-200"
                data-aos={index % 3 === 0 ? 'fade-left' : index % 3 === 1 ? 'fade-up' : 'fade-right'}
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-orange-600 text-xl group-hover:scale-110 transition-transform duration-300">
                  {Icon ? <Icon /> : <FaPizzaSlice />}
                </div>
                <div className="text-base font-semibold text-[#1b2629] capitalize group-hover:text-orange-600 transition-colors duration-300">{cat.name}</div>
                {typeof cat.count === 'number' && (
                  <div className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 rounded-full border border-orange-200">
                    {cat.count} plats
                  </div>
                )}
                <div className="opacity-0 group-hover:opacity-100 text-xs text-gray-500 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Explorer {cat.name.toLowerCase()}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/menu" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
          >
            Voir le Menu Complet
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategoryWrapper;