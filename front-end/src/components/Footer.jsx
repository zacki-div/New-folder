import React from 'react'
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react'
import logo from '/logo.svg'
import { Link } from 'react-router-dom'
function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Logo" className="w-16 h-12 brightness-0 invert drop-shadow-lg" />
              <span className="text-2xl font-bold text-white font-serif">Food Maroc</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-6">
              Plats délicieux livrés rapidement et frais. Commande fluide avec des saveurs que vous adorerez.
            </p>

            <div className="flex items-center gap-4">
              <a aria-label="Facebook" href="#" className="group p-3 rounded-full bg-slate-800/50 border border-slate-700 text-white/80 hover:bg-orange-600 hover:border-orange-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Facebook className="w-5 h-5" />
              </a>
              <a aria-label="Instagram" href="#" className="group p-3 rounded-full bg-slate-800/50 border border-slate-700 text-white/80 hover:bg-orange-600 hover:border-orange-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Instagram className="w-5 h-5" />
              </a>
              <a aria-label="Twitter" href="#" className="group p-3 rounded-full bg-slate-800/50 border border-slate-700 text-white/80 hover:bg-orange-600 hover:border-orange-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-white relative">
              Liens Rapides
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link className="group flex items-center hover:text-orange-400 transition-all duration-300 hover:translate-x-1" to="/menu">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                Menu
              </Link></li>
              <li><Link className="group flex items-center hover:text-orange-400 transition-all duration-300 hover:translate-x-1" to="/about">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                À Propos
              </Link></li>
              <li><Link className="group flex items-center hover:text-orange-400 transition-all duration-300 hover:translate-x-1" to="/contact">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                Contact
              </Link></li>
              <li><Link className="group flex items-center hover:text-orange-400 transition-all duration-300 hover:translate-x-1" to="/favorites">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                Favoris
              </Link></li>
              <li><Link className="group flex items-center hover:text-orange-400 transition-all duration-300 hover:translate-x-1" to="/cart">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                Panier
              </Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-white relative">
              Support
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </h4>
            <ul className="space-y-4 text-slate-400">
              <li><a className="group flex items-center hover:text-orange-400 transition-all duration-300 hover:translate-x-1" href="#">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                Centre d'Aide
              </a></li>
              <li><a className="group flex items-center hover:text-orange-400 transition-all duration-300 hover:translate-x-1" href="#">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                Info Livraison
              </a></li>
              <li><a className="group flex items-center hover:text-orange-400 transition-all duration-300 hover:translate-x-1" href="#">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                Paiements
              </a></li>
              <li><a className="group flex items-center hover:text-orange-400 transition-all duration-300 hover:translate-x-1" href="#">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                Conditions & Confidentialité
              </a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-white relative">
              Contact
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </h4>
            <ul className="space-y-4 text-slate-400">
              <li className="group flex items-center gap-4 hover:text-orange-400 transition-all duration-300">
                <div className="p-2 rounded-full bg-slate-800/50 border border-slate-700 group-hover:bg-orange-600 group-hover:border-orange-500 transition-all duration-300">
                  <Phone className="text-orange-400 group-hover:text-white w-4 h-4" />
                </div>
                <span>+1 (555) 987-6543</span>
              </li>
              <li className="group flex items-center gap-4 hover:text-orange-400 transition-all duration-300">
                <div className="p-2 rounded-full bg-slate-800/50 border border-slate-700 group-hover:bg-orange-600 group-hover:border-orange-500 transition-all duration-300">
                  <Mail className="text-orange-400 group-hover:text-white w-4 h-4" />
                </div>
                <span>support@foodmaroc.com</span>
              </li>
              <li className="group flex items-center gap-4 hover:text-orange-400 transition-all duration-300">
                <div className="p-2 rounded-full bg-slate-800/50 border border-slate-700 group-hover:bg-orange-600 group-hover:border-orange-500 transition-all duration-300">
                  <MapPin className="text-orange-400 group-hover:text-white w-4 h-4" />
                </div>
                <span>123 Flavor St, Food City</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-slate-400">© {year} Food Maroc. Tous droits réservés.</p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:underline">Politique de Confidentialité</a>
            <span className="text-slate-600">•</span>
            <a href="#" className="text-slate-400 hover:text-orange-400 transition-all duration-300 hover:underline">Conditions d'Utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer