import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import Button from '../Button';
import React from 'react'
import { FiShoppingCart, FiHeart, FiUser, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'

function MobileNav({ navItems = [], logo, hideLeft = "-left-[1000px]", onOpen, onClose, cartCount = 0 }) {
    const { isAuthenticated, user, logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
            onClose() // Fermer le menu après déconnexion
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error)
        }
    }
    const [favCount, setFavCount] = React.useState(() => {
        try {
            const raw = localStorage.getItem('fav_items')
            return raw ? JSON.parse(raw).length : 0
        } catch { return 0 }
    })
    const [cartQty, setCartQty] = React.useState(() => {
        try {
            const raw = localStorage.getItem('cart_items')
            const arr = raw ? JSON.parse(raw) : []
            return Array.isArray(arr) ? arr.reduce((n, it) => n + (it.quantity || 1), 0) : 0
        } catch { return 0 }
    })

    React.useEffect(() => {
        const syncFav = () => {
            try {
                const raw = localStorage.getItem('fav_items')
                setFavCount(raw ? JSON.parse(raw).length : 0)
            } catch { setFavCount(0) }
        }
        const syncCart = () => {
            try {
                const raw = localStorage.getItem('cart_items')
                const arr = raw ? JSON.parse(raw) : []
                setCartQty(Array.isArray(arr) ? arr.reduce((n, it) => n + (it.quantity || 1), 0) : 0)
            } catch { setCartQty(0) }
        }
        const onFavEvt = () => syncFav()
        const onCartEvt = () => syncCart()
        window.addEventListener('storage', syncFav)
        window.addEventListener('storage', syncCart)
        window.addEventListener('fav_items_updated', onFavEvt)
        window.addEventListener('cart_items_updated', onCartEvt)
        return () => {
            window.removeEventListener('storage', syncFav)
            window.removeEventListener('storage', syncCart)
            window.removeEventListener('fav_items_updated', onFavEvt)
            window.removeEventListener('cart_items_updated', onCartEvt)
        }
    }, [])

    return (
        <div className="h-14 flex justify-between items-center px-6 lg:px-8 bg-transparent">
            <Link to="/">
                <img src={logo} alt="logo" className="w-30" />
            </Link>

            <div className="relative flex items-center gap-3">
                {isAuthenticated && (
                    <>
                        <Link to="/favorites" aria-label="Favoris" title="Favoris" className="relative text-gray-700 hover:text-orange-600">
                            <FiHeart className="w-7 h-7" />
                            {favCount > 0 && (
                                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-pink-600 rounded-full">{favCount}</span>
                            )}
                        </Link>
                        <Link to="/cart" aria-label="Panier" title="Panier" className="relative text-gray-700 hover:text-orange-600">
                            <FiShoppingCart className="w-7 h-7" />
                            {(cartQty > 0 || cartCount > 0) && (
                                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-orange-600 rounded-full">{cartQty || cartCount}</span>
                            )}
                        </Link>
                        <Link to="/profile" aria-label="Profil" title="Profil" className="text-gray-700 hover:text-orange-600">
                            <FiUser className="w-7 h-7" />
                        </Link>
                    </>
                )}
                <button
                    onClick={onOpen}
                    aria-label="Ouvrir le menu"
                    className="p-2 rounded-md border border-transparent hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                    <HiMiniBars3BottomRight className="w-7 h-7 text-[#1b2629]" />
                </button>
            </div>

            <div
                className={`transition-all duration-300 ease-in-out fixed top-0 ${hideLeft} z-50 w-full h-full`}
                aria-hidden={hideLeft !== "left-0"}
            >
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={onClose}
                />

                <div className="relative mx-auto my-20 w-11/12 max-w-md bg-white rounded-xl p-6 shadow-2xl">
                    <button
                        onClick={onClose}
                        aria-label="Fermer le menu"
                        className="absolute right-4 top-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                        <X className="w-6 h-6 text-gray-700" />
                    </button>

                    <nav>
                        <ul className="flex flex-col gap-5">
                            {navItems?.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        onClick={onClose}
                                        className="block font-medium capitalize text-[#1b2629] text-2xl hover:text-orange-600"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8">
                            {isAuthenticated ? (
                                <div className="space-y-4">
                                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                                        <p className="text-sm text-gray-600">Connecté en tant que</p>
                                        <p className="font-medium text-orange-600">{user?.firstName} {user?.lastName}</p>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                        <FiLogOut className="w-4 h-4" />
                                        Se déconnecter
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-4 items-center font-medium">
                                    <Link to="/login" onClick={onClose} className="flex-1">
                                        <Button variant="ghost" className="w-full text-[#1b2629] px-4 py-2 border border-gray-200">Se connecter</Button>
                                    </Link>
                                    <Link to="/signup" onClick={onClose} className="flex-1">
                                        <Button variant="solid" className="w-full text-white px-4 py-2 bg-orange-600 hover:bg-orange-700">S'inscrire</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default MobileNav;