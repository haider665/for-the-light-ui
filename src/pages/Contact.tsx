import { Mail, Phone, MapPin, Send, CheckCircle, X } from 'lucide-react'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    involvement: 'volunteer',
  })
  
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    
    // Show success modal
    setShowSuccessModal(true)
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      involvement: 'volunteer',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">
              Join Us
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8">Get Involved</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Together, we can create a more sustainable and equitable future. Whether you want to
              volunteer, partner with us, or support our mission, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    We're always excited to connect with people who share our vision for a
                    sustainable future. Reach out to us, and let's make a difference together.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email Us</h3>
                      <a
                        href="mailto:contact@forthelight.asia"
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        contact@forthelight.asia
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Call Us</h3>
                      <p className="text-gray-600">+880 1731-932318</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                      <p className="text-gray-600">
                        Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ways to Get Involved */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold mb-6">Ways to Get Involved</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Volunteer:</strong> Join our programs and make a direct impact in
                        communities
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Partner:</strong> Collaborate with us on initiatives and projects
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Donate:</strong> Support our mission financially
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Spread the Word:</strong> Share our story and amplify our impact
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-100">
                <h3 className="text-3xl font-bold mb-8">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="involvement" className="block text-sm font-semibold mb-2">
                      I'm interested in *
                    </label>
                    <select
                      id="involvement"
                      name="involvement"
                      required
                      value={formData.involvement}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="volunteer">Volunteering</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="donation">Making a Donation</option>
                      <option value="general">General Inquiry</option>
                      <option value="media">Media & Press</option>
                      <option value="career">Career Opportunities</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about your interest..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                  >
                    Send Message
                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Every action counts. Join us in building a sustainable future for Bangladesh.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:contact@forthelight.asia"
                className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              >
                Email Us Directly
              </a>
              <a
                href="#"
                className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
              >
                Download Our Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={24} className="text-gray-500" />
            </button>

            {/* Success Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-green-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle size={40} className="text-white" />
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Message Sent!</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Thank you for reaching out! We've received your message and will get back to you
                within 24-48 hours.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Continue Exploring
                </button>
                <a
                  href="/"
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all text-center"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Contact
