import { ReactNode } from 'react'
import Card from './Card'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description?: string
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && <p className="text-gray-600">{description}</p>}
    </Card>
  )
}

export default FeatureCard