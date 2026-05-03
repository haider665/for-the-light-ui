import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Users, Zap, Shield, ChevronRight } from 'lucide-react'
import Hero from '../components/ui/Hero'
import BlogCard from '../components/ui/BlogCard'
import Button from '../components/ui/Button'

const stats = [
  { value: '10K+', label: 'Lives Impacted' },
  { value: '20+', label: 'Communities Served' },
  { value: '16', label: 'Partner Organizations' },
  { value: '100%', label: 'Program Success Rate' },
]

const pillars = [
  {
    icon: <Zap size={28} />,
    title: 'Green Technology',
    description: 'Deploying sustainable tech solutions such as solar energy, water purification, and communication tools specially designed for resilience.',
  },
  {
    icon: <Users size={28} />,
    title: 'Community Empowerment',
    description: 'Building capacity through education, leadership training, and participatory design with women at the center.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Climate Protection',
    description: 'Advocating for policies that protect the most vulnerable and creating systems for early warning and rapid response.',
  },
  {
    icon: <Leaf size={28} />,
    title: 'Sustainable Livelihoods',
    description: 'Creating economic opportunities through green enterprises and skill-building for long-term self-sufficiency.',
  },
]

const partners = [
  { src: '/images/new-partners/1.png', alt: 'Partner 1' },
  { src: '/images/new-partners/2.png', alt: 'Partner 2' },
  { src: '/images/new-partners/3.png', alt: 'Partner 3' },
  { src: '/images/new-partners/4.png', alt: 'Partner 4' },
  { src: '/images/new-partners/5.png', alt: 'Partner 5' },
  { src: '/images/new-partners/6.png', alt: 'Partner 6' },
  { src: '/images/new-partners/7.png', alt: 'Partner 7' },
  { src: '/images/new-partners/8.png', alt: 'Partner 8' },
  { src: '/images/new-partners/9.png', alt: 'Partner 9' },
  { src: '/images/new-partners/10.png', alt: 'Partner 10' },
  { src: '/images/new-partners/11.png', alt: 'Partner 11' },
  { src: '/images/new-partners/12.png', alt: 'Partner 12' },
  { src: '/images/new-partners/13.png', alt: 'Partner 13' },
  { src: '/images/new-partners/JCI logo.png', alt: 'JCI' },
  // { src: '/images/new-partners/ftl logo.png', alt: 'For The Light' },
]

const Home = () => {
  return (
    <>
      {/* ─── Hero ─── */}
      <Hero
        title="We refuse to let our people face alone"
        subtitle="Empowering women and girls in climate-vulnerable Bangladesh through green technology, community resilience, and lasting change."
        backgroundImage="/images/backgrounds/home.jpg"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/programs">
            <Button className="px-8 py-3.5 text-base shadow-glow-lg hover:shadow-glow transition-shadow">
              Explore Programs
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" className="px-8 py-3.5 text-base backdrop-blur-sm">
              Our Story <ArrowRight size={18} className="inline ml-2" />
            </Button>
          </Link>
        </div>
      </Hero>

      {/* ─── Floating Stats Bar ─── */}
      <section className="relative z-30 -mt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto glass-light rounded-2xl shadow-premium-xl p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center group">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-primary to-primary-dark bg-clip-text text-transparent mb-1 transition-transform group-hover:scale-105">
                    {s.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-500 font-medium tracking-wide uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Problem ─── */}
      <section className="py-24 md:py-36 bg-white relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Text */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-[2px] bg-primary"></div>
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">The Challenge</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                Climate change hits <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">women &amp; girls</span> the hardest
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                In the heart of Bangladesh, rising sea levels, extreme weather events, and resource
                scarcity amplify existing inequalities — threatening the safety, livelihoods, and
                futures of the most vulnerable communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-500 font-bold text-sm">1</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed"><strong className="text-gray-800">Displacement</strong> — Millions forced from homes due to flooding &amp; erosion</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-500 font-bold text-sm">2</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed"><strong className="text-gray-800">Vulnerability</strong> — Women face disproportionate safety &amp; livelihood risks</p>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-[2rem] blur-xl"></div>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-premium-xl">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800"
                  alt="Climate impact on communities"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-6 glass-light rounded-2xl p-5 shadow-premium-lg max-w-[220px]">
                <div className="text-3xl font-extrabold text-primary mb-1">64M</div>
                <div className="text-xs text-gray-500 font-medium leading-snug">People in Bangladesh affected by climate disasters annually</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Documentary Section ─── */}
      <section className="py-24 md:py-36 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-primary"></div>
              <span className="text-sm font-semibold tracking-widest text-primary uppercase">The Story Behind the Data</span>
              <div className="w-10 h-[2px] bg-primary"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              A Journey of Innovation and Impact
            </h2>
          </div>

          <div className="max-w-4xl mx-auto mb-14">

            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>
                Welcome to the <strong className="text-gray-800">Community Watch Portal</strong>—the heart of <strong className="text-gray-800">Project TRACE</strong>. We are proud to be part of the <strong className="text-gray-800">Digital Democracy Initiative (DDI)</strong>. This global program is implemented regionally by the organization <strong className="text-gray-800">DDI South Asia</strong>, with vital funding and support from <strong className="text-gray-800">Accountability Lab</strong> and <strong className="text-gray-800">CIVICUS</strong>.
              </p>
              <p>
                But beyond the partnerships, this is a story about local youth taking charge.
              </p>
              <p>
                Instead of just accepting broken infrastructure and public health hazards in Patuakhali, we decided to act. We trained <strong className="text-gray-800">50 local youth</strong> (half of them young women) to step up as digital civic auditors. Armed with smartphones and this very portal, they went out into the field and gathered <strong className="text-gray-800">128 raw hazard reports</strong>. We carefully verified these down to <strong className="text-gray-800">60 rock-solid, GPS-tagged cases</strong>.
              </p>
              <p>
                When we presented this undeniable data to the local administration, something amazing happened: they didn't get defensive; they got to work. In just three months, authorities have already completely fixed <strong className="text-gray-800">13 critical hazards</strong> based on our youth's reports, and <strong className="text-gray-800">11 more major repairs</strong> are happening right now.
              </p>
              <p className="text-xl font-medium text-gray-700">
                👇 Watch the short documentary below to see exactly how these young citizens broke the silence and forced real change.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/SvUvzXlN06U?si=1Yt_SnaRTqjMzh4e"
                title="DDI South Asia First Cohort Documentary"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Pillars ─── */}
      <section className="py-24 md:py-36 bg-surface-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-primary"></div>
              <span className="text-sm font-semibold tracking-widest text-primary uppercase">Our Approach</span>
              <div className="w-10 h-[2px] bg-primary"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">Four pillars of impact</h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              Our integrated model addresses the root causes of vulnerability while building lasting resilience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto stagger-children">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group bg-white rounded-2xl p-8 shadow-premium hover:shadow-premium-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/80 relative overflow-hidden"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Showcase: Green Tech + Community ─── */}
      <section className="py-24 md:py-36 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Green Technology */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24 md:mb-36 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/8 rounded-full border border-primary/15">
                <Zap size={14} className="text-primary" />
                <span className="text-sm font-semibold text-primary">Technology</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                Innovative green technology for resilient communities
              </h3>
              <p className="text-lg text-gray-500 leading-relaxed">
                We develop and deploy cutting-edge, sustainable technologies tailored to the unique
                needs of women and girls in vulnerable communities. Our solutions focus on clean
                energy, water purification, and communication for climate resilience.
              </p>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group/link"
              >
                Learn more
                <ChevronRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-premium-xl">
                <img
                  src="/images/backgrounds/device.png"
                  alt="Solar Technology"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Community-Driven Model */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-7xl mx-auto">
            <div className="order-2 md:order-1 relative group">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-premium-xl">
                <img
                  src="/images/backgrounds/communityLearning2.jpg"
                  alt="Community Meeting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/8 rounded-full border border-primary/15">
                <Users size={14} className="text-primary" />
                <span className="text-sm font-semibold text-primary">Community</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                Community-driven approach, <br className="hidden md:block" />women-led change
              </h3>
              <p className="text-lg text-gray-500 leading-relaxed">
                Our approach is rooted in community participation and empowerment. We work closely
                with local leaders, organizations, and beneficiaries to ensure our solutions are
                culturally appropriate, sustainable, and impactful.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group/link"
              >
                Our story
                <ChevronRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Knowledge Hub ─── */}
      <section className="py-24 md:py-36 bg-surface-50 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-20 max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-primary"></div>
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Insights & Stories</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Knowledge Hub</h2>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 mt-4 md:mt-0"
            >
              View all articles <ArrowRight size={18} />
            </Link>
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
              excerpt="Learn about our advocacy efforts to ensure women's voices are heard in climate policy decisions."
              link="/article/2"
            />
            <BlogCard
              image="/images/backgrounds/womenEngineering.jpg"
              category="Stories from the Field"
              title="Engineering for Empathy: Designing with Women at the Center"
              excerpt="Discover our human-centered design approach, ensuring our solutions truly serve the community."
              link="/article/3"
            />
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary font-semibold"
            >
              View all articles <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Partners ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-gray-300"></div>
              <span className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Trusted By</span>
              <div className="w-10 h-[2px] bg-gray-300"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Our Partners</h2>
          </div>

          {/* Infinite marquee */}
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee gap-16 md:gap-24 w-max">
              {[...partners, ...partners].map(({ src, alt }, i) => (
                <div key={`${src}-${i}`} className="flex-shrink-0 flex items-center grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500">
                  <img src={src} alt={alt} className="h-48 md:h-60 w-auto max-w-[600px] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Be part of the <span className="text-primary">solution</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Together, we can build climate-resilient communities where every woman and girl has the tools and support to thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="px-10 py-4 text-base shadow-glow-lg hover:shadow-glow transition-shadow">
                  Get Involved
                </Button>
              </Link>
              <Link to="/programs">
                <button className="px-10 py-4 rounded-full font-medium text-base text-white border border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  View Programs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home