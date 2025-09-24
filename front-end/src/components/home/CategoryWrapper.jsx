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
        <h2 className="text-center text-3xl lg:text-4xl font-bold font-serif mb-10" data-aos="fade-up">Discover Our Menu</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categoriesWithCounts.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <Link
                to={`/menu/${slugify(cat.name)}`}
                key={cat.name}
                className="group bg-white rounded-xl p-4 flex flex-col items-center gap-3 text-center shadow-sm hover:shadow-md transition"
                data-aos={index % 3 === 0 ? 'fade-left' : index % 3 === 1 ? 'fade-up' : 'fade-right'}
                data-aos-delay={index * 75}
              >
                <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 text-lg">
                  {Icon ? <Icon /> : <FaPizzaSlice />}
                </div>
                <div className="text-sm font-medium text-[#1b2629] capitalize">{cat.name}</div>
                {typeof cat.count === 'number' && (
                  <div className="mt-2 inline-flex items-center px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full">
                    {cat.count} items
                  </div>
                )}
                <div className="mt-2 opacity-0 group-hover:opacity-100 text-xs text-gray-500">Explore {cat.name.toLowerCase()}</div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/menu" 
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-full transition shadow-sm hover:shadow-md"
          >
            See Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategoryWrapper;