import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MessageSquare, Send, LogIn, Video, X, ChevronLeft, ChevronRight, MapPin, Calendar, User, ImageIcon, ArrowLeft } from 'lucide-react'
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
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-b from-white to-gray-100 pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded-lg w-2/3" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
            </div>
          </div>
        </div>
      </main>
    )
  }
  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      </main>
    )
  }
  if (!item) {
    return (
      <main className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
            <p className="text-gray-500">No incident found.</p>
          </div>
        </div>
      </main>
    )
  }

  const heroImage = item.images?.length ? item.images[0] : null

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ── Hero header ── */}
      <section className="relative overflow-hidden">
        {/* Background: gradient + optional blurred cover image */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100" />
        {heroImage && (
          <div
            className="absolute inset-0 opacity-[0.04] bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})`, filter: 'blur(30px) saturate(1.5)' }}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gray-200" />

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-14">
          {/* Back link */}
          <a href="/incidents" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-medium mb-6 transition-colors">
            <ArrowLeft size={16} />
            Back to Incidents
          </a>

          {/* Title + status */}
          <div className="mb-5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {item.title}
              </h1>
              <StatusPill status={item.status} />
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-gray-500 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <User size={15} />
              {item.userName}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={15} />
              {new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            {locationText && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} />
                {locationText}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="max-w-6xl mx-auto px-6 -mt-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left column (2/3) ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Description card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
              <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                <p>{item.description}</p>
              </div>
            </div>

            {/* Image gallery card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <ImageIcon size={20} className="text-teal-600" />
                Images
                {item.images?.length > 0 && (
                  <span className="text-sm font-normal text-gray-400">({item.images.length})</span>
                )}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {item.images?.length ? (
                  item.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="group aspect-[4/3] bg-gray-100 overflow-hidden rounded-xl cursor-pointer relative"
                      onClick={() => setLightboxIndex(idx)}
                    >
                      <img
                        src={img}
                        alt={`${item.title} ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl" />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-gray-400 text-sm py-6 text-center">No images provided.</div>
                )}
              </div>
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && item.images?.length && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-xl bg-white/30"
                onClick={() => setLightboxIndex(null)}
              >
                <button
                  className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 text-gray-700 hover:bg-white hover:text-gray-900 shadow-lg backdrop-blur-sm transition-all z-10"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close gallery"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>

                <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm shadow text-gray-700 text-xs font-semibold tracking-wide z-10">
                  {lightboxIndex + 1} / {item.images.length}
                </div>

                {lightboxIndex > 0 && (
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/70 text-gray-700 hover:bg-white hover:text-gray-900 shadow-lg backdrop-blur-sm transition-all z-10"
                    onClick={e => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1) }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={22} strokeWidth={2.5} />
                  </button>
                )}

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

                {lightboxIndex < item.images.length - 1 && (
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/70 text-gray-700 hover:bg-white hover:text-gray-900 shadow-lg backdrop-blur-sm transition-all z-10"
                    onClick={e => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1) }}
                    aria-label="Next image"
                  >
                    <ChevronRight size={22} strokeWidth={2.5} />
                  </button>
                )}

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

            {/* Video card */}
            {item.videoUrl && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
                  <Video size={20} className="text-teal-600" />
                  Video
                </h2>
                {(() => {
                  const url = item.videoUrl
                  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/)|youtu\.be\/)([\w-]{11})/)
                  if (ytMatch) {
                    const embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`
                    return (
                      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
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
                  return (
                    <div className="w-full rounded-xl overflow-hidden bg-black">
                      <video controls className="w-full max-h-96" src={url}>
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )
                })()}
              </div>
            )}

            {/* Comments card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare size={20} className="text-teal-600" />
                Comments
                {comments.length > 0 && (
                  <span className="text-sm font-normal text-gray-400">({comments.length})</span>
                )}
              </h2>

              {/* Comment form */}
              {user ? (
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-white flex items-center justify-center font-semibold text-sm uppercase shadow-sm">
                      {user.name?.charAt(0) || user.email?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                        placeholder="Write a comment…"
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none bg-gray-50/50 placeholder-gray-400"
                        disabled={submitting}
                      />
                      {commentError && (
                        <p className="mt-1.5 text-xs text-red-600">{commentError}</p>
                      )}
                      {commentSuccess && (
                        <p className="mt-1.5 text-xs text-green-600">Comment posted successfully!</p>
                      )}
                      <div className="flex justify-end mt-3">
                        <button
                          type="submit"
                          disabled={submitting || !commentText.trim()}
                          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                        >
                          <Send size={14} />
                          {submitting ? 'Posting…' : 'Post Comment'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="mb-8 flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <LogIn size={18} className="text-gray-400 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    <button onClick={login} className="text-teal-600 hover:underline font-medium">Sign in</button>
                    {' '}to leave a comment.
                  </p>
                </div>
              )}

              {/* Comments list */}
              {comments.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No comments yet. Be the first to comment!</p>
              ) : (
                <ul className="space-y-4">
                  {comments.map(comment => (
                    <li key={comment.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600 flex items-center justify-center font-semibold text-sm uppercase">
                        {comment.userName?.charAt(0) || '?'}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold text-gray-800">{comment.userName}</span>
                          <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{comment.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ── Right sidebar (1/3) ── */}
          <div className="space-y-6">

            {/* Location card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-teal-600" />
                  Location
                </h3>
                {locationText ? (
                  <div className="space-y-2">
                    {item.location?.division && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Division</span>
                        <span className="font-medium text-gray-800">{item.location.division}</span>
                      </div>
                    )}
                    {item.location?.district && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">District</span>
                        <span className="font-medium text-gray-800">{item.location.district}</span>
                      </div>
                    )}
                    {item.location?.upazila && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Upazila</span>
                        <span className="font-medium text-gray-800">{item.location.upazila}</span>
                      </div>
                    )}
                    {item.location?.lat && item.location?.lng && (
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                        <span className="text-gray-500">GPS</span>
                        <span className="font-mono text-xs text-gray-600">{item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No location data.</p>
                )}
              </div>

              {/* Map */}
              {item.location?.lat && item.location?.lng && (
                <div className="h-56 w-full border-t border-gray-100">
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

            {/* Quick details card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <User size={15} className="text-teal-600" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Reported by</div>
                    <div className="font-medium text-gray-800">{item.userName}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Calendar size={15} className="text-teal-600" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Created</div>
                    <div className="font-medium text-gray-800">{new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </div>
                </div>
                {item.updatedAt && item.updatedAt !== item.createdAt && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <Calendar size={15} className="text-amber-600" />
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Updated</div>
                      <div className="font-medium text-gray-800">{new Date(item.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={15} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Comments</div>
                    <div className="font-medium text-gray-800">{comments.length}</div>
                  </div>
                </div>
                {item.images?.length > 0 && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <ImageIcon size={15} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Photos</div>
                      <div className="font-medium text-gray-800">{item.images.length}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
