import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Icon } from 'leaflet'
import { CircleMarker, MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'
import { getIotDevice, getIotDeviceLocations, IotDevice, IotLocationPoint } from '../services/iotService'

function fmtDate(value: string | null | undefined) {
  if (!value) return '—'
  const d = new Date(value)
  if (isNaN(d.getTime())) return value
  return d.toLocaleString()
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

function FitRouteBounds({ points }: { points: [number, number][] }) {
  const map = useMap()

  useEffect(() => {
    if (points.length === 0) return
    if (points.length === 1) {
      map.setView(points[0], 13)
      return
    }
    map.fitBounds(points, { padding: [24, 24] })
  }, [map, points])

  return null
}

const IotDeviceDetail = () => {
  const { deviceId } = useParams()
  const [device, setDevice] = useState<IotDevice | null>(null)
  const [history, setHistory] = useState<IotLocationPoint[]>([])
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [historyError, setHistoryError] = useState<string | null>(null)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(null)
  const [playbackIndex, setPlaybackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeedMs, setPlaybackSpeedMs] = useState(800)

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, '0')
    const toLocal = (d: Date) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
    const now = new Date()
    const fromDate = new Date(now.getTime() - 6 * 60 * 60 * 1000)
    setFrom(toLocal(fromDate))
    setTo(toLocal(now))
  }, [])

  useEffect(() => {
    if (!deviceId) return
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getIotDevice(deviceId)
        setDevice(data)
      } catch (e: any) {
        setError(e?.response?.data?.error || e?.message || 'Failed to load device')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [deviceId])

  const fetchHistory = async () => {
    if (!deviceId || !from || !to) return
    setHistoryLoading(true)
    setHistoryError(null)
    try {
      const result = await getIotDeviceLocations(deviceId, {
        from: new Date(from).toISOString(),
        to: new Date(to).toISOString(),
        page: 0,
        size: 500,
      })
      setHistory(result.items)
      setSelectedPointIndex(null)
      setPlaybackIndex(0)
      setIsPlaying(false)
    } catch (e: any) {
      setHistoryError(e?.response?.data?.error || e?.message || 'Failed to load history')
    } finally {
      setHistoryLoading(false)
    }
  }

  useEffect(() => {
    if (!from || !to) return
    fetchHistory()
  }, [deviceId, from, to])

  const statusClass = useMemo(() => {
    if (!device) return 'bg-gray-100 text-gray-700'
    if (device.status === 'ONLINE') return 'bg-green-100 text-green-800'
    if (device.status === 'DELAYED') return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }, [device])

  const historyAsc = useMemo(() => {
    return [...history].sort((a, b) => new Date(a.deviceTimestamp).getTime() - new Date(b.deviceTimestamp).getTime())
  }, [history])

  const routePoints = useMemo<[number, number][]>(() => {
    return historyAsc.map((point) => [point.latitude, point.longitude])
  }, [historyAsc])

  const activePlaybackPoint = useMemo(() => {
    if (historyAsc.length === 0) return null
    return historyAsc[Math.min(playbackIndex, historyAsc.length - 1)]
  }, [historyAsc, playbackIndex])

  useEffect(() => {
    if (!isPlaying) return
    if (historyAsc.length === 0) return

    const timer = window.setInterval(() => {
      setPlaybackIndex((prev) => {
        if (prev >= historyAsc.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, playbackSpeedMs)

    return () => window.clearInterval(timer)
  }, [isPlaying, historyAsc, playbackSpeedMs])

  const applyQuickRange = (hours: number) => {
    const pad = (n: number) => String(n).padStart(2, '0')
    const toLocal = (d: Date) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
    const now = new Date()
    const fromDate = new Date(now.getTime() - hours * 60 * 60 * 1000)
    setFrom(toLocal(fromDate))
    setTo(toLocal(now))
  }

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="flex gap-6">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <section className="flex-1 min-h-[60vh]">
            <div className="max-w-5xl mx-auto space-y-6">
              <Link to="/admin/iot/devices" className="text-sm text-gray-600 hover:text-gray-900">
                ← Back to IoT Devices
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Device {deviceId}</h1>
                <p className="text-gray-600 mt-1">Phase 2 view: current state + historical telemetry query.</p>
              </div>

              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-3">Current State</h2>
                {loading && <p className="text-gray-500">Loading...</p>}
                {error && <p className="text-red-600 text-sm">{error}</p>}
                {device && (
                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                    <p><span className="font-medium">Device ID:</span> {device.deviceId}</p>
                    <p><span className="font-medium">Name:</span> {device.name}</p>
                    <p>
                      <span className="font-medium">Status:</span>{' '}
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusClass}`}>{device.status}</span>
                    </p>
                    <p><span className="font-medium">Last Seen:</span> {fmtDate(device.lastSeen)}</p>
                    <p><span className="font-medium">Latitude:</span> {device.latitude ?? '—'}</p>
                    <p><span className="font-medium">Longitude:</span> {device.longitude ?? '—'}</p>
                    <p className="sm:col-span-2"><span className="font-medium">Device Timestamp:</span> {fmtDate(device.lastDeviceTimestamp)}</p>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
                <h2 className="font-semibold text-gray-900">Location History</h2>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => applyQuickRange(1)} className="px-3 py-1.5 rounded-full text-xs border hover:bg-gray-50">Last 1h</button>
                  <button onClick={() => applyQuickRange(6)} className="px-3 py-1.5 rounded-full text-xs border hover:bg-gray-50">Last 6h</button>
                  <button onClick={() => applyQuickRange(24)} className="px-3 py-1.5 rounded-full text-xs border hover:bg-gray-50">Last 24h</button>
                  <button onClick={() => applyQuickRange(72)} className="px-3 py-1.5 rounded-full text-xs border hover:bg-gray-50">Last 72h</button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">From</label>
                    <input
                      type="datetime-local"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">To</label>
                    <input
                      type="datetime-local"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <button
                      onClick={fetchHistory}
                      disabled={historyLoading || !from || !to}
                      className="w-full rounded-md bg-gray-900 text-white px-3 py-2 text-sm hover:bg-black disabled:opacity-50"
                    >
                      {historyLoading ? 'Loading…' : 'Load History'}
                    </button>
                  </div>
                </div>

                {historyError && <p className="text-red-600 text-sm">{historyError}</p>}

                <div className="rounded-xl border p-4 bg-gray-50 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        setIsPlaying(false)
                        setPlaybackIndex(0)
                      }}
                      className="px-2.5 py-1.5 rounded border bg-white hover:bg-gray-50"
                      title="Reset"
                    >
                      <RotateCcw size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setIsPlaying(false)
                        setPlaybackIndex((prev) => Math.max(prev - 1, 0))
                      }}
                      className="px-2.5 py-1.5 rounded border bg-white hover:bg-gray-50"
                      title="Previous"
                    >
                      <SkipBack size={16} />
                    </button>
                    <button
                      onClick={() => setIsPlaying((prev) => !prev)}
                      disabled={historyAsc.length === 0}
                      className="px-3 py-1.5 rounded border bg-white hover:bg-gray-50 disabled:opacity-50"
                      title="Play/Pause"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button
                      onClick={() => {
                        setIsPlaying(false)
                        setPlaybackIndex((prev) => Math.min(prev + 1, Math.max(historyAsc.length - 1, 0)))
                      }}
                      className="px-2.5 py-1.5 rounded border bg-white hover:bg-gray-50"
                      title="Next"
                    >
                      <SkipForward size={16} />
                    </button>

                    <div className="ml-2 flex items-center gap-2 text-xs text-gray-600">
                      <span>Speed</span>
                      <select
                        value={playbackSpeedMs}
                        onChange={(e) => setPlaybackSpeedMs(Number(e.target.value))}
                        className="rounded border px-2 py-1 text-xs bg-white"
                      >
                        <option value={1200}>Slow</option>
                        <option value={800}>Normal</option>
                        <option value={400}>Fast</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600">
                    {historyAsc.length > 0 ? (
                      <>
                        Point {Math.min(playbackIndex + 1, historyAsc.length)} / {historyAsc.length} — {fmtDate(activePlaybackPoint?.deviceTimestamp)}
                      </>
                    ) : (
                      <>No route points yet.</>
                    )}
                  </div>

                  <div className="h-[320px] rounded-xl overflow-hidden border bg-white">
                    <MapContainer
                      center={routePoints[0] || [23.8103, 90.4125]}
                      zoom={8}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                      />

                      {routePoints.length > 0 && <FitRouteBounds points={routePoints} />}
                      {routePoints.length > 1 && (
                        <Polyline positions={routePoints} pathOptions={{ color: '#0ea5e9', weight: 4, opacity: 0.75 }} />
                      )}

                      {historyAsc.map((point, idx) => {
                        const isSelected = selectedPointIndex === idx
                        const isPlayback = idx === playbackIndex
                        return (
                          <CircleMarker
                            key={`${point.deviceTimestamp}-${idx}`}
                            center={[point.latitude, point.longitude]}
                            radius={isPlayback ? 7 : isSelected ? 6 : 4}
                            pathOptions={{
                              color: isPlayback ? '#dc2626' : isSelected ? '#7c3aed' : '#0ea5e9',
                              fillColor: isPlayback ? '#ef4444' : isSelected ? '#8b5cf6' : '#38bdf8',
                              fillOpacity: 0.85,
                              weight: 2,
                            }}
                            eventHandlers={{
                              click: () => {
                                setSelectedPointIndex(idx)
                                setPlaybackIndex(idx)
                                setIsPlaying(false)
                              },
                            }}
                          />
                        )
                      })}

                      {activePlaybackPoint && (
                        <Marker position={[activePlaybackPoint.latitude, activePlaybackPoint.longitude]} icon={markerIcon}>
                          <Popup>
                            <div className="text-sm">
                              <p className="font-semibold">Playback point</p>
                              <p>{fmtDate(activePlaybackPoint.deviceTimestamp)}</p>
                            </div>
                          </Popup>
                        </Marker>
                      )}
                    </MapContainer>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Latitude</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Longitude</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Device Time</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Received</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Event ID</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {!historyLoading && history.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-3 py-6 text-center text-sm text-gray-500">No history in selected range.</td>
                        </tr>
                      )}
                      {historyAsc.map((item, idx) => (
                        <tr
                          key={`${item.deviceTimestamp}-${idx}`}
                          className={`hover:bg-gray-50 cursor-pointer ${selectedPointIndex === idx ? 'bg-purple-50' : ''}`}
                          onClick={() => {
                            setSelectedPointIndex(idx)
                            setPlaybackIndex(idx)
                            setIsPlaying(false)
                          }}
                        >
                          <td className="px-3 py-3 text-sm text-gray-700">{item.latitude}</td>
                          <td className="px-3 py-3 text-sm text-gray-700">{item.longitude}</td>
                          <td className="px-3 py-3 text-sm text-gray-700 whitespace-nowrap">{fmtDate(item.deviceTimestamp)}</td>
                          <td className="px-3 py-3 text-sm text-gray-700 whitespace-nowrap">{fmtDate(item.receivedAt)}</td>
                          <td className="px-3 py-3 text-sm text-gray-700">{item.eventId || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default IotDeviceDetail
