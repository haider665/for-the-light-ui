import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 z-50">
              <img 
                src="/images/logos/for the light_logo-01.png" 
                alt="For The Light" 
                className="h-16 md:h-24 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/about" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : isHomePage ? 'text-white hover:text-gray-200' : 'text-black hover:text-primary'}`}>
                Who We Are
              </Link>
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
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden z-50 p-2 transition-colors ${
                isScrolled || isMobileMenuOpen ? 'text-black' : isHomePage ? 'text-white' : 'text-black'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 text-2xl">
          <Link
            to="/about"
            className="text-gray-900 hover:text-primary transition-colors font-medium"
          >
            Who We Are
          </Link>
          <Link
            to="/impact"
            className="text-gray-900 hover:text-primary transition-colors font-medium"
          >
            Impact Stories
          </Link>
          <Link
            to="/guardian"
            className="text-gray-900 hover:text-primary transition-colors font-medium"
          >
            The Guardian
          </Link>
          <Link
            to="/blog"
            className="text-gray-900 hover:text-primary transition-colors font-medium"
          >
            Knowledge Hub
          </Link>
          <Link
            to="/contact"
            className="text-gray-900 hover:text-primary transition-colors font-medium"
          >
            Get Involved
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Header