import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MessageSquare, Send, LogIn, Video, X, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight' && item?.images) setLightboxIndex(i => i !== null ? Math.min(i + 1, item.images.length - 1) : null)
      if (e.key === 'ArrowLeft') setLightboxIndex(i => i !== null ? Math.max(i - 1, 0) : null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightboxIndex, item?.images])

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
                  <div
                    key={idx}
                    className="aspect-video bg-gray-100 overflow-hidden rounded-lg cursor-pointer hover:ring-2 hover:ring-teal-400 transition-shadow"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <img src={img} alt={`${item.title} ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-gray-600">No images provided.</div>
              )}
            </div>
          </div>

          {/* Lightbox */}
          {lightboxIndex !== null && item.images?.length && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-xl bg-white/30"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close button */}
              <button
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 text-gray-700 hover:bg-white hover:text-gray-900 shadow-lg backdrop-blur-sm transition-all z-10"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close gallery"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              {/* Counter pill */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm shadow text-gray-700 text-xs font-semibold tracking-wide z-10">
                {lightboxIndex + 1} / {item.images.length}
              </div>

              {/* Previous */}
              {lightboxIndex > 0 && (
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/70 text-gray-700 hover:bg-white hover:text-gray-900 shadow-lg backdrop-blur-sm transition-all z-10"
                  onClick={e => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1) }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </button>
              )}

              {/* Image container */}
              <div
                className="relative max-h-[75vh] max-w-[70vw] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5"
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={item.images[lightboxIndex]}
                  alt={`${item.title} ${lightboxIndex + 1}`}
                  className="max-h-[75vh] max-w-[70vw] object-contain select-none"
                  draggable={false}
                />
              </div>

              {/* Next */}
              {lightboxIndex < item.images.length - 1 && (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/70 text-gray-700 hover:bg-white hover:text-gray-900 shadow-lg backdrop-blur-sm transition-all z-10"
                  onClick={e => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1) }}
                  aria-label="Next image"
                >
                  <ChevronRight size={22} strokeWidth={2.5} />
                </button>
              )}

              {/* Thumbnail strip */}
              {item.images.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2.5 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg z-10">
                  {item.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={e => { e.stopPropagation(); setLightboxIndex(idx) }}
                      className={`w-12 h-9 rounded-lg overflow-hidden transition-all border-2 ${
                        idx === lightboxIndex
                          ? 'border-teal-500 ring-2 ring-teal-500/30 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

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
