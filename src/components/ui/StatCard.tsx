import Card from './Card'

interface StatCardProps {
  value: string
  label: string
}

const StatCard = ({ value, label }: StatCardProps) => {
  return (
    <Card className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{value}</div>
      <div className="text-lg text-gray-700">{label}</div>
    </Card>
  )
}

export default StatCard