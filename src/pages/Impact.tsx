import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Impact = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const impactImages = [
    {
      src: '/images/impacts/1. Global SDG-1.JPG',
      caption: 'Global SDG Partnership: Advancing Sustainable Development Goals',
    },
    {
      src: '/images/impacts/2. Global SDG-2.JPG',
      caption: 'Global SDG Partnership: Building a Sustainable Future Together',
    },
    {
      src: '/images/impacts/3. Awareness to Action-1.jpg',
      caption: 'Awareness to Action: Empowering Communities Through Education',
    },
    {
      src: '/images/impacts/4. Awareness to Action-2.jpg',
      caption: 'Grassroots Movement: From Awareness to Real Impact',
    },
    {
      src: '/images/impacts/5. Awareness to Action-3.jpg',
      caption: 'Youth Leadership: Driving Climate Action Forward',
    },
    {
      src: '/images/impacts/6. Awareness to Action-4.jpg',
      caption: 'Community Workshops: Knowledge Sharing for Change',
    },
    {
      src: '/images/impacts/7. Green Voice-2.jpg',
      caption: 'Green Voice Initiative: Amplifying Environmental Advocacy',
    },
    {
      src: '/images/impacts/8. Green voice.jpg',
      caption: 'Voices for Change: Community Leaders Speak Out',
    },
    {
      src: '/images/impacts/9. Green Entrepreneurship training.jpg',
      caption: 'Green Entrepreneurship Training: Building Sustainable Businesses',
    },
    {
      src: '/images/impacts/10. Renewable energy fest.jfif',
      caption: 'Renewable Energy Festival: Celebrating Clean Energy Solutions',
    },
    {
      src: '/images/impacts/11. Women in Energy.jpg',
      caption: 'Women in Energy: Leading the Green Revolution',
    },
    {
      src: '/images/impacts/12. post program event.jpg',
      caption: 'Program Celebration: Honoring Achievements and Success',
    },
    {
      src: '/images/impacts/IMG-20250914-WA0099.jpg',
      caption: 'Community Impact: Transforming Lives Through Technology',
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % impactImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + impactImages.length) % impactImages.length)
  }
  return (
    <>
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">Making a Difference</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8">Our Impact</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              At For The Light, we're committed to creating a sustainable and equitable future for
              women in Bangladesh. Our innovative approach combines green technology with a
              women-led economic model, empowering communities and driving positive change.
            </p>
          </div>

          {/* The Model */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12 mb-32 max-w-6xl mx-auto shadow-lg">
            <div className="inline-block px-4 py-2 bg-white rounded-full mb-6">
              <span className="text-sm font-semibold text-primary">Our Model</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">The Model</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our model centers on a women-led green economy, where women entrepreneurs are at the
              forefront of deploying and maintaining life-saving green technologies. This approach
              not only provides access to clean energy and water but also creates economic
              opportunities, fostering independence and resilience within communities.
            </p>
          </div>

          {/* Impact Metrics Dashboard
          <div className="mb-32">
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">By The Numbers</span>
              <h2 className="text-4xl md:text-5xl font-bold">Impact Metrics Dashboard</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <StatCard value="15,000+" label="Lives Improved" />
              <StatCard value="500+" label="Women Entrepreneurs Empowered" />
              <StatCard value="2,000+" label="Tons of CO₂ Reduced" />
            </div>
          </div> */}

          {/* Impact Gallery Slider */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">Visual Stories</span>
              <h2 className="text-4xl md:text-5xl font-bold">Impact Gallery</h2>
              <p className="text-xl text-gray-600 mt-6">Witness the transformation in our communities</p>
            </div>
            
            <div className="max-w-6xl mx-auto relative">
              {/* Main Slider */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
                <div className="aspect-[16/10] relative">
                  <img
                    src={impactImages[currentSlide].src}
                    alt={impactImages[currentSlide].caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <p className="text-white text-2xl md:text-3xl font-bold leading-tight">
                      {impactImages[currentSlide].caption}
                    </p>
                    <p className="text-white/80 mt-2">
                      {currentSlide + 1} / {impactImages.length}
                    </p>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 group"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="text-gray-800 group-hover:text-primary transition-colors" size={28} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 group"
                  aria-label="Next slide"
                >
                  <ChevronRight className="text-gray-800 group-hover:text-primary transition-colors" size={28} />
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex gap-3 mt-8 overflow-x-auto pb-4 scrollbar-hide justify-center">
                {impactImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                      currentSlide === index
                        ? 'ring-4 ring-primary scale-105 shadow-lg'
                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Success Story */}
          {/* <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">Inspiring Stories</span>
              <h2 className="text-4xl md:text-5xl font-bold">Success Story</h2>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12 md:p-16 shadow-xl">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600"
                    alt="Fatima"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-6">
                  <blockquote className="text-2xl italic mb-8 text-gray-800 font-light leading-relaxed">
                    "This program didn't just give me a job; it gave me a voice and a future. I am
                    not just a mother anymore, I am an entrepreneur."
                  </blockquote>
                  <p className="font-bold text-lg mb-6 text-primary">- Fatima, Solar Technician</p>
                  <h3 className="text-3xl font-bold mb-6 leading-tight">
                    Empowering Fatima: A Story of Resilience
                  </h3>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Fatima, a mother of three from a remote village, joined our program and became a
                    solar technician. She now provides clean energy solutions to her community,
                    earning a sustainable income and inspiring other women.
                  </p>
                  <Button>Read More</Button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  )
}

export default Impact