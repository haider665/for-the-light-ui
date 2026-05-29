import { Search } from 'lucide-react'
import BlogCard from '../components/ui/BlogCard'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = [
    'All',
    'Technology & Innovation',
    'Policy & Advocacy',
    'Stories from the Field',
    'Green Entrepreneurship',
    'Case Study',
  ]

  const articles = [
    {
      id: '5',
      image: "/images/impacts/project_trace_townhall.jpg",
      category: 'Case Study',
      title: 'From Grievance to Resolution: The Complete Data-Driven Journey of Project TRACE',
      excerpt:
        'How localized grievances were engineered into unassailable datasets that commanded institutional action — 13 infrastructure resolutions in 3 months.',
    },
    {
      id: '1',
      image: "/images/backgrounds/communityLearning.jpg",
      category: 'Technology & Innovation',
      title: 'The Resilience Loop: How Technology Empowers Women in Coastal Bangladesh',
      excerpt:
        'Explore how innovative technologies are helping women in coastal communities adapt to climate change and build resilience.',
    },
    {
      id: '2',
      image: "/images/backgrounds/fatima.jpg",
      category: 'Policy & Advocacy',
      title: "From Fatima to Policy: Amplifying Women's Voices",
      excerpt:
        'Learn about our advocacy efforts to ensure women\'s voices are heard in...',
    },
    {
      id: '3',
      image: "/images/backgrounds/womenEngineering.jpg",
      category: 'Stories from the Field',
      title: 'Engineering for Empathy: Designing with Women at the Center',
      excerpt:
        'Discover our human-centered design approach, ensuring our solutions are...',
    },
    {
      id: '4',
      image: "/images/backgrounds/womenEmpowerment.jpg",
      category: 'Green Entrepreneurship',
      title: 'Building a Digital Lifeline: Supporting Women-Led Green Businesses',
      excerpt: 'Read about our initiatives to support women entrepreneurs in the green secto...',
    },
  ]

  const filteredArticles = activeFilter === 'All' 
    ? articles 
    : articles.filter(article => article.category === activeFilter)

  return (
    <>
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">Knowledge Hub</span>
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-8">Our Library</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Explore our latest insights, stories, and updates on gender-focused green initiatives
              in Bangladesh.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 md:pl-16 pr-4 md:pr-6 py-3 md:py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm text-base md:text-lg"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-14 md:mb-20">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 md:px-8 py-2 md:py-3 rounded-full transition-all duration-300 font-semibold text-sm md:text-base ${
                  activeFilter === filter
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm hover:shadow-md'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {(activeFilter === 'All') && (
            <div className="mb-14 md:mb-20 max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                    <img
                      src="/images/impacts/project_trace_townhall.jpg"
                      alt="Project TRACE Townhall"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 md:p-12 flex flex-col justify-center space-y-5 md:space-y-6">
                    <span className="inline-block px-4 py-2 text-xs font-semibold text-primary bg-primary/10 rounded-full uppercase tracking-wider w-fit">
                      Case Study
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight group-hover:text-primary transition-colors">
                      From Grievance to Resolution: The Complete Data-Driven Journey of Project TRACE
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                      How localized grievances were engineered into unassailable datasets that commanded institutional action — 13 infrastructure resolutions in 3 months.
                    </p>
                    <Link to="/article/5" className="text-primary font-semibold inline-flex items-center gap-3 text-lg hover:gap-5 transition-all">
                      Read the Full Story →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Article Grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 mb-14 md:mb-20 max-w-7xl mx-auto">
            {filteredArticles.map((article) => (
              <BlogCard key={article.id} {...article} link={`/article/${article.id}`} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
            <button className="p-3 hover:bg-gray-200 rounded-xl transition-all hover:shadow-md">←</button>
            <button className="w-12 h-12 bg-primary text-white rounded-xl shadow-lg font-semibold hover:scale-105 transition-transform">1</button>
            <button className="w-12 h-12 bg-white hover:bg-gray-200 rounded-xl transition-all shadow-sm hover:shadow-md font-semibold">2</button>
            <button className="w-12 h-12 bg-white hover:bg-gray-200 rounded-xl transition-all shadow-sm hover:shadow-md font-semibold">3</button>
            <span className="px-2 text-gray-400 font-semibold">...</span>
            <button className="w-12 h-12 bg-white hover:bg-gray-200 rounded-xl transition-all shadow-sm hover:shadow-md font-semibold">8</button>
            <button className="p-3 hover:bg-gray-200 rounded-xl transition-all hover:shadow-md">→</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Blog