import { Link, useLocation } from 'react-router-dom'
import { FilePlus, List, Users as UsersIcon, Calendar } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const itemBase = 'flex items-center gap-2 px-3 py-2 rounded-md transition-colors'
  const active = 'bg-gray-100 text-gray-900'
  const inactive = 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'

  const isSuperAdmin = user?.roles?.includes('SUPER_ADMIN')

  return (
    <aside className="w-64 shrink-0 border-r bg-white h-[calc(100vh-96px)] sticky top-24">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Incidents</h2>
        <nav className="mt-3 grid gap-1">
          <Link to="/posts/new" className={`${itemBase} ${pathname === '/posts/new' ? active : inactive}`}>
            <FilePlus size={18} />
            <span>New Incident</span>
          </Link>
          <Link to="/posts" className={`${itemBase} ${pathname === '/posts' ? active : inactive}`}>
            <List size={18} />
            <span>All Incidents</span>
          </Link>
        </nav>

        {isSuperAdmin && (
          <>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-6">Admin</h2>
            <nav className="mt-3 grid gap-1">
              <Link to="/users" className={`${itemBase} ${pathname === '/users' ? active : inactive}`}>
                <UsersIcon size={18} />
                <span>User Management</span>
              </Link>
              <Link to="/admin/programs" className={`${itemBase} ${pathname === '/admin/programs' ? active : inactive}`}>
                <Calendar size={18} />
                <span>Program Management</span>
              </Link>
            </nav>
          </>
        )}
      </div>
    </aside>
  )
}

export default Sidebar