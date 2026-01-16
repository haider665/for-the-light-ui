import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Checking session…</div>
      </div>
    )
  }
  if (!user) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

export default ProtectedRoute
