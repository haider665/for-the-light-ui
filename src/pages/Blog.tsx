import { Search } from 'lucide-react'
import BlogCard from '../components/ui/BlogCard'
import { useState } from 'react'

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = [
    'All',
    'Technology & Innovation',
    'Policy & Advocacy',
    'Stories from the Field',
    'Green Entrepreneurship',
  ]

  const articles = [
    {
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600',
      category: 'Technology & Innovation',
      title: 'The Resilience Loop: How Technology Empowers Women in Coastal Bangladesh',
      excerpt:
        'Explore how innovative technologies are helping women in coastal communities adapt to climate change and build resilience.',
    },
    {
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600',
      category: 'Policy & Advocacy',
      title: "From Fatima to Policy: Amplifying Women's Voices",
      excerpt:
        'Learn about our advocacy efforts to ensure women\'s voices are heard in...',
    },
    {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
      category: 'Stories from the Field',
      title: 'Engineering for Empathy: Designing with Women at the Center',
      excerpt:
        'Discover our human-centered design approach, ensuring our solutions are...',
    },
    {
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600',
      category: 'Green Entrepreneurship',
      title: 'Building a Digital Lifeline: Supporting Women-Led Green Businesses',
      excerpt: 'Read about our initiatives to support women entrepreneurs in the green secto...',
    },
  ]

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Our Library</h1>
            <p className="text-lg text-gray-600">
              Explore our latest insights, stories, and updates on gender-focused green initiatives
              in Bangladesh.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeFilter === filter
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800"
                    alt="Featured"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-sm font-medium text-primary mb-2">
                    Technology & Innovation
                  </span>
                  <h2 className="text-3xl font-bold mb-4">
                    The Resilience Loop: How Technology Empowers Women in Coastal Bangladesh
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Explore how innovative technologies are helping women in coastal communities
                    adapt to climate change and build resilience.
                  </p>
                  <a href="#" className="text-primary font-medium inline-flex items-center gap-2">
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {articles.map((article, index) => (
              <BlogCard key={index} {...article} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2">
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">←</button>
            <button className="w-10 h-10 bg-primary text-white rounded-lg">1</button>
            <button className="w-10 h-10 hover:bg-gray-200 rounded-lg transition-colors">2</button>
            <button className="w-10 h-10 hover:bg-gray-200 rounded-lg transition-colors">3</button>
            <span className="px-2">...</span>
            <button className="w-10 h-10 hover:bg-gray-200 rounded-lg transition-colors">8</button>
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">→</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Blog