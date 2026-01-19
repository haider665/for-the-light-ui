import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { divisions, districts, upazilas } from '../data/bdLocations'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Icon, DivIcon } from 'leaflet'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

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

const StatusPill = ({ status }: { status: string }) => {
  const color = status === 'PENDING' ? 'bg-yellow-100 text-yellow-800'
    : status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800'
    : status === 'RESOLVED' ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800'
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`}>{status}</span>
}

const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const pulsingIcon = new DivIcon({
  className: 'pulsing-icon',
  html: '<span class="pulse-dot"></span>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
})

export default function IncidentDetail() {
  const { id } = useParams()
  const [item, setItem] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  useEffect(() => {
    const run = async () => {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_BASE_URL}/incident/all/${id}`)
        if (!res.ok) throw new Error(await res.text() || 'Failed to load incident')
        const json = await res.json() as Incident
        setItem(json)
      } catch (e: any) {
        setError(e?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [id])

  const locationText = useMemo(() => {
    if (!item?.location) return ''
    const upazilaName = item.location.upazila || codeToUpazilaName(item.location.upazilaCode)
    const districtName = item.location.district || codeToDistrictName(item.location.districtCode)
    const divisionName = item.location.division || codeToDivisionName(item.location.divisionCode)
    return [upazilaName, districtName, divisionName].filter(Boolean).join(', ')
  }, [item])

  if (loading) {
    return <main className="pt-24"><div className="container mx-auto px-4"><p>Loading…</p></div></main>
  }
  if (error) {
    return <main className="pt-24"><div className="container mx-auto px-4"><p className="text-red-600">{error}</p></div></main>
  }
  if (!item) {
    return <main className="pt-24"><div className="container mx-auto px-4"><p>No incident found.</p></div></main>
  }

  const heroImage = item.images?.[0] || '/images/temp/test.png'

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/incidents" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6">
            <ArrowLeft size={20} />
            <span>Back to Incidents</span>
          </Link>

          {/* Title + status */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold">{item.title}</h1>
            <StatusPill status={item.status} />
          </div>
          <div className="text-sm text-gray-500 mb-6">Reported by {item.userName} • {new Date(item.createdAt).toLocaleString()}</div>

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-8">
            <p>{item.description}</p>
          </div>

          {/* Location + Map */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-2">Location</h2>
            <div className="text-gray-700">{locationText || '—'}</div>
            {item.location?.lat && item.location?.lng && (
              <div className="mt-3 text-sm text-gray-600">GPS: {item.location.lat.toFixed(6)}, {item.location.lng.toFixed(6)}</div>
            )}
            {item.location?.lat && item.location?.lng && (
              <div className="mt-4 h-80 w-full rounded-md overflow-hidden border">
                <style>{`
                  .pulse-dot { width: 12px; height: 12px; border-radius: 9999px; background: #3b82f6; box-shadow: 0 0 0 rgba(59,130,246,0.7); animation: pulse 2s infinite; display: inline-block; }
                  @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.7); } 70% { box-shadow: 0 0 0 20px rgba(59,130,246,0); } 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); } }
                `}</style>
                <MapContainer
                  center={[item.location.lat, item.location.lng]}
                  zoom={10}
                  minZoom={6}
                  maxZoom={18}
                  preferCanvas={true}
                  inertia={true}
                  wheelDebounceTime={80}
                  wheelPxPerZoomLevel={120}
                  zoomAnimation={true}
                  markerZoomAnimation={true}
                  fadeAnimation={true}
                  doubleClickZoom={false}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                  <Marker position={[item.location.lat, item.location.lng]} icon={markerIcon} />
                  <Marker position={[item.location.lat, item.location.lng]} icon={pulsingIcon} />
                </MapContainer>
              </div>
            )}
          </div>

          {/* Image gallery */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {item.images?.length ? (
                item.images.map((img, idx) => (
                  <div key={idx} className="aspect-video bg-gray-100 overflow-hidden rounded-lg">
                    <img src={img} alt={`${item.title} ${idx+1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-gray-600">No images provided.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
