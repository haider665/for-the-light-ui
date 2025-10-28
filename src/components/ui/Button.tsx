import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline'
}

const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const baseClasses = 'px-6 py-2.5 rounded-full font-medium transition-all duration-200'
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-gray-900',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button