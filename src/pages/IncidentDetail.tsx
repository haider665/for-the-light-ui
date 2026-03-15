import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MessageSquare, Send, LogIn, Video } from 'lucide-react'
import api from '../config/api'
import { useAuth } from '../context/AuthContext'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Icon, DivIcon } from 'leaflet'


type Comment = {
  id: number
  content: string
  userId: number
  userName: string
  incidentId: number
  createdAt: string
  updatedAt: string
}

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
  videoUrl?: string
  userId: number
  userName: string
  createdAt: string
  updatedAt: string
  comments: Comment[]
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
  const { user, login } = useAuth()
  const [item, setItem] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Comment state
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [commentError, setCommentError] = useState<string | null>(null)
  const [commentSuccess, setCommentSuccess] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  useEffect(() => {
    const run = async () => {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const res = await api.get(`/incident/${id}`)
        setItem(res.data)
        setComments(Array.isArray(res.data.comments) ? res.data.comments : [])
      } catch (e: any) {
        setError(e?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [id])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim() || !id) return
    setSubmitting(true)
    setCommentError(null)
    setCommentSuccess(false)
    try {
      const res = await api.post(`/incident/${id}/comment`, { content: commentText.trim() })
      setComments(prev => [...prev, res.data])
      setCommentText('')
      setCommentSuccess(true)
      setTimeout(() => setCommentSuccess(false), 3000)
    } catch (e: any) {
      setCommentError(e?.response?.data?.message || 'Failed to post comment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const locationText = useMemo(() => {
    if (!item?.location) return ''
    const upazilaName = item.location.upazila
    const districtName = item.location.district
    const divisionName = item.location.division
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

  // removed unused heroImage to satisfy TS; gallery shows images directly

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* <Link to="/incidents" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6">
            <ArrowLeft size={20} />
            <span>Back to Incidents</span>
          </Link> */}

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
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {item.images?.length ? (
                item.images.map((img, idx) => (
                  <div key={idx} className="aspect-video bg-gray-100 overflow-hidden rounded-lg">
                    <img src={img} alt={`${item.title} ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-gray-600">No images provided.</div>
              )}
            </div>
          </div>

          {/* Video */}
          {item.videoUrl && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Video size={20} />
                Video
              </h2>
              {(() => {
                const url = item.videoUrl
                // Convert YouTube watch URL to embed URL
                const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/)|youtu\.be\/)([\w-]{11})/)
                if (ytMatch) {
                  const embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`
                  return (
                    <div className="aspect-video w-full rounded-lg overflow-hidden border bg-black">
                      <iframe
                        src={embedUrl}
                        title="Incident video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )
                }
                // Fallback: direct video file
                return (
                  <div className="w-full rounded-lg overflow-hidden border bg-black">
                    <video controls className="w-full max-h-96" src={url}>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )
              })()}
            </div>
          )}

          {/* Comments */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <MessageSquare size={22} />
              Comments {comments.length > 0 && <span className="text-base font-normal text-gray-500">({comments.length})</span>}
            </h2>

            {/* Comment form */}
            {user ? (
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold text-sm uppercase">
                    {user.name?.charAt(0) || user.email?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder="Write a comment…"
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      disabled={submitting}
                    />
                    {commentError && (
                      <p className="mt-1 text-xs text-red-600">{commentError}</p>
                    )}
                    {commentSuccess && (
                      <p className="mt-1 text-xs text-green-600">Comment posted successfully!</p>
                    )}
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={submitting || !commentText.trim()}
                        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        <Send size={14} />
                        {submitting ? 'Posting…' : 'Post Comment'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="mb-8 flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <LogIn size={18} className="text-gray-500 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  <button onClick={login} className="text-teal-600 hover:underline font-medium">Sign in</button>
                  {' '}to leave a comment.
                </p>
              </div>
            )}

            {/* Comments list */}
            {comments.length === 0 ? (
              <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
            ) : (
              <ul className="space-y-5">
                {comments.map(comment => (
                  <li key={comment.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-semibold text-sm uppercase">
                      {comment.userName?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-800">{comment.userName}</span>
                        <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
