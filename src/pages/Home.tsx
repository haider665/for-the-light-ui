import Hero from '../components/ui/Hero'
import BlogCard from '../components/ui/BlogCard'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="We refuse to let our people face alone"
        backgroundImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600"
      >
        {/* <div className="flex gap-4 justify-center">
          <Button>Learn More</Button>
          <Button variant="outline">Donate</Button>
        </div> */}
      </Hero>

      {/* The Problem */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">The Problem</h2>
            <p className="text-lg text-gray-600">
              In the heart of Bangladesh, climate change disproportionately affects women and girls.
              Rising sea levels, extreme weather events, and resource scarcity exacerbate existing
              inequalities, threatening their safety, livelihoods, and futures.
            </p>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Solution</h2>

          {/* Innovative Green Technology */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-4">Innovative Green Technology</h3>
              <p className="text-gray-600">
                We develop and deploy cutting-edge, sustainable technologies tailored to the unique
                needs of women and girls in vulnerable communities. Our solutions focus on clean
                energy, water purification, and communication for climate resilience.
              </p>
            </div>
            <div className="aspect-square">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600"
                alt="Solar Technology"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Community-Driven Model */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600"
                alt="Community Meeting"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold mb-4">Community-Driven Model</h3>
              <p className="text-gray-600">
                Our approach is rooted in community participation and empowerment. We work closely
                with local leaders, organizations, and beneficiaries to ensure our solutions are
                culturally appropriate, sustainable, and impactful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Hub Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">Knowledge Hub Preview</h2>
            <p className="text-primary font-medium">
              Dive into our collection of resources and stories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <BlogCard
              image="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600"
              category="Climate Education"
              title="Understanding Climate Change Impacts"
              excerpt="Explore our resources on the specific impacts of climate change in Bangladesh."
            />
            <BlogCard
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600"
              category="Technology"
              title="Empowering Women Through Technology"
              excerpt="Learn about our innovative technologies that empower women and girls."
            />
            <BlogCard
              image="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600"
              category="Community"
              title="Building Climate-Resilient Communities"
              excerpt="Discover our community-led initiatives that are driving lasting change."
            />
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <img 
              src="/images/logos/Bridge-for-Billions-logo.png" 
              alt="Bridge for Billions" 
              className="h-48 w-auto object-contain"
            />
            <img 
              src="/images/logos/Dhumketu logo.png" 
              alt="Dhumketu" 
              className="h-48 w-auto object-contain"
            />
            <img 
              src="/images/logos/UK_International_logo.png" 
              alt="UK International" 
              className="h-48 w-auto object-contain"
            />
            <img 
              src="/images/logos/earth logo.png" 
              alt="Earth" 
              className="h-48 w-auto object-contain"
            />
            <img 
              src="/images/logos/kingdom-of-the-netherlands-logo.png" 
              alt="Kingdom of the Netherlands" 
              className="h-48 w-auto object-contain"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home