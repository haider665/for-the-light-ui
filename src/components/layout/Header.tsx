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
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded"></div>
            <span className="text-xl font-bold">For The Light</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/guardian" className="hover:text-primary transition-colors">
              The Guardian
            </Link>
            <Link to="/impact" className="hover:text-primary transition-colors">
              Impact
            </Link>
            <Link to="/blog" className="hover:text-primary transition-colors">
              News
            </Link>
            <Button>Donate</Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header