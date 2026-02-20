const About = () => {
  return (
    <>
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 md:mb-20">
            <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">About Us</span>
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6">We are For The Light</h1>
          </div>

          {/* Our Story & Mission */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-20 md:mb-32 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-semibold text-primary">Our Story</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">We refuse to let our people face alone</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
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
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-semibold text-primary">Mission & Vision</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">Mission & Vision</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
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