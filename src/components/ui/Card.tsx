import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  )
}

export default Card