import TeamMember from '../components/ui/TeamMember'

const About = () => {
  const team = [
    {
      name: 'Aisha Rahman',
      title: 'Co-Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      name: 'Rohan Khan',
      title: 'Co-Founder & CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      name: 'Fatima Chowdhury',
      title: 'Head of Programs',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
    },
    {
      name: 'Omar Faruk',
      title: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    },
  ]

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-bold mb-2">ABOUT US</p>
            <h1 className="text-5xl font-bold">We are For The Light</h1>
          </div>

          {/* Our Story & Mission */}
          <div className="grid md:grid-cols-2 gap-12 mb-20 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                For The Light began as a spark of hope in the heart of young activists in
                Bangladesh, witnessing the devastating impact of climate change on vulnerable
                communities, particularly women and girls. Driven by a deep commitment to social
                justice and environmental sustainability, they envisioned a youth-led social
                enterprise that could bridge the gap between green technology and gender equality.
                This vision materialized into For The Light, an organization dedicated to building
                a gender-focused green ecosystem with life-saving technology, empowering
                communities to thrive in the face of climate challenges.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Mission & Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to empower communities in Bangladesh, especially women and girls, by
                providing access to life-saving green technologies and fostering a gender-inclusive
                approach to climate resilience. We envision a future where every individual,
                regardless of gender, has the opportunity to live a safe, healthy, and sustainable
                life in a climate-changed world.
              </p>
            </div>
          </div>

          {/* The Core Team */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-16">The Core Team</h2>
            <div className="grid md:grid-cols-4 gap-12 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About