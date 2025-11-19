import Card from './Card'

interface StatCardProps {
  value: string
  label: string
}

const StatCard = ({ value, label }: StatCardProps) => {
  return (
    <Card className="text-center bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-gray-100">
      <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">{value}</div>
      <div className="text-xl font-semibold text-gray-700">{label}</div>
    </Card>
  )
}

export default StatCard