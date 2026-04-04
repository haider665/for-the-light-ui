import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Calendar, Filter } from 'lucide-react'

interface ImpactStory {
  id: number
  date: string
  year: number
  title: string
  description: string
  image: string
  tag: string
}

const impactStories: ImpactStory[] = [
  {
    id: 1,
    date: 'January 15, 2024',
    year: 2024,
    title: 'Global SDG Partnership Launched',
    description:
      'For The Light partnered with international organizations to advance Sustainable Development Goals. This landmark collaboration set the stage for scaling our women-led green economy model across South Asia.',
    image: '/images/impacts/1. Global SDG-1.JPG',
    tag: 'Partnership',
  },
  {
    id: 2,
    date: 'February 22, 2024',
    year: 2024,
    title: 'Building a Sustainable Future Together',
    description:
      'Our second SDG summit brought together policymakers, entrepreneurs, and community leaders. Over 200 participants co-created strategies for inclusive green growth in Bangladesh.',
    image: '/images/impacts/2. Global SDG-2.JPG',
    tag: 'Partnership',
  },
  {
    id: 3,
    date: 'April 10, 2024',
    year: 2024,
    title: 'Awareness to Action: Community Education',
    description:
      'Launched "Awareness to Action" — a grassroots campaign educating rural communities on climate resilience, clean energy access, and women\'s economic empowerment.',
    image: '/images/impacts/3. Awareness to Action-1.jpg',
    tag: 'Education',
  },
  {
    id: 4,
    date: 'May 5, 2024',
    year: 2024,
    title: 'From Awareness to Real Impact',
    description:
      'Communities began implementing changes from our education programs. Local women formed cooperatives to manage solar micro-grids, transforming awareness into tangible economic impact.',
    image: '/images/impacts/4. Awareness to Action-2.jpg',
    tag: 'Community',
  },
  {
    id: 5,
    date: 'June 18, 2024',
    year: 2024,
    title: 'Youth Leadership: Driving Climate Action',
    description:
      'Young leaders from 15 districts gathered for a climate action bootcamp. They designed and pitched community projects — three of which received seed funding from our partners.',
    image: '/images/impacts/5. Awareness to Action-3.jpg',
    tag: 'Youth',
  },
  {
    id: 6,
    date: 'August 8, 2024',
    year: 2024,
    title: 'Community Knowledge Sharing Workshops',
    description:
      'Peer-to-peer learning sessions empowered women entrepreneurs to share best practices in solar technology maintenance, business management, and community organizing.',
    image: '/images/impacts/6. Awareness to Action-4.jpg',
    tag: 'Education',
  },
  {
    id: 7,
    date: 'October 12, 2024',
    year: 2024,
    title: 'Green Voice Initiative Launched',
    description:
      'Amplified environmental advocacy through storytelling. Community members documented their own climate stories, reaching over 50,000 people through social media campaigns.',
    image: '/images/impacts/7. Green Voice-2.jpg',
    tag: 'Advocacy',
  },
  {
    id: 8,
    date: 'November 20, 2024',
    year: 2024,
    title: 'Voices for Change: Leaders Speak Out',
    description:
      'Community leaders addressed national forums on climate justice, gender equality, and the urgency of transitioning to renewable energy in rural Bangladesh.',
    image: '/images/impacts/8. Green voice.jpg',
    tag: 'Advocacy',
  },
  {
    id: 9,
    date: 'January 25, 2025',
    year: 2025,
    title: 'Green Entrepreneurship Training',
    description:
      'Intensive training program equipped 120 women with skills to build and manage green businesses — from solar panel installation to eco-friendly product development.',
    image: '/images/impacts/9. Green Entrepreneurship training.jpg',
    tag: 'Training',
  },
  {
    id: 10,
    date: 'March 15, 2025',
    year: 2025,
    title: 'Renewable Energy Festival',
    description:
      'A vibrant celebration of clean energy innovation. Showcased solar-powered solutions, hosted live demos, and connected entrepreneurs with investors and policymakers.',
    image: '/images/impacts/10. Renewable energy fest.jfif',
    tag: 'Event',
  },
  {
    id: 11,
    date: 'May 8, 2025',
    year: 2025,
    title: 'Women in Energy Summit',
    description:
      'Celebrated women leading the green revolution. Trailblazers from across Bangladesh shared their journeys — from rural entrepreneurs to energy policy advocates.',
    image: '/images/impacts/11. Women in Energy.jpg',
    tag: 'Empowerment',
  },
  {
    id: 12,
    date: 'July 20, 2025',
    year: 2025,
    title: 'Program Milestone Celebration',
    description:
      'Honored the achievements of our first cohort of graduates. 95% of participants are now running their own green businesses, impacting over 5,000 households.',
    image: '/images/impacts/12. post program event.jpg',
    tag: 'Milestone',
  },
  {
    id: 13,
    date: 'September 14, 2025',
    year: 2025,
    title: 'Community Impact Through Technology',
    description:
      'Deployed next-generation solar systems in 30 remote villages. Digital monitoring enables real-time performance tracking, maximizing energy output and reliability.',
    image: '/images/impacts/IMG-20250914-WA0099.jpg',
    tag: 'Technology',
  },
  {
    id: 13,
    date: 'March 15, 2026',
    year: 2026,
    title: 'Project Trace Townhall',
    description:
      'Discussed project progress, challenges, and future plans with community stakeholders and partners.',
    image: '/images/impacts/project_trace_townhall.jpg',
    tag: 'Technology',
  },
]

const allYears = [...new Set(impactStories.map((s) => s.year))].sort()

const Impact = () => {
  const [activeStoryId, setActiveStoryId] = useState(impactStories[0].id)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const storyRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const scrollPanelRef = useRef<HTMLDivElement>(null)

  const filteredStories = useMemo(
    () => (selectedYear ? impactStories.filter((s) => s.year === selectedYear) : impactStories),
    [selectedYear],
  )

  // When year filter changes, scroll to top and activate the first story
  useEffect(() => {
    if (filteredStories.length > 0) {
      setActiveStoryId(filteredStories[0].id)
      scrollPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [filteredStories])

  const activeStory = impactStories.find((s) => s.id === activeStoryId) || impactStories[0]

  // On scroll, find the card closest to the vertical center of the scroll panel
  useEffect(() => {
    const panel = scrollPanelRef.current
    if (!panel) return

    const handleScroll = () => {
      const panelRect = panel.getBoundingClientRect()
      const panelCenter = panelRect.top + panelRect.height / 2

      let closestId: number | null = null
      let closestDist = Infinity

      storyRefs.current.forEach((el, id) => {
        const rect = el.getBoundingClientRect()
        const cardCenter = rect.top + rect.height / 2
        const dist = Math.abs(cardCenter - panelCenter)
        if (dist < closestDist) {
          closestDist = dist
          closestId = id
        }
      })

      if (closestId !== null) {
        setActiveStoryId(closestId)
      }
    }

    panel.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on mount to set initial active card
    handleScroll()

    return () => {
      panel.removeEventListener('scroll', handleScroll)
    }
  }, [filteredStories])

  const setStoryRef = useCallback((id: number) => (el: HTMLDivElement | null) => {
    if (el) storyRefs.current.set(id, el)
    else storyRefs.current.delete(id)
  }, [])

  const tagColors: Record<string, string> = {
    Partnership: 'bg-blue-100 text-blue-700',
    Education: 'bg-amber-100 text-amber-700',
    Community: 'bg-green-100 text-green-700',
    Youth: 'bg-purple-100 text-purple-700',
    Advocacy: 'bg-rose-100 text-rose-700',
    Training: 'bg-cyan-100 text-cyan-700',
    Event: 'bg-orange-100 text-orange-700',
    Empowerment: 'bg-pink-100 text-pink-700',
    Milestone: 'bg-emerald-100 text-emerald-700',
    Technology: 'bg-indigo-100 text-indigo-700',
  }

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-14 md:mb-20">
            <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">
              Making a Difference
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-8">Our Impact</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              At For The Light, we're committed to creating a sustainable and equitable future for
              women in Bangladesh. Our innovative approach combines green technology with a women-led
              economic model, empowering communities and driving positive change.
            </p>
          </div>

          {/* The Model */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-6 sm:p-8 md:p-12 mb-20 md:mb-32 max-w-6xl mx-auto shadow-lg">
            <div className="inline-block px-4 py-2 bg-white rounded-full mb-6">
              <span className="text-sm font-semibold text-primary">Our Model</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8">The Model</h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Our model centers on a women-led green economy, where women entrepreneurs are at the
              forefront of deploying and maintaining life-saving green technologies. This approach not
              only provides access to clean energy and water but also creates economic opportunities,
              fostering independence and resilience within communities.
            </p>
          </div>
        </div>
      </section>

      {/* ── Scroll-Based Storytelling Section ── */}
      <section className="bg-white">
        {/* Section header + filter */}
        <div className="container mx-auto px-4 pt-8 pb-6 md:pt-16 md:pb-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-4">
                Visual Stories
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">Our Journey</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4">
                Scroll through our story — every milestone, every life changed
              </p>
            </div>

            {/* Year filter */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Filter size={18} className="text-gray-400" />
              <button
                onClick={() => setSelectedYear(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedYear === null
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Years
              </button>
              {allYears.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedYear === y
                      ? 'bg-primary text-white shadow-md shadow-primary/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: split sticky layout · Mobile: stacked */}
        <div className="max-w-7xl mx-auto px-4 pb-20 md:pb-32">
          {/* ===== MOBILE LAYOUT ===== */}
          <div className="md:hidden space-y-12">
            {filteredStories.map((story, idx) => (
              <div
                key={story.id}
                ref={setStoryRef(story.id)}
                data-story-id={story.id}
                className="story-card-mobile"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl mb-5 aspect-[16/10]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        tagColors[story.tag] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {story.tag}
                    </span>
                  </div>
                </div>
                {/* Text */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar size={14} />
                  {story.date}
                </div>
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-gray-600 leading-relaxed">{story.description}</p>
              </div>
            ))}
          </div>

          {/* ===== DESKTOP LAYOUT — fixed image + independently scrollable story cards ===== */}
          <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-20" style={{ height: '85vh' }}>
            {/* Left: Static image (fills its column, no scroll) */}
            <div className="relative flex items-center">
              <div
                ref={imageContainerRef}
                className="relative rounded-3xl overflow-hidden shadow-2xl w-full aspect-[4/3] transition-all duration-700"
              >
                {/* Crossfade images */}
                {impactStories.map((story) => (
                  <img
                    key={story.id}
                    src={story.image}
                    alt={story.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      activeStory.id === story.id ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Active tag overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${
                      tagColors[activeStory.tag] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {activeStory.tag}
                  </span>
                  <span className="text-white/80 text-sm font-medium bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    {filteredStories.findIndex((s) => s.id === activeStory.id) + 1} /{' '}
                    {filteredStories.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Independently scrollable timeline story cards */}
            <div ref={scrollPanelRef} className="relative pl-8 overflow-y-auto overscroll-contain pr-2 scrollbar-hide">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

              <div className="space-y-6" style={{ paddingTop: 'calc(42.5vh - 130px)', paddingBottom: 'calc(42.5vh - 130px)' }}>
                {filteredStories.map((story) => {
                  const isActive = activeStory.id === story.id
                  return (
                    <div
                      key={story.id}
                      ref={setStoryRef(story.id)}
                      data-story-id={story.id}
                      className={`relative min-h-[260px] flex items-start transition-all duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      {/* Timeline dot */}
                      <div
                        className={`absolute -left-8 top-6 w-4 h-4 rounded-full border-[3px] transition-all duration-500 ${
                          isActive
                            ? 'border-primary bg-primary scale-125 shadow-lg shadow-primary/40'
                            : 'border-gray-300 bg-white'
                        }`}
                        style={{ transform: `translateX(-50%)` }}
                      />

                      {/* Card */}
                      <div
                        className={`ml-4 rounded-2xl p-6 lg:p-8 w-full transition-all duration-500 ${
                          isActive
                            ? 'bg-white shadow-premium-lg ring-1 ring-primary/10 scale-[1.01]'
                            : 'bg-gray-50/60'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <Calendar size={14} className={isActive ? 'text-primary' : ''} />
                          <span className={isActive ? 'text-primary font-semibold' : ''}>
                            {story.date}
                          </span>
                        </div>
                        <h3
                          className={`text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 ${
                            isActive ? 'text-gray-900' : 'text-gray-600'
                          }`}
                        >
                          {story.title}
                        </h3>
                        <p
                          className={`leading-relaxed transition-all duration-500 ${
                            isActive
                              ? 'text-gray-700 max-h-40 opacity-100'
                              : 'text-gray-400 max-h-12 overflow-hidden opacity-70'
                          }`}
                        >
                          {story.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Impact