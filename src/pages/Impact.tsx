import StatCard from '../components/ui/StatCard'
import Button from '../components/ui/Button'

const Impact = () => {
  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Our Impact</h1>
            <p className="text-lg text-primary">
              At For The Light, we're committed to creating a sustainable and equitable future for
              women in Bangladesh. Our innovative approach combines green technology with a
              women-led economic model, empowering communities and driving positive change.
            </p>
          </div>

          {/* The Model */}
          <div className="bg-green-50 rounded-2xl p-8 mb-20">
            <h2 className="text-3xl font-bold mb-6">The Model</h2>
            <p className="text-gray-700">
              Our model centers on a women-led green economy, where women entrepreneurs are at the
              forefront of deploying and maintaining life-saving green technologies. This approach
              not only provides access to clean energy and water but also creates economic
              opportunities, fostering independence and resilience within communities.
            </p>
          </div>

          {/* Impact Metrics Dashboard */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Impact Metrics Dashboard</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <StatCard value="15,000+" label="Lives Improved" />
              <StatCard value="500+" label="Women Entrepreneurs Empowered" />
              <StatCard value="2,000+" label="Tons of CO₂ Reduced" />
            </div>
          </div>

          {/* Success Story */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Success Story</h2>
            <div className="bg-green-50 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600"
                    alt="Fatima"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <blockquote className="text-xl italic mb-6">
                    "This program didn't just give me a job; it gave me a voice and a future. I am
                    not just a mother anymore, I am an entrepreneur."
                  </blockquote>
                  <p className="font-bold mb-4">- Fatima, Solar Technician</p>
                  <h3 className="text-2xl font-bold mb-4">
                    Empowering Fatima: A Story of Resilience
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Fatima, a mother of three from a remote village, joined our program and became a
                    solar technician. She now provides clean energy solutions to her community,
                    earning a sustainable income and inspiring other women.
                  </p>
                  <Button>Read More</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Impact