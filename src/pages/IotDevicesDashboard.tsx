import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, AlertTriangle, Search, WifiOff } from 'lucide-react'
import { DivIcon, Icon } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import Sidebar from '../components/dashboard/Sidebar'
import { getIotDevices, IotDevice } from '../services/iotService'

function fmtDate(value: string | null) {
  if (!value) return '—'
  const d = new Date(value)
  if (isNaN(d.getTime())) return value
  return d.toLocaleString()
}

const statusPill: Record<IotDevice['status'], string> = {
  ONLINE: 'bg-green-100 text-green-800',
  DELAYED: 'bg-yellow-100 text-yellow-800',
  OFFLINE: 'bg-red-100 text-red-800',
}

const defaultCenter: [number, number] = [23.8103, 90.4125]

const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const pulseIcon = new DivIcon({
  className: 'iot-pulse-icon',
  html: '<span class="iot-pulse-dot"></span>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

function MapFocus({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()

  useEffect(() => {
    map.flyTo([lat, lng], Math.max(map.getZoom(), 11), { duration: 0.6 })
  }, [lat, lng, map])

  return null
}

const IotDevicesDashboard = () => {
  const [devices, setDevices] = useState<IotDevice[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null)

  const fetchDevices = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getIotDevices()
      setDevices(data)
      setSelectedDeviceId((prev) => prev ?? data[0]?.deviceId ?? null)
    } catch (e: any) {
      setError(e?.response?.data?.error || e?.message || 'Failed to load devices')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDevices()
  }, [])


  const metrics = useMemo(() => {
    return {
      total: devices.length,
      online: devices.filter(d => d.status === 'ONLINE').length,
      delayed: devices.filter(d => d.status === 'DELAYED').length,
      offline: devices.filter(d => d.status === 'OFFLINE').length,
    }
  }, [devices])

  const filtered = useMemo(() => {
    if (!query.trim()) return devices
    const q = query.toLowerCase()
    return devices.filter(d => d.deviceId.toLowerCase().includes(q) || d.name.toLowerCase().includes(q))
  }, [devices, query])

  const devicesWithCoords = useMemo(() => {
    return devices.filter((d) => d.latitude != null && d.longitude != null)
  }, [devices])

  const selectedDevice = useMemo(() => {
    if (!selectedDeviceId) return null
    return devices.find((d) => d.deviceId === selectedDeviceId) ?? null
  }, [devices, selectedDeviceId])

  const selectedPosition = useMemo(() => {
    if (!selectedDevice || selectedDevice.latitude == null || selectedDevice.longitude == null) return null
    return [selectedDevice.latitude, selectedDevice.longitude] as [number, number]
  }, [selectedDevice])

  return (
    <main className="pt-24 pb-10 bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <style>{`
        .iot-pulse-dot {
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          background: #22c55e;
          box-shadow: 0 0 0 rgba(34,197,94,0.7);
          animation: iotPulse 2s infinite;
          display: inline-block;
        }
        @keyframes iotPulse {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.7); }
          70% { box-shadow: 0 0 0 14px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
      `}</style>
      <div className="container mx-auto px-4">
        <div className="flex gap-6">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <section className="flex-1 min-h-[60vh]">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-primary">Operations Dashboard</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">IoT GPS Tracking</h1>
                    <p className="text-gray-600 mt-2">Fleet visibility with real-time data and historical traceability.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchDevices}
                      className="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-sm"
                      disabled={loading}
                    >
                      {loading ? 'Refreshing…' : 'Refresh'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                  <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Total Devices</p>
                    <p className="text-3xl font-bold mt-2 text-gray-900">{metrics.total}</p>
                  </div>
                  <div className="rounded-2xl border bg-gradient-to-br from-green-50 to-white p-5 shadow-sm">
                    <p className="text-sm text-green-700 inline-flex items-center gap-1"><Activity size={14} />Online</p>
                    <p className="text-3xl font-bold mt-2 text-green-700">{metrics.online}</p>
                  </div>
                  <div className="rounded-2xl border bg-gradient-to-br from-yellow-50 to-white p-5 shadow-sm">
                    <p className="text-sm text-yellow-700 inline-flex items-center gap-1"><AlertTriangle size={14} />Delayed</p>
                    <p className="text-3xl font-bold mt-2 text-yellow-700">{metrics.delayed}</p>
                  </div>
                  <div className="rounded-2xl border bg-gradient-to-br from-red-50 to-white p-5 shadow-sm">
                    <p className="text-sm text-red-700 inline-flex items-center gap-1"><WifiOff size={14} />Offline</p>
                    <p className="text-3xl font-bold mt-2 text-red-700">{metrics.offline}</p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)] gap-6">
                <aside className="rounded-2xl border bg-white shadow-sm overflow-hidden">
                  <div className="p-4 border-b">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by device ID or name"
                        className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="max-h-[580px] overflow-y-auto p-3 space-y-2">
                    {!loading && filtered.length === 0 && (
                      <div className="rounded-xl border border-dashed p-5 text-sm text-gray-500 text-center">No devices found.</div>
                    )}

                    {filtered.map((device) => {
                      const active = selectedDeviceId === device.deviceId
                      return (
                        <button
                          key={device.deviceId}
                          onClick={() => setSelectedDeviceId(device.deviceId)}
                          className={`w-full text-left rounded-xl border p-3 transition ${active ? 'border-primary bg-primary/5' : 'hover:bg-gray-50 border-gray-200'}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-sm text-gray-900">{device.deviceId}</p>
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{device.name}</p>
                            </div>
                            <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${statusPill[device.status]}`}>
                              {device.status}
                            </span>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-gray-500">
                            <p>Lat: {device.latitude ?? '—'}</p>
                            <p>Lng: {device.longitude ?? '—'}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </aside>

                <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
                  <div className="p-4 border-b flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold text-gray-900">Device Map</h2>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 text-gray-600"><span className="h-2.5 w-2.5 rounded-full bg-green-500" />ONLINE</span>
                      <span className="inline-flex items-center gap-1 text-gray-600"><span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />DELAYED</span>
                      <span className="inline-flex items-center gap-1 text-gray-600"><span className="h-2.5 w-2.5 rounded-full bg-red-500" />OFFLINE</span>
                    </div>
                  </div>

                  <div className="h-[500px] w-full">
                    <MapContainer center={selectedPosition ?? defaultCenter} zoom={8} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                      />

                      {selectedPosition && <MapFocus lat={selectedPosition[0]} lng={selectedPosition[1]} />}

                      {devicesWithCoords.map((device) => {
                        const isOnline = device.status === 'ONLINE'
                        const lat = device.latitude as number
                        const lng = device.longitude as number
                        return (
                          <Fragment key={device.deviceId}>
                            {isOnline && <Marker position={[lat, lng]} icon={pulseIcon} key={`${device.deviceId}-pulse`} />}
                            <Marker
                              position={[lat, lng]}
                              icon={markerIcon}
                              eventHandlers={{
                                click: () => setSelectedDeviceId(device.deviceId),
                              }}
                            >
                              <Popup>
                                <div className="text-sm">
                                  <p className="font-semibold">{device.deviceId}</p>
                                  <p>{device.name}</p>
                                  <p>Status: {device.status}</p>
                                  <p>Last Seen: {fmtDate(device.lastSeen)}</p>
                                  <p className="mt-2">
                                    <Link to={`/admin/iot/devices/${device.deviceId}`} className="text-blue-600 hover:underline">
                                      Open detail
                                    </Link>
                                  </p>
                                </div>
                              </Popup>
                            </Marker>
                          </Fragment>
                        )
                      })}
                    </MapContainer>
                  </div>

                  <div className="p-4 border-t bg-slate-50 text-sm">
                    {selectedDevice ? (
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-gray-700">
                        <span><span className="font-medium">Selected:</span> {selectedDevice.deviceId}</span>
                        <span><span className="font-medium">Name:</span> {selectedDevice.name}</span>
                        <span><span className="font-medium">Last Seen:</span> {fmtDate(selectedDevice.lastSeen)}</span>
                        <Link to={`/admin/iot/devices/${selectedDevice.deviceId}`} className="text-blue-600 hover:underline font-medium">
                          Open history
                        </Link>
                      </div>
                    ) : (
                      <p className="text-gray-500">Select device from left panel to focus map and view quick details.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default IotDevicesDashboard
