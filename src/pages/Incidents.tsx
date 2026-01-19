import { useEffect, useMemo, useState } from 'react'
import Card from '../components/ui/Card'
import { Link } from 'react-router-dom'
import { divisions, districts, upazilas } from '../data/bdLocations'
import { API_BASE_URL } from '../config/api'


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
  if (isNaN(d.getTime())) return iso || ''
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'short', day: '2-digit',
  }).format(d)
}

const StatusPill = ({ status }: { status: string }) => {
  const color = status === 'PENDING' ? 'bg-yellow-100 text-yellow-800'
    : status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800'
    : status === 'RESOLVED' ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800'
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`}>{status}</span>
}

export default function Incidents() {
  const [items, setItems] = useState<Incident[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_BASE_URL}/incident/all`)
        if (!res.ok) throw new Error(await res.text() || 'Failed to load incidents')
        const json = await res.json() as Incident[]
        setItems(json)
      } catch (e: any) {
        setError(e?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const cards = useMemo(() => {
    return items.map(it => {
      const upazilaName = it.location?.upazila || codeToUpazilaName(it.location?.upazilaCode)
      const districtName = it.location?.district || codeToDistrictName(it.location?.districtCode)
      const divisionName = it.location?.division || codeToDivisionName(it.location?.divisionCode)
      const location = [upazilaName, districtName, divisionName].filter(Boolean).join(', ')
      const image = it.images?.[0] || '/images/temp/test.png'
      return { ...it, location, image }
    })
  }, [items])

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <section className="py-8">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-semibold">All Incidents</h1>
              <p className="text-gray-600">Public feed of reported incidents</p>
            </div>
            <button onClick={() => window.location.reload()} className="px-3 py-2 rounded-md border" disabled={loading}>
              {loading ? 'Loading…' : 'Refresh'}
            </button>
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map(card => (
              <Link key={card.id} to={`/incidents/${card.id}`} className="block">
                <Card className="overflow-hidden p-0">
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 justify-between">
                      <StatusPill status={card.status} />
                      <span className="text-xs text-gray-500">{fmtDate(card.createdAt)}</span>
                    </div>
                    <h3 className="text-lg font-semibold line-clamp-2">{card.title}</h3>
                    <p className="text-sm text-gray-700 line-clamp-3">{card.description}</p>
                    <div className="text-sm text-gray-600 mt-1">{card.location || '—'}</div>
                    <div className="text-xs text-gray-500">by {card.userName}</div>
                  </div>
                </Card>
              </Link>
            ))}
            {!loading && !error && cards.length === 0 && (
              <div className="col-span-full text-center text-gray-600">No incidents yet.</div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
