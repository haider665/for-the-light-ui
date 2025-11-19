import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Button from '../ui/Button'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/images/logos/for the light_logo-01.png" 
              alt="For The Light" 
              className="h-24 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {/* <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link> */}
            <Link to="/about" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : isHomePage ? 'text-white hover:text-gray-200' : 'text-black hover:text-primary'}`}>
              Who We Are
            </Link>
            {/* <Link to="/about" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : 'text-white hover:text-gray-200'}`}>
              What We Do
            </Link> */}
            <Link to="/impact" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : isHomePage ? 'text-white hover:text-gray-200' : 'text-black hover:text-primary'}`}>
              Impact Stories
            </Link>
            <Link to="/guardian" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : isHomePage ? 'text-white hover:text-gray-200' : 'text-black hover:text-primary'}`}>
              The Guardian
            </Link>
          
            <Link to="/blog" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : isHomePage ? 'text-white hover:text-gray-200' : 'text-black hover:text-primary'}`}>
              Knowledge Hub
            </Link>
            <Link to="/contact" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : isHomePage ? 'text-white hover:text-gray-200' : 'text-black hover:text-primary'}`}>
              Get Involved
            </Link>

            {/* <Link to="/impact" className="hover:text-primary transition-colors">
              Impact
            </Link> */}
            {/* <Link to="/blog" className="hover:text-primary transition-colors">
              News
            </Link> */}
            {/* <Button>Sign In</Button> */}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header