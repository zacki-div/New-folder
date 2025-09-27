import { useEffect, useState } from 'react'
import DesktopNav from './DesktopNav';
import logo from "/logo.svg"
import MobileNav from './MobileNav';


function Header() {
  const [hideLeft, setHideLeft] = useState("-left-[1000px]");
  const [scrolled, setScrolled] = useState(false)
  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "À Propos", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];


  const onOpen = () => {
    setHideLeft("left-0");
  }
  const onClose = () => {
    setHideLeft("-left-[1000px]");
  }
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100 shadow-sm' : 'bg-transparent border-transparent'}`}>
        <div className='max-[900px]:hidden'>
          <DesktopNav navItems={navItems} logo={logo} />
        </div>
        <div className='min-[900px]:hidden'>
          <MobileNav navItems={navItems} logo={logo} onClose={onClose} onOpen={onOpen} hideLeft={hideLeft} />
        </div>
      </header>
      {/* spacer to avoid content being hidden behind fixed header */}
      <div className="h-14" aria-hidden />
    </>
  )
}

export default Header