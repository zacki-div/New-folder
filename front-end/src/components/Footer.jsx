import React from 'react'
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react'
import logo from '/logo.svg'
import { Link } from 'react-router-dom'
function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="Logo" className="w-12 h-12 brightness-0 invert" />
            <p className="mt-4 text-slate-400 max-w-sm">
              Delicious meals delivered fast and fresh. Seamless ordering with flavors you’ll love.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <a aria-label="Facebook" href="#" className="p-2 rounded-full border border-slate-700 text-white/80 hover:bg-white/10 transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a aria-label="Instagram" href="#" className="p-2 rounded-full border border-slate-700 text-white/80 hover:bg-white/10 transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a aria-label="Twitter" href="#" className="p-2 rounded-full border border-slate-700 text-white/80 hover:bg-white/10 transition">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3 text-slate-400">
              <li><Link className="hover:text-white transition" to="/menu">Menu</Link></li>
              <li><Link className="hover:text-white transition" to="/about">About</Link></li>
              <li><Link className="hover:text-white transition" to="/contact">Contact</Link></li>
              <li><Link className="hover:text-white transition" to="/favorites">Favorites</Link></li>
              <li><Link className="hover:text-white transition" to="/cart">Cart</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-4 text-white">Support</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a className="hover:text-white transition" href="#">Help Center</a></li>
              <li><a className="hover:text-white transition" href="#">Delivery Info</a></li>
              <li><a className="hover:text-white transition" href="#">Payments</a></li>
              <li><a className="hover:text-white transition" href="#">Terms & Privacy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-3"><Phone className="text-orange-400 w-4 h-4" /><span>+1 (555) 987-6543</span></li>
              <li className="flex items-center gap-3"><Mail className="text-orange-400 w-4 h-4" /><span>support@spicybites.com</span></li>
              <li className="flex items-center gap-3"><MapPin className="text-orange-400 w-4 h-4" /><span>123 Flavor St, Food City</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400"> © {year} SpicyBites. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="text-slate-400 hover:text-white transition">Privacy Policy</a>
            <span className="text-slate-600">|</span>
            <a href="#" className="text-slate-400 hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer