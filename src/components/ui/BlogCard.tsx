import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BlogCardProps {
  image: string
  category: string
  title: string
  excerpt: string
  link?: string
}

const BlogCard = ({ image, category, title, excerpt, link = '#' }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
      <div className="aspect-video overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-6 md:p-8">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full uppercase tracking-wider">{category}</span>
        <h3 className="text-xl md:text-2xl font-bold mt-4 mb-3 leading-tight group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{excerpt}</p>
        <Link
          to={link}
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300"
        >
          Read More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

export default BlogCard