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
              <h2 className="text-3xl font-bold mb-6">We refuse to let our people face alone</h2>
              <p className="text-gray-600 leading-relaxed">
                In Bangladesh, the climate crisis is not a distant wave—it is the darkness that falls upon our people. 
                It's a brutal reality that fuels a devastating Triple Crisis where survival is the highest price.
                
                <br/>
                <br/>
                The very ground beneath their feet is unstable. From the sudden, merciless landslides in the Hill Tracts 
                to the relentless, crushing force of cyclones in the deep sea, their homes are the front line. A haunting
                 fear stalks those who depend on the forest. Fishermen, woodcutters, and honey collectors are tragically 
                 lost, often because they lack the simplest lifeline—basic SOS technology—to battle the sea's fury or escape
                  the Royal Bengal Tiger. In coastal, Families are trapped in energy poverty. They spend their scarce income 
                  on toxic, polluting kerosene—a fuel that clouds their homes with deadly smoke, contributes to greenhouse gases,
                   and claims tens of thousands of lives yearly. The stress of this economic and climate hardship compounds the 
                   ultimate betrayal: a hidden safety crisis where coastal women face intimate partner violence in their lifetime.
                    This cycle of vulnerability, pollution, and peril locks our future in place. But where the light fails, a new 
                    generation is rising...

                <br/>
                <br/>

                We refuse to let our people face it alone. The solution is in the hands of a new generation.

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
          {/* <div>
            <h2 className="text-4xl font-bold text-center mb-16">The Core Team</h2>
            <div className="grid md:grid-cols-4 gap-12 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div> */}
        </div>
      </section>
    </>
  )
}

export default About