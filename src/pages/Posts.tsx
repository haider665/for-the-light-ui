import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api, { API_BASE_URL } from '../config/api'
import Sidebar from '../components/dashboard/Sidebar'

type Incident = {
  id: number
  title: string
  description: string
  status: string
  location: {
    division?: string
    district?: string
    upazila?: string
    lat?: number
    lng?: number
  }
  images: string[]
  userId: number
  userName: string
  createdAt: string
  updatedAt: string
}


function fmtDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  }).format(d)
}

const statusStyles: Record<string, string> = {
  DRAFT: 'bg-slate-100 text-slate-600',
  SUBMITTED: 'bg-teal-100 text-teal-800',
  NEW: 'bg-blue-100 text-blue-800',
  PENDING_FOR_APPROVAL: 'bg-amber-100 text-amber-800',
  SERVICE_REQUESTED: 'bg-purple-100 text-purple-800',
  PENDING: 'bg-orange-100 text-orange-800',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
  RESOLVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  CLOSED: 'bg-gray-200 text-gray-700',
}

const StatusPill = ({ status }: { status: string }) => {
  const color = statusStyles[status] ?? 'bg-gray-100 text-gray-800'
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`}>{status}</span>
}

// Allowed status transitions per current status (user-facing)
const STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['SUBMITTED', 'REJECTED'],
  SERVICE_REQUESTED: ['IN_PROGRESS', 'RESOLVED', 'REJECTED'],
  IN_PROGRESS: ['RESOLVED', 'REJECTED'],
}

const Posts = () => {
  const [data, setData] = useState<Incident[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [needsAuth, setNeedsAuth] = useState(false)

  // inline status-change state
  const [changingId, setChangingId] = useState<number | null>(null)
  const [pendingStatus, setPendingStatus] = useState<string>('')
  const [statusUpdating, setStatusUpdating] = useState(false)
  const [statusError, setStatusError] = useState<string | null>(null)
  const [statusSuccess, setStatusSuccess] = useState<string | null>(null)

  const startStatusChange = (id: number, currentStatus: string) => {
    const opts = STATUS_TRANSITIONS[currentStatus] ?? []
    setChangingId(id)
    setPendingStatus(opts[0] ?? '')
    setStatusError(null)
    setStatusSuccess(null)
  }

  const cancelStatusChange = () => {
    setChangingId(null)
    setPendingStatus('')
    setStatusError(null)
  }

  const saveStatusChange = async (id: number) => {
    if (!pendingStatus) return
    setStatusUpdating(true)
    setStatusError(null)
    setStatusSuccess(null)
    try {
      await api.post(`/incident/${id}/my-status`, { status: pendingStatus })
      setStatusSuccess(`Incident #${id} updated to ${pendingStatus}.`)
      setChangingId(null)
      await fetchData()
    } catch (e: any) {
      setStatusError(e?.response?.data?.message || e?.message || 'Failed to update status.')
    } finally {
      setStatusUpdating(false)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    setNeedsAuth(false)
    try {
      const res = await api.get('/incident/user')
      setData(res.data)
    } catch (e: any) {
      if (e.response && (e.response.status === 401 || e.response.status === 302)) {
        setNeedsAuth(true)
        setData([])
      } else {
        setError(e?.message || 'Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rows = useMemo(() => {
    return (data || []).map((it) => {
      const locParts: string[] = []
      const upazilaName = it.location?.upazila
      const districtName = it.location?.district
      const divisionName = it.location?.division
      if (upazilaName) locParts.push(upazilaName)
      if (districtName) locParts.push(districtName)
      if (divisionName) locParts.push(divisionName)
      const loc = locParts.join(', ')
      return {
        ...it,
        loc,
        created: fmtDate(it.createdAt),
        updated: fmtDate(it.updatedAt),
      }
    })
  }, [data])

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="flex gap-6">
          <Sidebar />
          <section className="flex-1">
            <div className="md:hidden mb-4 flex flex-wrap gap-2">
              <Link to="/dashboard" className="px-3 py-2 rounded-md border border-gray-300">Dashboard</Link>
              <Link to="/posts/new" className="px-3 py-2 rounded-md bg-gray-900 text-white">New Incident</Link>
            </div>

            <div className="mb-4 flex flex-wrap gap-3 items-center">
              <h1 className="text-2xl font-semibold">All Posts</h1>
              <div className="md:ml-auto flex flex-wrap gap-3">
                <button
                  onClick={fetchData}
                  className="px-3 py-2 rounded-md border"
                  disabled={loading}
                >{loading ? 'Refreshing…' : 'Refresh'}</button>
                <Link to="/posts/new" className="px-4 py-2 rounded-md bg-gray-900 text-white">New Post</Link>
              </div>
            </div>

            {needsAuth && (
              <div className="mb-4 p-3 rounded-md bg-yellow-50 text-yellow-800 text-sm">
                You need to log in to view your posts.
                <button
                  className="ml-3 underline"
                  onClick={() => (window.location.href = `${API_BASE_URL}/oauth2/authorization/google`)}
                >Login with Google</button>
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>
            )}
            {statusSuccess && (
              <div className="mb-4 p-3 rounded-md bg-green-50 text-green-700 text-sm flex items-center gap-2">
                <span>✓</span> {statusSuccess}
              </div>
            )}
            {statusError && (
              <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm">{statusError}</div>
            )}

            <div className="overflow-x-auto rounded-lg border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Created</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Updated</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {rows.length === 0 && !loading && !error && (
                    <tr>
                      <td className="px-4 py-6 text-center text-gray-500" colSpan={8}>No posts yet.</td>
                    </tr>
                  )}
                  {rows.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{r.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{r.title}</td>
                      <td className="px-4 py-3 text-sm">
                        <StatusPill status={r.status} />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.loc || '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.userName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{r.created}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{r.updated}</td>
                      <td className="px-4 py-3 text-sm">
                        {(() => {
                          const transitions = STATUS_TRANSITIONS[r.status] ?? []
                          const isChanging = changingId === r.id
                          return (
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Edit link for DRAFT */}
                              {r.status === 'DRAFT' && (
                                <Link
                                  to={`/posts/${r.id}/edit`}
                                  className="px-2 py-1 text-xs rounded border hover:bg-gray-50"
                                >
                                  Edit
                                </Link>
                              )}

                              {/* Inline status change */}
                              {transitions.length > 0 && (
                                isChanging ? (
                                  <div className="flex items-center gap-1">
                                    <select
                                      value={pendingStatus}
                                      onChange={e => setPendingStatus(e.target.value)}
                                      className="text-xs border rounded px-1 py-0.5 bg-white"
                                    >
                                      {transitions.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                      ))}
                                    </select>
                                    <button
                                      onClick={() => saveStatusChange(r.id)}
                                      disabled={statusUpdating}
                                      className="px-2 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                                    >
                                      {statusUpdating ? '…' : 'Save'}
                                    </button>
                                    <button
                                      onClick={cancelStatusChange}
                                      disabled={statusUpdating}
                                      className="px-2 py-1 text-xs rounded border hover:bg-gray-50 disabled:opacity-50"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => startStatusChange(r.id, r.status)}
                                    className="px-2 py-1 text-xs rounded border hover:bg-gray-50"
                                  >
                                    Change Status
                                  </button>
                                )
                              )}
                            </div>
                          )
                        })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Posts