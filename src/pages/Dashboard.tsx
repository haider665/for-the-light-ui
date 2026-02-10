import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/dashboard/Sidebar'

function formatDate(value?: string) {
  if (!value) return '—'
  const d = new Date(value)
  return isNaN(d.getTime()) ? value : d.toLocaleString()
}

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="flex gap-6">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <section className="flex-1 min-h-[60vh]">
            {/* Mobile quick actions */}
            <div className="md:hidden mb-4 flex gap-3">
              <Link to="/posts/new" className="px-4 py-2 rounded-md bg-gray-900 text-white">New Incident</Link>
              <Link to="/posts" className="px-4 py-2 rounded-md border border-gray-300">All Incidents</Link>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center gap-6 mb-8">
                  {user?.picture && (
                    <img src={user.picture} alt={user?.name || 'User'} className="w-20 h-20 rounded-full object-cover" />
                  )}
                  <div>
                    <h1 className="text-2xl font-bold">Welcome{user?.name ? `, ${user.name}` : ''}</h1>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border rounded-xl">
                    <h2 className="font-semibold mb-2">Your Profile</h2>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><span className="font-medium">User ID:</span> {user?.id ?? '—'}</p>
                      <p><span className="font-medium">Roles:</span> {user?.roles?.length ? user.roles.join(', ') : 'none'}</p>
                      <p><span className="font-medium">Created:</span> {formatDate(user?.createdAt)}</p>
                      <p><span className="font-medium">Last Login:</span> {formatDate(user?.lastLogin)}</p>
                    </div>
                  </div>
                  <div className="p-6 border rounded-xl">
                    <h2 className="font-semibold mb-2">Quick Actions</h2>
                    <button onClick={logout} className="px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-black transition">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
