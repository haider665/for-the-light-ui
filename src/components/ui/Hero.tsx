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
    <section className={`relative py-24 md:py-40 min-h-[85vh] md:min-h-screen flex items-center overflow-hidden ${backgroundImage ? 'text-white' : 'bg-gray-50'}`}>
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
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 z-10"></div>
        </>
      )}
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl z-10 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-10 animate-float-delayed"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">{title}</h1>
          </div>
          {subtitle && (
            <div className="animate-slide-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <p className="text-lg sm:text-xl md:text-2xl mb-10 opacity-80 max-w-3xl mx-auto leading-relaxed font-light">{subtitle}</p>
            </div>
          )}
          <div className="animate-slide-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
            {children}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      {backgroundImage && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
      )}
    </section>
  )
}

export default Hero