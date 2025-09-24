import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recipe from "./pages/Recipe";
import Payment from "./pages/Payment";
import ThankYou from "./pages/ThankYou";
import Header from './components/header/Header'
import Footer from './components/Footer'


function ScrollToTop() {
  const location = useLocation()
  React.useEffect(() => {
    // Scroll to the very top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])
  return null
}

function App() {
  React.useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' })
  }, [])
  return (
    <Router>
      <div className="overflow-x-hidden">
        <ScrollToTop />
        <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/:category" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/recipe/:id" element={<Recipe />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App