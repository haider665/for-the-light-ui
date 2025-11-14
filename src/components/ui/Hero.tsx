import { ReactNode } from 'react'

interface HeroProps {
  title: string
  subtitle?: string
  children?: ReactNode
  backgroundImage?: string
  overlay?: boolean
}

const Hero = ({ title, subtitle, children, backgroundImage, overlay = true }: HeroProps) => {
  return (
    <section className={`relative py-32 md:py-48 min-h-screen flex items-center overflow-hidden ${backgroundImage ? 'text-white' : 'bg-gray-50'}`}>
      {backgroundImage && (
        <div 
          className="absolute inset-0 animate-zoom"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      )}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      )}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl mb-8 opacity-90">{subtitle}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}

export default Hero