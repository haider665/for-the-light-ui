import Hero from '../components/ui/Hero'
import BlogCard from '../components/ui/BlogCard'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="We refuse to let our people face alone"
        backgroundImage="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600"
      >
        {/* <div className="flex gap-4 justify-center">
          <Button>Learn More</Button>
          <Button variant="outline">Donate</Button>
        </div> */}
      </Hero>

      {/* The Problem */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">The Challenge</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 leading-tight">The Problem</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              In the heart of Bangladesh, climate change disproportionately affects women and girls.
              Rising sea levels, extreme weather events, and resource scarcity exacerbate existing
              inequalities, threatening their safety, livelihoods, and futures.
            </p>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14 md:mb-20">
            <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">Our Approach</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">Our Solution</h2>
          </div>

          {/* Innovative Green Technology */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-semibold text-primary">Technology</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">Innovative Green Technology</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                We develop and deploy cutting-edge, sustainable technologies tailored to the unique
                needs of women and girls in vulnerable communities. Our solutions focus on clean
                energy, water purification, and communication for climate resilience.
              </p>
            </div>
            <div className="aspect-square relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl transform translate-x-4 translate-y-4"></div>
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600"
                alt="Solar Technology"
                className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Community-Driven Model */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-7xl mx-auto">
            <div className="order-2 md:order-1 aspect-square relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl transform -translate-x-4 translate-y-4"></div>
              <img
                src="/images/backgrounds/communityLearning.jpg"
                alt="Community Meeting"
                className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-semibold text-primary">Community</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">Community-Driven Model</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our approach is rooted in community participation and empowerment. We work closely
                with local leaders, organizations, and beneficiaries to ensure our solutions are
                culturally appropriate, sustainable, and impactful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Hub Preview */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">Insights & Stories</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">Knowledge Hub</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Dive into our collection of resources and stories
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
            <BlogCard
              image="/images/backgrounds/communityLearning.jpg"
              category="Technology & Innovation"
              title="The Resilience Loop: How Technology Empowers Women in Coastal Bangladesh"
              excerpt="Explore how innovative technologies are helping women in coastal communities adapt to climate change and build resilience."
              link="/article/1"
            />
            <BlogCard
              image="/images/backgrounds/fatima.jpg"
              category="Policy & Advocacy"
              title="From Fatima to Policy: Amplifying Women's Voices"
              excerpt="Learn about our advocacy efforts to ensure women's voices are heard in..."
              link="/article/2"
            />
            <BlogCard
              image="/images/backgrounds/womenEngineering.jpg"
              category="Stories from the Field"
              title="Engineering for Empathy: Designing with Women at the Center"
              excerpt="Discover our human-centered design approach, ensuring our solutions are..."
              link="/article/3"
            />
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">Trusted By</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold">Our Partners</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 max-w-7xl mx-auto">
            <div className="grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
              <img 
                src="/images/logos/Bridge-for-Billions-logo.png" 
                alt="Bridge for Billions" 
                className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto object-contain"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
              <img 
                src="/images/logos/Dhumketu logo.png" 
                alt="Dhumketu" 
                className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto object-contain"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
              <img 
                src="/images/logos/UK_International_logo.png" 
                alt="UK International" 
                className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto object-contain"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
              <img 
                src="/images/logos/earth logo.png" 
                alt="Earth" 
                className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto object-contain"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
              <img 
                src="/images/logos/kingdom-of-the-netherlands-logo.png" 
                alt="Kingdom of the Netherlands" 
                className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home