import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logos/favicon.png" alt="For The Light Logo" className="w-6 h-6" />
            <span className="text-xl font-bold">For The Light</span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-6">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/guardian" className="hover:text-primary transition-colors">
              Programs
            </Link>
            <Link to="/impact" className="hover:text-primary transition-colors">
              Impact
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <a
              href="https://drive.google.com/file/d/1mMaSrNaAyCPTGfw8c65cb6frNy4vz_3h/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              RTI Guideline
            </a>
          </nav>

          <div className="flex gap-6">
            <a href="https://www.facebook.com/share/1CZEyzf4pL/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/forthelight.official/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/company/for-the-light/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          </div>

          <p className="text-sm text-gray-600">
            © 2026 For The Light. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer