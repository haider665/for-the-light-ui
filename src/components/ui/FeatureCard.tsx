import { ReactNode } from 'react'
import Card from './Card'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description?: string
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100">
      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      {description && <p className="text-gray-600 leading-relaxed">{description}</p>}
    </Card>
  )
}

export default FeatureCard