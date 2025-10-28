import Hero from '../components/ui/Hero'
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">The Guardian</h1>
            <p className="text-lg text-gray-600">
              The Guardian is a life-saving technology designed to protect women and girls in
              Bangladesh from the dangers of climate change. It is a wearable device that provides
              early warning alerts for extreme weather events, access to critical information, and a
              resilient energy source to power essential devices.
            </p>
          </div>

          {/* Core Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} icon={feature.icon} title={feature.title} />
              ))}
            </div>
          </div>

          {/* Technology Roadmap */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-6">Technology Roadmap</h2>
            <p className="text-gray-600 max-w-4xl">
              The Guardian V3 is currently in development and will feature enhanced capabilities,
              including improved weather forecasting accuracy, expanded communication range, and a
              more user-friendly interface. We are committed to continuously improving The Guardian
              to meet the evolving needs of the communities we serve.
            </p>
          </div>

          {/* Technical Specifications */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Technical Specifications (Guardian V2)</h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold">FEATURE</th>
                    <th className="text-left py-4 px-6 font-bold">SPECIFICATION</th>
                  </tr>
                </thead>
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-4 px-6 font-medium">{spec.feature}</td>
                      <td className="py-4 px-6 text-gray-600">{spec.specification}</td>
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