import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react'
import { useEffect } from 'react'

const ArticleDetail = () => {
  const { id } = useParams()

  // Scroll to top when article ID changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // Sample article data - in production, this would come from an API or database
  const articles: { [key: string]: any } = {
    '1': {
      title: 'The Resilience Loop: How Technology Empowers Women in Coastal Bangladesh',
      category: 'Technology & Innovation',
      author: 'Aisha Rahman',
      date: 'November 15, 2025',
      readTime: '8 min read',
      image: "/images/backgrounds/communityLearning.jpg",
      content: `
        <p class="lead">In the heart of Bangladesh's coastal regions, climate change is not a distant threat—it's a daily reality. Rising sea levels, devastating cyclones, and unpredictable weather patterns threaten the lives and livelihoods of millions, particularly women and girls who bear the brunt of climate vulnerability.</p>

        <h2>The Challenge</h2>
        <p>Coastal communities in Bangladesh face a triple crisis: climate vulnerability, energy poverty, and gender inequality. Women in these regions often lack access to early warning systems, clean energy, and economic opportunities. When disasters strike, they are the last to receive help and the first to suffer the consequences.</p>

        <p>Traditional approaches to climate adaptation have often overlooked the specific needs of women, creating a gap in both protection and empowerment. This is where technology becomes not just a tool, but a lifeline.</p>

        <h2>The Guardian: A Technological Lifeline</h2>
        <p>Our flagship innovation, The Guardian, represents a paradigm shift in climate adaptation technology. This wearable device provides:</p>

        <ul>
          <li><strong>Early Warning Alerts:</strong> Real-time notifications about extreme weather events, giving women precious time to protect themselves and their families.</li>
          <li><strong>Solar-Powered Resilience:</strong> Independent energy source that works even when the grid fails, ensuring continuous protection.</li>
          <li><strong>Information Access:</strong> Connection to critical resources, emergency services, and community networks.</li>
          <li><strong>Empowerment Through Technology:</strong> Digital literacy and technical skills that open new economic opportunities.</li>
        </ul>

        <h2>Real Impact, Real Stories</h2>
        <p>The impact of technology goes beyond numbers. In the village of Khulna, Fatima, a 32-year-old mother of three, received her Guardian device six months ago. "Before, I would worry every day during monsoon season," she shares. "Now, I receive alerts hours before storms arrive. I can prepare my family, secure our home, and even help my neighbors."</p>

        <p>But Fatima's story doesn't end there. Through our training program, she learned to install and maintain solar panels, becoming a certified solar technician. Today, she provides clean energy solutions to her entire community, earning a sustainable income while combating climate change.</p>

        <h2>The Ripple Effect</h2>
        <p>Technology empowerment creates what we call the "resilience loop":</p>

        <ol>
          <li><strong>Protection:</strong> Women receive tools to protect themselves from climate threats</li>
          <li><strong>Training:</strong> They learn technical skills, becoming technology providers</li>
          <li><strong>Economic Empowerment:</strong> New skills create income opportunities</li>
          <li><strong>Community Impact:</strong> Empowered women lift entire communities</li>
          <li><strong>Sustainable Change:</strong> Economic independence enables continued adaptation</li>
        </ol>

        <h2>Scaling the Solution</h2>
        <p>Our model proves that technology, when designed with women at the center, can break cycles of vulnerability. We've deployed Guardian devices to over 5,000 women across coastal Bangladesh, trained 500+ women entrepreneurs in green technology, and reduced carbon emissions by thousands of tons.</p>

        <p>But this is just the beginning. Climate change is accelerating, and so must our response. We're continuously improving The Guardian, expanding our training programs, and building partnerships to reach more vulnerable communities.</p>

        <h2>Join the Movement</h2>
        <p>Technology empowerment is not charity—it's investment in humanity's future. Every woman we train becomes a climate warrior, every device we deploy saves lives, and every community we serve becomes more resilient.</p>

        <p>The resilience loop continues to grow, but it needs your support. Whether through donations, partnerships, or spreading awareness, you can be part of this transformation.</p>

        <blockquote>
          "Technology gave me more than protection—it gave me purpose. Now I protect my community." 
          <footer>— Fatima, Solar Technician and Guardian User</footer>
        </blockquote>

        <p>Together, we can ensure that no woman faces climate change alone. Together, we build resilience, one community at a time.</p>
      `,
    },
    '2': {
      title: "From Fatima to Policy: Amplifying Women's Voices",
      category: 'Policy & Advocacy',
      author: 'Rohan Khan',
      date: 'November 12, 2025',
      readTime: '6 min read',
      image: "/images/backgrounds/fatima.jpg",
      content: `
        <p class="lead">Policy change begins with people. In Bangladesh, the voices of women in vulnerable communities are transforming how we approach climate adaptation and gender equality at the policy level.</p>

        <h2>The Power of Lived Experience</h2>
        <p>Fatima's journey from a climate-vulnerable mother to a solar technician and community leader exemplifies why grassroots voices must shape policy. Her experience navigating climate threats, energy poverty, and gender barriers provides insights no policy paper can capture.</p>

        <p>When Fatima speaks at forums, when she testifies before policymakers, when she shares her transformation—she doesn't just tell her story. She represents thousands of women whose voices have been historically excluded from decision-making processes.</p>

        <h2>Building Advocacy Infrastructure</h2>
        <p>Our policy work focuses on three pillars:</p>

        <h3>1. Community Voice Amplification</h3>
        <p>We train women like Fatima in advocacy skills, helping them articulate their experiences and needs to policymakers. These women become powerful advocates, bringing authenticity and urgency to policy discussions.</p>

        <h3>2. Evidence-Based Policy Research</h3>
        <p>We collect data from our programs, documenting impact and identifying systemic barriers. This evidence strengthens policy recommendations and demonstrates what works.</p>

        <h3>3. Strategic Partnerships</h3>
        <p>We collaborate with government agencies, international organizations, and local NGOs to create policy change at multiple levels.</p>

        <h2>Key Policy Achievements</h2>
        <p>Through persistent advocacy, we've achieved significant policy milestones:</p>

        <ul>
          <li>Integration of gender-responsive climate adaptation in district-level planning</li>
          <li>Recognition of women as climate technology providers, not just beneficiaries</li>
          <li>Allocation of resources for women-led green entrepreneurship</li>
          <li>Inclusion of community voices in national climate policy development</li>
        </ul>

        <h2>The Road Ahead</h2>
        <p>Policy change is marathon, not sprint. We continue advocating for:</p>

        <ul>
          <li>Increased funding for gender-responsive climate programs</li>
          <li>Legal protections for women in climate-vulnerable regions</li>
          <li>Integration of technology access in climate adaptation strategies</li>
          <li>Recognition of women's unpaid climate adaptation labor</li>
        </ul>

        <p>Every policy victory represents lives saved, opportunities created, and communities empowered. From Fatima to policy halls, women's voices are reshaping Bangladesh's climate future.</p>
      `,
    },
    '3': {
      title: 'Engineering for Empathy: Designing with Women at the Center',
      category: 'Stories from the Field',
      author: 'Fatima Chowdhury',
      date: 'November 8, 2025',
      readTime: '7 min read',
      image: "/images/backgrounds/womenEngineering.jpg",
      content: `
        <p class="lead">Great technology isn't just functional—it's empathetic. Our human-centered design approach ensures that every solution we create truly serves the women who need it most.</p>

        <h2>Why Human-Centered Design Matters</h2>
        <p>Traditional technology development often follows a top-down approach: engineers design solutions based on assumptions, then deploy them to users. This approach fails vulnerable communities because it overlooks cultural context, daily realities, and genuine needs.</p>

        <p>We flip this model. Women aren't our users—they're our co-designers.</p>

        <h2>The Design Process</h2>
        
        <h3>1. Deep Community Engagement</h3>
        <p>Before designing anything, we spend months in communities. We observe daily routines, understand challenges, and build trust. This immersion reveals insights that surveys never capture.</p>

        <h3>2. Co-Creation Workshops</h3>
        <p>We facilitate design workshops where women sketch, prototype, and critique solutions. Their feedback shapes every feature, from device size to color choices to interface design.</p>

        <h3>3. Iterative Testing</h3>
        <p>Prototypes return to communities for real-world testing. Women provide honest feedback, identifying problems we'd never anticipate. We iterate until solutions truly work.</p>

        <h3>4. Cultural Integration</h3>
        <p>Technology must fit seamlessly into existing lives. We consider cultural norms, daily schedules, and social dynamics to ensure adoption and sustained use.</p>

        <h2>Design Insights from the Field</h2>
        <p>Our co-design process revealed crucial insights:</p>

        <ul>
          <li><strong>Durability Matters:</strong> Devices must withstand harsh coastal conditions—salt water, humidity, and rough handling.</li>
          <li><strong>Simplicity is Key:</strong> Interfaces must be intuitive for users with limited digital literacy.</li>
          <li><strong>Aesthetics Count:</strong> Women wanted devices they'd be proud to wear, not stigmatizing "aid devices."</li>
          <li><strong>Community Features:</strong> Women requested ways to share alerts and coordinate community responses.</li>
          <li><strong>Maintenance Accessibility:</strong> Solutions must be locally repairable without expensive imports.</li>
        </ul>

        <h2>Beyond the Device</h2>
        <p>Human-centered design extends beyond physical products. We apply empathy to:</p>

        <ul>
          <li><strong>Training Programs:</strong> Designed around women's schedules and learning preferences</li>
          <li><strong>Business Models:</strong> Created with input from women entrepreneurs</li>
          <li><strong>Communication:</strong> Using language and channels women actually use</li>
          <li><strong>Support Systems:</strong> Built on community strengths and social networks</li>
        </ul>

        <h2>The Empathy Advantage</h2>
        <p>Engineering for empathy creates better outcomes. Our retention rates exceed 95% because solutions genuinely serve users. Women become advocates because they shaped what they use.</p>

        <p>This approach takes more time initially, but saves countless resources by avoiding solutions that don't work. More importantly, it respects and honors the wisdom and agency of the women we serve.</p>

        <blockquote>
          "They didn't just give us technology—they listened to us, respected our ideas, and created something that truly works for our lives."
          <footer>— Rashida, Community Co-Designer</footer>
        </blockquote>

        <p>Empathy isn't just nice—it's essential engineering. When we design with women at the center, we create solutions that transform lives.</p>
      `,
    },
    '4': {
      title: 'Building a Digital Lifeline: Supporting Women-Led Green Businesses',
      category: 'Green Entrepreneurship',
      author: 'Omar Faruk',
      date: 'November 5, 2025',
      readTime: '5 min read',
      image: "/images/backgrounds/womenEmpowerment.jpg",
      content: `
        <p class="lead">Green entrepreneurship is more than business—it's a movement. Our digital platform connects women entrepreneurs, provides resources, and builds a thriving ecosystem of climate solutions.</p>

        <h2>The Challenge of Isolation</h2>
        <p>Women entrepreneurs in rural Bangladesh face unique challenges: limited access to markets, isolation from peers, scarce business knowledge, and lack of financing options. These barriers prevent talented women from scaling their green businesses.</p>

        <h2>The Digital Lifeline Solution</h2>
        <p>Our digital platform creates an ecosystem where women-led green businesses can thrive:</p>

        <h3>Business Management Tools</h3>
        <ul>
          <li>Inventory tracking systems</li>
          <li>Customer management databases</li>
          <li>Financial tracking and invoicing</li>
          <li>Mobile payment integration</li>
        </ul>

        <h3>Knowledge Resources</h3>
        <ul>
          <li>Video training modules in local language</li>
          <li>Business planning templates</li>
          <li>Marketing guides</li>
          <li>Technical troubleshooting resources</li>
        </ul>

        <h3>Community Connection</h3>
        <ul>
          <li>Peer-to-peer messaging</li>
          <li>Group problem-solving forums</li>
          <li>Mentorship matching</li>
          <li>Success story sharing</li>
        </ul>

        <h3>Market Access</h3>
        <ul>
          <li>Online storefront creation</li>
          <li>Connection to bulk buyers</li>
          <li>Partnership opportunities</li>
          <li>Export facilitation</li>
        </ul>

        <h2>Real Business Impact</h2>
        <p>Women using our platform report:</p>

        <ul>
          <li>65% increase in monthly income</li>
          <li>3x customer base expansion</li>
          <li>85% improvement in business confidence</li>
          <li>Successful expansion into new service areas</li>
        </ul>

        <h2>Success Stories</h2>
        <p>Nasrin started as a single solar technician. Through the platform, she connected with other entrepreneurs, learned business skills, and now manages a team of five women serving 200+ households. Her business grew 400% in 18 months.</p>

        <p>The platform didn't just provide tools—it provided community. Nasrin found mentors, collaborated with peers, and accessed markets she never knew existed.</p>

        <h2>Scaling the Ecosystem</h2>
        <p>We're expanding the platform to include:</p>

        <ul>
          <li>Microfinancing connections</li>
          <li>Certification programs</li>
          <li>Government tender notifications</li>
          <li>International market access</li>
          <li>Climate finance opportunities</li>
        </ul>

        <h2>The Future is Green and Female</h2>
        <p>Women-led green businesses aren't just good for gender equality—they're essential for climate action. Women entrepreneurs show higher commitment to sustainability, community benefit, and long-term thinking.</p>

        <p>By supporting these businesses digitally, we're building an army of climate warriors who earn while they heal the planet.</p>

        <blockquote>
          "The platform connected me to opportunities I never dreamed possible. Now I'm not just surviving—I'm thriving."
          <footer>— Nasrin, Green Entrepreneur</footer>
        </blockquote>

        <p>Every woman who succeeds in green entrepreneurship creates ripples—jobs for others, cleaner energy for communities, and hope for a sustainable future.</p>
      `,
    },
  }

  const article = articles[id || '1'] || articles['1']

  return (
    <>
      {/* Article Hero */}
      <section className="relative pt-32 pb-20 bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${article.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Library</span>
            </Link>
            
            <span className="inline-block px-4 py-2 bg-primary/90 text-white text-sm font-semibold rounded-full mb-6">
              {article.category}
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share Section */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Share this article:</p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Facebook
                </button>
                <button className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                  Twitter
                </button>
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(articles)
                .filter(([key]) => key !== id)
                .slice(0, 3)
                .map(([key, relatedArticle]) => (
                  <Link
                    key={key}
                    to={`/article/${key}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-primary font-semibold">
                        {relatedArticle.category}
                      </span>
                      <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-primary transition-colors">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{relatedArticle.readTime}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ArticleDetail
