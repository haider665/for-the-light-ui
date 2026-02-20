import { useEffect, useState, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/dashboard/Sidebar'
import api from '../config/api'
import { Search, Check, X, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

type Incident = {
    id: number
    title: string
    description: string
    status: string
    location: {
        division?: string
        district?: string
        upazila?: string
        divisionCode?: string
        districtCode?: string
        upazilaCode?: string
        lat?: number
        lng?: number
    }
    images: string[]
    userId: number
    userName: string
    createdAt: string
    updatedAt: string
}

const VALID_STATUSES = ['DRAFT', 'SUBMITTED', 'NEW', 'PENDING_FOR_APPROVAL', 'SERVICE_REQUESTED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED', 'CLOSED'] as const
type IncidentStatus = typeof VALID_STATUSES[number]

function fmtDate(iso?: string) {
    if (!iso) return ''
    const d = new Date(iso)
    if (isNaN(d.getTime())) return iso
    return new Intl.DateTimeFormat(undefined, {
        year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
    }).format(d)
}

const statusStyles: Record<string, string> = {
    DRAFT: 'bg-slate-100 text-slate-600',
    SUBMITTED: 'bg-teal-100 text-teal-800',
    NEW: 'bg-blue-100 text-blue-800',
    PENDING_FOR_APPROVAL: 'bg-amber-100 text-amber-800',
    SERVICE_REQUESTED: 'bg-purple-100 text-purple-800',
    IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
    RESOLVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    CLOSED: 'bg-gray-200 text-gray-700',
    PENDING: 'bg-orange-100 text-orange-800',
}

const StatusPill = ({ status }: { status: string }) => (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusStyles[status] ?? 'bg-gray-100 text-gray-800'}`}>
        {status}
    </span>
)

const IncidentManagement = () => {
    const { user: currentUser } = useAuth()
    const [incidents, setIncidents] = useState<Incident[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('ALL')
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editingStatus, setEditingStatus] = useState<IncidentStatus>('NEW')
    const [updating, setUpdating] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const isSuperAdmin = currentUser?.roles?.includes('SUPER_ADMIN')

    const fetchIncidents = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await api.get('/incident/all')
            setIncidents(res.data)
        } catch (e: any) {
            setError(e?.message || 'Failed to load incidents')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isSuperAdmin) {
            fetchIncidents()
        }
    }, [isSuperAdmin])

    const filteredIncidents = useMemo(() => {
        let list = incidents
        if (statusFilter !== 'ALL') {
            list = list.filter(i => i.status === statusFilter)
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            list = list.filter(i =>
                i.title.toLowerCase().includes(term) ||
                i.userName.toLowerCase().includes(term) ||
                i.status.toLowerCase().includes(term) ||
                i.id.toString().includes(term)
            )
        }
        return list
    }, [incidents, searchTerm, statusFilter])

    const startEditing = (incident: Incident) => {
        setEditingId(incident.id)
        setEditingStatus((VALID_STATUSES.includes(incident.status as IncidentStatus)
            ? incident.status
            : 'NEW') as IncidentStatus)
        setSuccessMessage(null)
    }

    const cancelEditing = () => {
        setEditingId(null)
    }

    const saveStatus = async (id: number) => {
        setUpdating(true)
        setError(null)
        setSuccessMessage(null)
        try {
            await api.post(`/incident/${id}/status`, { status: editingStatus })
            setSuccessMessage(`Incident #${id} status updated to ${editingStatus}.`)
            setEditingId(null)
            await fetchIncidents()
        } catch (e: any) {
            setError(e?.response?.data?.message || e?.message || 'Failed to update status')
        } finally {
            setUpdating(false)
        }
    }

    const locationLabel = (loc?: Incident['location']) => {
        if (!loc) return '—'
        const parts = [loc.upazila, loc.district, loc.division].filter(Boolean)
        return parts.length ? parts.join(', ') : '—'
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
                    <section className="flex-1 min-w-0">

                        {/* Mobile quick links */}
                        <div className="md:hidden mb-4 flex flex-wrap gap-2">
                            <Link to="/dashboard" className="px-3 py-2 rounded-md border border-gray-300">Dashboard</Link>
                            <Link to="/users" className="px-3 py-2 rounded-md border border-gray-300">Users</Link>
                            <Link to="/admin/programs" className="px-3 py-2 rounded-md border border-gray-300">Programs</Link>
                        </div>

                        {/* Header */}
                        <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold">Incident Management</h1>
                                <p className="text-gray-600 text-sm">Review and update incident statuses</p>
                            </div>
                            <button
                                onClick={fetchIncidents}
                                className="px-3 py-2 rounded-md border"
                                disabled={loading}
                            >
                                {loading ? 'Refreshing…' : 'Refresh'}
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="mb-4 flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by ID, title, user, or status…"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-md"
                                />
                            </div>
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={e => setStatusFilter(e.target.value)}
                                    className="appearance-none pl-3 pr-8 py-2 border rounded-md bg-white text-sm"
                                >
                                    <option value="ALL">All Statuses</option>
                                    {VALID_STATUSES.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
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

                        {/* Table */}
                        <div className="overflow-x-auto rounded-lg border">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Reported By</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Created At</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {loading && (
                                        <tr>
                                            <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>Loading…</td>
                                        </tr>
                                    )}
                                    {!loading && filteredIncidents.length === 0 && (
                                        <tr>
                                            <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>
                                                {searchTerm || statusFilter !== 'ALL'
                                                    ? 'No incidents match your filters.'
                                                    : 'No incidents yet.'}
                                            </td>
                                        </tr>
                                    )}
                                    {filteredIncidents.map(incident => {
                                        const isEditing = editingId === incident.id
                                        return (
                                            <tr key={incident.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    <Link
                                                        to={`/incidents/${incident.id}`}
                                                        className="font-medium text-blue-600 hover:underline"
                                                    >
                                                        #{incident.id}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900 max-w-[200px] truncate" title={incident.title}>
                                                    {incident.title}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-700">{incident.userName}</td>
                                                <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {locationLabel(incident.location)}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {isEditing ? (
                                                        <div className="relative">
                                                            <select
                                                                value={editingStatus}
                                                                onChange={e => setEditingStatus(e.target.value as IncidentStatus)}
                                                                className="appearance-none pl-2 pr-7 py-1 border rounded-md bg-white text-xs"
                                                            >
                                                                {VALID_STATUSES.map(s => (
                                                                    <option key={s} value={s}>{s}</option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                                                        </div>
                                                    ) : (
                                                        <StatusPill status={incident.status} />
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {fmtDate(incident.createdAt)}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {isEditing ? (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => saveStatus(incident.id)}
                                                                disabled={updating}
                                                                className="px-2 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                                                            >
                                                                {updating ? 'Saving…' : 'Save'}
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
                                                            onClick={() => startEditing(incident)}
                                                            className="px-2 py-1 text-xs rounded border hover:bg-gray-50"
                                                        >
                                                            Update Status
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
                            Showing {filteredIncidents.length} of {incidents.length} incidents
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default IncidentManagement
