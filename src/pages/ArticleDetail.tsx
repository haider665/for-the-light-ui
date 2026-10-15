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
    '7': {
      title: 'Taking Bangladeshi Climate Innovation to the Global Stage in the Philippines',
      category: 'Stories from the Field',
      author: 'For The Light Team',
      date: 'August 2026',
      readTime: '7 min read',
      image: '/images/climate_justice_camp/cjc.jpg',
      content: `
        <p class="lead">August 2026 marked a transformative organizational milestone for For The Light. Representing Bangladesh at the prestigious Climate Justice Camp (CJC) in Cebu, Philippines, Founder &amp; CEO Alamin Pranto and Chief Technology Officer Mofiz Mojib Haider embarked on a defining international journey. This was not merely a diplomatic visit; it was a powerful demonstration of organizational strength, bridging the stark realities of frontline climate vulnerability with global, tech-driven strategies.</p>

        <p>The leadership duo arrived with a clear mandate: to assert that the Global South does not just need climate funding; it needs technological sovereignty. They aimed to showcase how For The Light's civic technology and zero-budget scaling strategies are empowering the most vulnerable coastal communities. What unfolded over those intense days was a monumental achievement for the startup, characterized by deep philosophical reflections, engineering breakthroughs on the global stage, and the forging of an unstoppable cross-border network.</p>

        <h2>A Philosophical Arrival: Confronting Climate Fatalism</h2>
        <p>The journey began with the standard anxieties of international travel. Alamin and Haider arrived carrying a heavy folder of bureaucratic necessities — hotel bookings, bank statements, and return tickets — mentally preparing for rigorous immigration checks.</p>

        <p>Instead, their experience at the Cebu airport set a profound, reflective tone for the entire camp. An immigration officer, reviewing their credentials as climate innovators, bypassed the financial documents. He sighed heavily and asked, "Sir, do these climate camps actually change anything? I went to one once with so much hope, but nothing seems to change."</p>

        <p>The founders offered the only honest answer a climate innovator can give: <em>"Hope is what keeps us alive, brother. How can we ever give it up?"</em></p>

        <p>That brief, unexpected exchange starkly reminded us of the camp's true purpose. Climate fatigue and systemic fatalism form a global paralysis, stretching from the sinking coasts of Bangladesh to the busy airports of the Philippines. For The Light's core mission is to prove that systemic, grassroots change is actively happening — not just in theory, but in practice.</p>

        <h2>Project TRACE on the Global Stage: Bridging Vision and Engineering</h2>
        <p>A defining moment of the camp was For The Light taking the global stage on a specialized panel focused on grassroots funding and civic tech. The presence of both the CEO and CTO allowed for a uniquely comprehensive, dual-pronged pitch that captivated the international audience.</p>

        <p>While Alamin articulated the strategic vision — emphasizing civic-tech advocacy, community mobilization, and decentralized governance — Haider grounded the discussion in deep-tech rigor. The CTO detailed the engineering architecture behind their solutions, explaining how to build ruggedized IoT hardware, utilize Sub-GHz RF mesh networks, and bypass prohibitively expensive satellite modules.</p>

        <p>Together, they shared the ongoing success of <strong>Project TRACE</strong>. They passionately outlined For The Light's "zero-budget" scaling strategy, demonstrating that with open-source innovation, engineering resilience, and community backing, immense life-saving impact does not require immense traditional funding. The resonance was immediate. Organizers and attendees alike recognized the immense potential of replicating these localized, tech-driven architectures across other vulnerable, data-dark regions in Asia.</p>

        <h2>The Roots Network: Building a Living Infrastructure of Hope</h2>
        <p>The true magic of CJC 2026, brilliantly orchestrated by the Roots team (with immense gratitude to Sophie, Agus, Bianca, Bruno, Feli, Jo, Ro, and Sandra), was the human infrastructure it built. The For The Light delegation did not just attend sessions; they integrated into a living, rapid-response matrix of cross-border collaboration.</p>

        <p>The newly formed Alumni Directory stands as a testament to the versatility and power of this network, directly connecting the startup with critical leaders such as:</p>

        <ul>
          <li><strong>Carmi G. Macapagao</strong> (HEARD/ELAC, Philippines): Offering a masterclass in community organizing and disaster risk reduction, whose insights perfectly complement For The Light's early warning deployment strategies.</li>
          <li><strong>Raia Gallardo</strong> (Bangon Baybay / UP Diliman, Philippines): Bringing vital knowledge in marine ecology and coastal ecosystems, providing the biological context needed to optimize where For The Light places its maritime sensors.</li>
          <li><strong>Beverley Choo</strong> (GreenCheck, Singapore): Brilliantly connecting the dots between decolonization and Asian climate philanthropy to help structure allied fundraising campaigns.</li>
          <li><strong>Raya Barreiro</strong> (UMI Fund, Philippines): Teaching the vital art of "hope-based communication" to fundamentally reshape how tech startups narrate climate resilience.</li>
        </ul>

        <p>This is no longer a passive contact list; it is a rapid-response ecosystem for the planet. Whether the requirement is legal advocacy frameworks or environmental impact research, world-class expertise is now just a message away.</p>

        <h2>Culture Shocks and the "Sauce Revolution"</h2>
        <p>A global journey naturally comes with cultural trials, and adaptability is the hallmark of any successful startup. For a Bangladeshi tech delegation accustomed to rich, fiery spices, the local culinary palette presented a massive, albeit humorous, shock. From surviving on green rice and dry fish on a Firefly flight to navigating breakfast buffets of plain white rice, boiled eggs, and sausages, it was a true test of endurance.</p>

        <p>The founders' survival strategy quickly evolved into a "Sauce Revolution" — mixing Sriracha, soy sauce, ketchup, and mayonnaise into rice just to find a hint of familiar flavor. Even an attempt to escape to a local convenience store backfired when a bag of chips turned out to be seafood-flavored. Yet, these shared vulnerabilities and struggles over meals broke the ice instantly, turning international delegates into a close-knit family and proving that the best networking often happens over shared laughter at a dinner table.</p>

        <h2>Diving into the Deep End</h2>
        <p>During the trip, a friend — an award-winning filmmaker and scuba instructor — shared a video of herself swimming peacefully alongside massive Thresher and White-tip sharks in Philippine waters. It struck the founders as the perfect metaphor for their work in the climate-tech sector.</p>

        <p>There are people terrified of stepping into a shallow pool, and there are those who strap on an oxygen tank to dive into the abyss. Climate tech innovation requires the latter. Grassroots startups cannot stay in their comfort zones, bound by the fear of hardware failure, bureaucratic red tape, or a lack of traditional funding. They must dive into the deep end, trusting the global community they have built to swim alongside them.</p>

        <p>Alamin and Haider returned to Dhaka with a renewed vision, a sharpened technological roadmap, and an elevated organizational profile on the world stage. The triumphant journey to Cebu proved that the global drive for climate justice is not just a policy debate — it is a vibrant, resilient movement driven by actionable, deep-tech innovation.</p>
      `,
    },
    '6': {
      title: 'For The Light Recognized at Bangladesh Innovation Fair 2026',
      category: 'Technology & Innovation',
      author: 'For The Light Team',
      date: 'September 14, 2026',
      readTime: '6 min read',
      image: '/images/innovation_fair/innovation_fair.jpg',
      content: `
        <p class="lead">On September 14, 2026, For The Light was awarded national recognition at the Bangladesh Innovation Fair 2026 — a prestigious three-day event organized by the Ministry of Science &amp; Technology, held at Bashundhara, Dhaka. The recognition celebrates For The Light's pioneering climate-technology solutions designed to protect and empower women in coastal Bangladesh.</p>

        <h2>A National Stage for Grassroots Innovation</h2>
        <p>The Bangladesh Innovation Fair 2026, themed <em>"Innovate to Market,"</em> brought together the country's most impactful technology startups, research institutions, and social enterprises under one roof from September 12–14. The event served as a critical bridge between grassroots innovators and national policymakers, investors, and international development partners.</p>

        <p>For The Light stood among the most distinguished exhibitors — recognized not merely for technological novelty, but for the measurable human impact embedded in every solution we deploy. At the Closing Ceremony, our team received a formal Certificate of Recognition from senior officials of the Ministry of Science &amp; Technology, in acknowledgment of our work at the intersection of climate resilience, gender equity, and civic technology.</p>

        <h2>The Innovation That Earned Recognition</h2>
        <p>Our exhibition at the Innovation Fair spotlighted three flagship innovations that have transformed lives in coastal Bangladesh:</p>

        <h3>1. The Guardian — Climate Wearable for Women</h3>
        <p>The Guardian is our award-winning wearable device that provides real-time early warning alerts for extreme weather events, solar-powered independence, and digital connectivity to women in climate-vulnerable coastal districts. Deployed to over 5,000 women across Patuakhali, Barguna, and Khulna, The Guardian has fundamentally shifted how vulnerable communities receive and respond to climate threats.</p>

        <h3>2. Project TRACE — Civic Data Platform</h3>
        <p>Project TRACE (Transparency through Reporting, Advocacy, and Civic Engagement) demonstrated how 50 Digital Civic Ambassadors used our secure reporting platform to convert 128 community grievances into 60 verified, GPS-tagged infrastructure reports — directly resulting in 13 government-led physical resolutions in three months. The platform's success has since been compiled into a case study submission for global civil society alliance CIVICUS.</p>

        <h3>3. Green Entrepreneurship Digital Ecosystem</h3>
        <p>Our digital marketplace and training platform has helped over 500 women-led green businesses access tools, mentorship, micro-financing connections, and expanded markets — contributing to an average 65% increase in monthly income for participating entrepreneurs.</p>

        <h2>The Ceremony: A Moment of Collective Pride</h2>
        <p>The closing ceremony was presided over by senior officials from the Ministry of Science &amp; Technology alongside distinguished guests from academia, the private sector, and international development organizations. Representatives from For The Light received the certificate of recognition on behalf of the entire network of Digital Civic Ambassadors, women entrepreneurs, and community members whose courage and dedication make our work possible.</p>

        <p>"This recognition is not ours alone," said a For The Light representative at the ceremony. "It belongs to every woman in coastal Bangladesh who trusted us, every ambassador who gathered data in the rain, and every community that dared to demand better from their government."</p>

        <h2>What This Recognition Means</h2>
        <p>National recognition from the Ministry of Science &amp; Technology affirms that community-centered, gender-responsive technology is not a niche concern — it is a national priority. For The Light's inclusion in this prestigious forum signals growing institutional momentum behind tech-driven solutions for climate adaptation and social equity.</p>

        <p>Beyond the certificate, the Innovation Fair opened critical new doors:</p>

        <ul>
          <li>Engagement with senior policymakers for potential integration of The Guardian into national disaster preparedness frameworks</li>
          <li>Expressions of interest from technology partners for co-developing the next generation of the TRACE platform</li>
          <li>Media coverage that has significantly amplified awareness of our mission across Bangladesh</li>
          <li>New partnership discussions with national universities to scale our Digital Civic Ambassador program</li>
        </ul>

        <h2>The Road Ahead</h2>
        <p>The Bangladesh Innovation Fair 2026 is a milestone — but For The Light does not measure success in trophies. We measure it in the number of women who receive storm alerts before it is too late, in the infrastructure repaired because a young ambassador documented it precisely, and in the green businesses that grow from a single training session into thriving enterprises.</p>

        <p>With the momentum of national recognition behind us, we are accelerating plans to deploy The Guardian to 15,000 additional women by the end of 2026, expand Project TRACE to three new districts, and build new institutional partnerships that ensure our technology reaches those who need it most.</p>

        <blockquote>
          "Innovation means nothing if it does not reach the most vulnerable. This recognition reminds us why we began — and why we will not stop."
          <footer>— For The Light Team, Bangladesh Innovation Fair 2026</footer>
        </blockquote>

        <p>Thank you to the Ministry of Science &amp; Technology, to our partners, and most importantly — to the communities of coastal Bangladesh who inspire everything we do.</p>
      `,
    },
    '5': {
      title: 'From Grievance to Resolution: The Complete Data-Driven Journey of Project TRACE',
      category: 'Case Study',
      author: 'For The Light Team',
      date: 'May 28, 2026',
      readTime: '12 min read',
      image: "/images/impacts/project_trace_townhall.jpg",
      content: `
        <p class="lead">In coastal Bangladesh, local communities have long faced overlapping vulnerabilities, from decaying civic infrastructure to severe climate exposure. For generations, these challenges were compounded by a systemic "suffocating silence"—a barrier where citizen complaints remained anecdotal, fragmented, and easily ignored by bureaucratic systems. Project TRACE (Transparency through Reporting, Advocacy, and Civic Engagement) was launched by For The Light as a direct technical response to this structural gap, proving that localized grievances can be engineered into unassailable datasets that command institutional action.</p>

        <h2>Phase 1: Mobilizing the Digital Civic Ambassadors</h2>
        <p>The foundation of Project TRACE relies on human infrastructure. In early 2026, For The Light recruited and deployed a highly disciplined cohort of <strong>50 Digital Civic Ambassadors</strong> (maintaining a strict 50% gender balance) across Patuakhali. Rather than acting as casual observers, these youth leaders underwent rigorous operational training. They were instructed in digital privacy protection, secure communications, and the tactical deployment of Right to Information (RTI) applications, transforming active youth into skilled grassroots civic auditors.</p>

        <h2>Phase 2: Data Capture, Auditing, and Geospatial Verification</h2>
        <p>Equipped with our centralized, secure reporting platform, ambassadors conducted exhaustive field audits of municipal infrastructure failures. The core innovation lay in the data verification protocol:</p>

        <ol>
          <li><strong>Raw Ingestion:</strong> Over a two-month field cycle, the platform ingested 128 raw community submissions regarding public health hazards, contaminated water infrastructure, and broken transport systems.</li>
          <li><strong>Triangulation & Audit:</strong> Our backend team filtered these raw inputs against a strict verification matrix requiring distinct photographic evidence, verified GPS-tagged telemetry, and cross-referenced resident testimonies.</li>
          <li><strong>The Data Output:</strong> This meticulous process yielded <strong>60 highly verified, data-dense incident reports</strong>, mapping exact municipal failures with absolute geospatial precision. Anecdotal complaints were officially replaced by undeniable empirical evidence.</li>
        </ol>

        <h2>Phase 3: Shifting the Citizen-State Relationship via Public Advocacy</h2>
        <p>Armed with verified data, Project TRACE moved from mapping to systemic advocacy. For The Light hosted a historic, multi-stakeholder <strong>data-driven Townhall Meeting</strong> in Patuakhali. Confronted with public, hyper-localized dashboard data rather than vague emotional appeals, local government administrators, municipal authorities, and public sector decision-makers shifted from standard bureaucratic defensiveness to immediate, collaborative action.</p>

        <p>The public data pipeline proved irresistible to the press, generating prominent print and broadcast media features that validated the community's demands and placed public attention squarely on data-driven structural repairs.</p>

        <h2>The Ultimate Outcome: 13 Proven Physical Resolutions</h2>
        <p>The true metric of success for Project TRACE is measured in physical steel, concrete, and public health outcomes. Within a compressed <strong>three-month operational window</strong>, the relevant government administrative bodies actively utilized our open platform data to coordinate and execute <strong>13 critical physical infrastructure resolutions</strong>, including:</p>

        <ul>
          <li>The thorough sanitization and reclamation of the Patuakhali Sadar public pond system.</li>
          <li>Direct structural remediation of fractured transit routes and public utility safety lines.</li>
          <li>The formal resolution of localized environmental hazards directly threatening public health.</li>
        </ul>

        <h2>A Scalable Global Success Story</h2>
        <p>What began as a localized pilot in Patuakhali has now set a global standard for tech-enabled citizen engagement in the Global South. The overwhelming success of this project has been compiled into a prominent international Case Study submission for the global civil society alliance, <a href="https://www.civicus.org" target="_blank" rel="noopener noreferrer">CIVICUS</a>.</p>

        <p>The continuous deployment, hosting, and field scaling of the Project TRACE ecosystem stand as a testament to what is possible when grassroots youth innovation is integrated into powerful global accountability networks. This entire milestone initiative is proudly supported and co-funded by the <a href="https://digitaldemocracyinitiative.net" target="_blank" rel="noopener noreferrer">Digital Democracy Initiative (DDI)</a>, in profound partnership with <a href="https://www.accountabilitylab.org" target="_blank" rel="noopener noreferrer">Accountability Lab</a> and <a href="https://ddisouthasia.org" target="_blank" rel="noopener noreferrer">DDI South Asia</a>. Together, we are proving that data-driven democracy is not just a concept—it is a functional, live infrastructure that delivers real-world resilience to the people who need it most.</p>

        <blockquote>
          "Data-driven democracy is not just a concept—it is a functional, live infrastructure that delivers real-world resilience."
          <footer>— For The Light</footer>
        </blockquote>
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
          <div className="max-w-5xl mx-auto">
            <article 
              className="prose prose-lg max-w-none text-justify w-full"
              style={{ maxWidth: '100%' }}
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
