import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { divisions, districts, upazilas } from '../data/bdLocations'
import api, { API_BASE_URL } from '../config/api'
import Sidebar from '../components/dashboard/Sidebar'

type Incident = {
  id: number
  title: string
  description: string
  status: string
  location: {
    // optional human-readable names if backend provides them
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


function codeToDivisionName(code?: string) {
  if (!code) return undefined
  return divisions.find(d => d.code === code)?.name || code
}
function codeToDistrictName(code?: string) {
  if (!code) return undefined
  return districts.find(d => d.code === code)?.name || code
}
function codeToUpazilaName(code?: string) {
  if (!code) return undefined
  return upazilas.find(u => u.code === code)?.name || code
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

const Posts = () => {
  const [data, setData] = useState<Incident[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [needsAuth, setNeedsAuth] = useState(false)

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
      // Prefer names provided by backend; fall back to mapping from codes
      const upazilaName = it.location?.upazila || codeToUpazilaName(it.location?.upazilaCode)
      const districtName = it.location?.district || codeToDistrictName(it.location?.districtCode)
      const divisionName = it.location?.division || codeToDivisionName(it.location?.divisionCode)
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
            <div className="mb-4 flex flex-wrap gap-3 items-center">
              <h1 className="text-2xl font-semibold">All Posts</h1>
              <div className="ml-auto flex gap-3">
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {rows.length === 0 && !loading && !error && (
                    <tr>
                      <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>No posts yet.</td>
                    </tr>
                  )}
                  {rows.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{r.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{r.title}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.loc || '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.userName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{r.created}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{r.updated}</td>
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