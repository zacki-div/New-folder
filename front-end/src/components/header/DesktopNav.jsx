import { NavLink, Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import Button from '../Button';
import React from 'react'

function DesktopNav({ navItems = [], logo, cartCount: _unusedCartCountProp = 0 }) {
    const linkClass = ({ isActive }) =>
        `font-medium capitalize ${isActive ? 'text-orange-600' : 'text-[#1b2629]'} hover:text-orange-600`;

    const [favCount, setFavCount] = React.useState(() => {
        try {
            const raw = localStorage.getItem('fav_items')
            return raw ? JSON.parse(raw).length : 0
        } catch { return 0 }
    })

    const [cartCount, setCartCount] = React.useState(() => {
        try {
            const raw = localStorage.getItem('cart_items')
            const arr = raw ? JSON.parse(raw) : []
            return Array.isArray(arr) ? arr.reduce((n, it) => n + (it.quantity || 1), 0) : 0
        } catch { return 0 }
    })

    React.useEffect(() => {
        const sync = () => {
            try {
                const raw = localStorage.getItem('fav_items')
                setFavCount(raw ? JSON.parse(raw).length : 0)
            } catch { setFavCount(0) }
        }
        const syncCart = () => {
            try {
                const raw = localStorage.getItem('cart_items')
                const arr = raw ? JSON.parse(raw) : []
                setCartCount(Array.isArray(arr) ? arr.reduce((n, it) => n + (it.quantity || 1), 0) : 0)
            } catch { setCartCount(0) }
        }
        const onCustom = () => sync()
        const onCustomCart = () => syncCart()
        window.addEventListener('storage', sync)
        window.addEventListener('storage', syncCart)
        window.addEventListener('fav_items_updated', onCustom)
        window.addEventListener('cart_items_updated', onCustomCart)
        return () => {
            window.removeEventListener('storage', sync)
            window.removeEventListener('storage', syncCart)
            window.removeEventListener('fav_items_updated', onCustom)
            window.removeEventListener('cart_items_updated', onCustomCart)
        }
    }, [])

    return (
        <div className="flex justify-between items-center px-6 lg:px-8 py-3">
            <Link to="/" data-aos="fade-down" data-aos-delay="0">
                <img src={logo} alt="logo" className="w-30" />
            </Link>

            <ul className="flex gap-8">
                {navItems?.map((item, index) => (
                    <li key={index} data-aos="fade-down" data-aos-delay={100 * (index + 1)}>
                        <NavLink to={item.path} className={linkClass}>
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="flex gap-4 items-center font-medium">
                <Link to="/favorites" className="relative flex items-center text-gray-700 hover:text-orange-600" aria-label="Favoris" title="Favoris" data-aos="fade-left" data-aos-delay={100 * (navItems.length + 1)}>
                    <FiHeart className="w-7 h-7" />
                    {favCount > 0 && (
                        <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-pink-600 rounded-full">{favCount}</span>
                    )}
                </Link>
                <Link to="/cart" className="relative flex items-center text-gray-700 hover:text-orange-600" aria-label="Panier" title="Panier" data-aos="fade-left" data-aos-delay={100 * (navItems.length + 2)}>
                    <FiShoppingCart className="w-7 h-7" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-orange-600 rounded-full">{cartCount}</span>
                    )}
                </Link>
                <Link to="/login" data-aos="fade-left" data-aos-delay={100 * (navItems.length + 3)}>
                    <Button variant="ghost" className="text-[#1b2629] px-4 py-2 hover:bg-gray-100">Se connecter</Button>
                </Link>
                <Link to="/signup" data-aos="fade-left" data-aos-delay={100 * (navItems.length + 4)}>
                    <Button variant="solid" className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700">S'inscrire</Button>
                </Link>
            </div>
        </div>
    );
}

export default DesktopNav;