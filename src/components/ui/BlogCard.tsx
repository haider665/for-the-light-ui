import { ArrowRight } from 'lucide-react'

interface BlogCardProps {
  image: string
  category: string
  title: string
  excerpt: string
  link?: string
}

const BlogCard = ({ image, category, title, excerpt, link = '#' }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <span className="text-sm font-medium text-primary">{category}</span>
        <h3 className="text-xl font-bold mt-2 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <a
          href={link}
          className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
        >
          Read More <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )
}

export default BlogCard