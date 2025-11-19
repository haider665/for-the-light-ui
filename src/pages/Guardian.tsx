import FeatureCard from '../components/ui/FeatureCard'
import { Sun, Bell, Shield, MapPin } from 'lucide-react'

const Guardian = () => {
  const features = [
    {
      icon: <Sun size={32} />,
      title: 'Resilient Energy',
    },
    {
      icon: <Bell size={32} />,
      title: 'Life-Saving Alerts',
    },
    {
      icon: <Shield size={32} />,
      title: 'Information Integrity',
    },
    {
      icon: <MapPin size={32} />,
      title: 'Built for Bangladesh',
    },
  ]

  const specifications = [
    { feature: 'Device Type', specification: 'Wearable weather alert system' },
    { feature: 'Alert Method', specification: 'Audible and visual alerts' },
    { feature: 'Power Source', specification: 'Solar-charged battery' },
    { feature: 'Operating Range', specification: 'Up to 5km' },
    { feature: 'Durability', specification: 'Water-resistant and rugged design' },
  ]

  return (
    <>
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">Our Technology</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8">The Guardian</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              The Guardian is a life-saving technology designed to protect women and girls in
              Bangladesh from the dangers of climate change. It is a wearable device that provides
              early warning alerts for extreme weather events, access to critical information, and a
              resilient energy source to power essential devices.
            </p>
          </div>

          {/* Core Features */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">Features</span>
              <h2 className="text-4xl md:text-5xl font-bold">Core Features</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <FeatureCard key={index} icon={feature.icon} title={feature.title} />
              ))}
            </div>
          </div>

          {/* Technology Roadmap */}
          <div className="mb-32 max-w-5xl mx-auto">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-primary">Roadmap</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Technology Roadmap</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The Guardian V3 is currently in development and will feature enhanced capabilities,
              including improved weather forecasting accuracy, expanded communication range, and a
              more user-friendly interface. We are committed to continuously improving The Guardian
              to meet the evolving needs of the communities we serve.
            </p>
          </div>

          {/* Technical Specifications */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">Specifications</span>
              <h2 className="text-4xl md:text-5xl font-bold">Technical Specifications (Guardian V2)</h2>
            </div>
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <tr>
                    <th className="text-left py-5 px-8 font-bold text-gray-900 uppercase tracking-wider text-sm">Feature</th>
                    <th className="text-left py-5 px-8 font-bold text-gray-900 uppercase tracking-wider text-sm">Specification</th>
                  </tr>
                </thead>
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr key={index} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-5 px-8 font-semibold text-gray-900">{spec.feature}</td>
                      <td className="py-5 px-8 text-gray-600 text-lg">{spec.specification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Guardian