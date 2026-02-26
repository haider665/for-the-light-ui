import { useEffect, useState, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/dashboard/Sidebar'
import api from '../config/api'
import { Search, Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export type User = {
    id: number
    email: string
    name: string
    picture?: string
    roles: string[]
    createdAt: string
    lastLogin: string
}

const AVAILABLE_ROLES = ['USER', 'ADMIN', 'AUTHOR', 'SUPER_ADMIN']

function fmtDate(iso?: string) {
    if (!iso) return ''
    const d = new Date(iso)
    if (isNaN(d.getTime())) return iso
    return new Intl.DateTimeFormat(undefined, {
        year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    }).format(d)
}

const Users = () => {
    const { user: currentUser } = useAuth()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [editingUserId, setEditingUserId] = useState<number | null>(null)
    const [editingRoles, setEditingRoles] = useState<string[]>([])
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [updating, setUpdating] = useState(false)

    const isSuperAdmin = currentUser?.roles?.includes('SUPER_ADMIN')

    const fetchUsers = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await api.get('/user/all')
            setUsers(res.data)
        } catch (e: any) {
            setError(e?.message || 'Failed to load users')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isSuperAdmin) {
            fetchUsers()
        }
    }, [isSuperAdmin])

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users
        const term = searchTerm.toLowerCase()
        return users.filter(u =>
            u.email.toLowerCase().includes(term) ||
            u.name.toLowerCase().includes(term) ||
            u.roles.some(r => r.toLowerCase().includes(term)) ||
            u.id.toString().includes(term)
        )
    }, [users, searchTerm])

    const startEditing = (user: User) => {
        setEditingUserId(user.id)
        setEditingRoles([...user.roles])
        setSuccessMessage(null)
    }

    const cancelEditing = () => {
        setEditingUserId(null)
        setEditingRoles([])
    }

    const toggleRole = (role: string) => {
        if (editingRoles.includes(role)) {
            setEditingRoles(editingRoles.filter(r => r !== role))
        } else {
            setEditingRoles([...editingRoles, role])
        }
    }

    const saveRoles = async (userId: number) => {
        setUpdating(true)
        setError(null)
        setSuccessMessage(null)
        try {
            await api.post(`/user/${userId}/roles`, {
                userId,
                roles: editingRoles
            })
            setSuccessMessage('Roles updated successfully!')
            setEditingUserId(null)
            setEditingRoles([])
            // Refresh the user list
            await fetchUsers()
        } catch (e: any) {
            setError(e?.response?.data?.message || e?.message || 'Failed to update roles')
        } finally {
            setUpdating(false)
        }
    }

    if (!isSuperAdmin) {
        return (
            <main className="pt-24">
                <div className="container mx-auto px-4">
                    <div className="p-6 bg-yellow-50 text-yellow-800 rounded-md">
                        Access denied. This page is only accessible to super administrators.
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="pt-24">
            <div className="container mx-auto px-4">
                <div className="flex gap-6">
                    <Sidebar />
                    <section className="flex-1">
                        <div className="md:hidden mb-4 flex flex-wrap gap-2">
                            <Link to="/dashboard" className="px-3 py-2 rounded-md border border-gray-300">Dashboard</Link>
                            <Link to="/admin/programs" className="px-3 py-2 rounded-md border border-gray-300">Programs</Link>
                        </div>

                        <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold">User Management</h1>
                                <p className="text-gray-600 text-sm">Manage user roles and permissions</p>
                            </div>
                            <button
                                onClick={fetchUsers}
                                className="px-3 py-2 rounded-md border"
                                disabled={loading}
                            >
                                {loading ? 'Refreshing…' : 'Refresh'}
                            </button>
                        </div>

                        {/* Search */}
                        <div className="mb-4 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by ID, email, name, or role..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-md"
                            />
                        </div>

                        {/* Success Message */}
                        {successMessage && (
                            <div className="mb-4 p-3 rounded-md bg-green-50 text-green-700 text-sm flex items-center gap-2">
                                <Check size={16} />
                                {successMessage}
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm flex items-center gap-2">
                                <X size={16} />
                                {error}
                            </div>
                        )}

                        {/* Users Table */}
                        <div className="overflow-x-auto rounded-lg border">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Roles</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Created At</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Last Login</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {loading && (
                                        <tr>
                                            <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>Loading...</td>
                                        </tr>
                                    )}
                                    {!loading && filteredUsers.length === 0 && (
                                        <tr>
                                            <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>
                                                {searchTerm ? 'No users found matching your search.' : 'No users yet.'}
                                            </td>
                                        </tr>
                                    )}
                                    {filteredUsers.map((user) => {
                                        const isEditing = editingUserId === user.id
                                        const isSuperAdminUser = user.roles.includes('SUPER_ADMIN')
                                        const isReadOnly = isSuperAdminUser

                                        return (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-900">{user.id}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900">{user.email}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    {isEditing ? (
                                                        <div className="flex flex-wrap gap-2">
                                                            {AVAILABLE_ROLES.map(role => (
                                                                <label key={role} className="flex items-center gap-1 cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={editingRoles.includes(role)}
                                                                        onChange={() => toggleRole(role)}
                                                                        className="rounded"
                                                                    />
                                                                    <span className="text-xs">{role}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-wrap gap-1">
                                                            {user.roles.map(role => (
                                                                <span
                                                                    key={role}
                                                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                                                >
                                                                    {role}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{fmtDate(user.createdAt)}</td>
                                                <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{fmtDate(user.lastLogin)}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    {isReadOnly ? (
                                                        <span className="text-xs text-gray-500 italic">Read-only</span>
                                                    ) : isEditing ? (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => saveRoles(user.id)}
                                                                disabled={updating}
                                                                className="px-2 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                                                            >
                                                                {updating ? 'Saving...' : 'Save'}
                                                            </button>
                                                            <button
                                                                onClick={cancelEditing}
                                                                disabled={updating}
                                                                className="px-2 py-1 text-xs rounded border hover:bg-gray-50 disabled:opacity-50"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => startEditing(user)}
                                                            className="px-2 py-1 text-xs rounded border hover:bg-gray-50"
                                                        >
                                                            Edit Roles
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 text-sm text-gray-600">
                            Showing {filteredUsers.length} of {users.length} users
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Users
