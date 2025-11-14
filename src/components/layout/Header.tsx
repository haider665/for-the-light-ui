import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Button from '../ui/Button'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

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
          <Link to="/" className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded transition-colors ${isScrolled ? 'bg-primary' : 'bg-white'}`}></div>
            <span className={`text-xl font-bold transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>For The Light</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {/* <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link> */}
            <Link to="/about" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : 'text-white hover:text-gray-200'}`}>
              Who We Are
            </Link>
            <Link to="/about" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : 'text-white hover:text-gray-200'}`}>
              What We Do
            </Link>
            <Link to="/impact" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : 'text-white hover:text-gray-200'}`}>
              Impact Stories
            </Link>
            <Link to="/guardian" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : 'text-white hover:text-gray-200'}`}>
              The Guardian
            </Link>
          
            <Link to="/blog" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : 'text-white hover:text-gray-200'}`}>
              Knowledge Hub
            </Link>
            <Link to="/about" className={`transition-colors ${isScrolled ? 'text-black hover:text-primary' : 'text-white hover:text-gray-200'}`}>
              Get Involved
            </Link>

            {/* <Link to="/impact" className="hover:text-primary transition-colors">
              Impact
            </Link> */}
            {/* <Link to="/blog" className="hover:text-primary transition-colors">
              News
            </Link> */}
            <Button>Sign In</Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header