import { Link, useLocation } from 'react-router-dom'
import { FilePlus, List } from 'lucide-react'

const Sidebar = () => {
  const { pathname } = useLocation()
  const itemBase = 'flex items-center gap-2 px-3 py-2 rounded-md transition-colors'
  const active = 'bg-gray-100 text-gray-900'
  const inactive = 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'

  return (
    <aside className="w-64 shrink-0 border-r bg-white h-[calc(100vh-96px)] sticky top-24">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Posts</h2>
        <nav className="mt-3 grid gap-1">
          <Link to="/posts/new" className={`${itemBase} ${pathname === '/posts/new' ? active : inactive}`}>
            <FilePlus size={18} />
            <span>New Post</span>
          </Link>
          <Link to="/posts" className={`${itemBase} ${pathname === '/posts' ? active : inactive}`}>
            <List size={18} />
            <span>All Posts</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar