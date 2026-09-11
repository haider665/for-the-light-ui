import { useEffect, useMemo, useState } from 'react'
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

const IotDevicesDashboard = () => {
  const [devices, setDevices] = useState<IotDevice[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDevices = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getIotDevices()
      setDevices(data)
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

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="flex gap-6">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <section className="flex-1 min-h-[60vh]">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">IoT GPS Tracking</h1>
                  <p className="text-gray-600 mt-1">Phase 1 view: verify ingested devices and latest telemetry state.</p>
                </div>
                <button
                  onClick={fetchDevices}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
                  disabled={loading}
                >
                  {loading ? 'Refreshing…' : 'Refresh'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <p className="text-sm text-gray-500">Total Devices</p>
                  <p className="text-2xl font-semibold mt-2">{metrics.total}</p>
                </div>
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <p className="text-sm text-gray-500">Online</p>
                  <p className="text-2xl font-semibold mt-2 text-green-700">{metrics.online}</p>
                </div>
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <p className="text-sm text-gray-500">Delayed</p>
                  <p className="text-2xl font-semibold mt-2 text-yellow-700">{metrics.delayed}</p>
                </div>
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <p className="text-sm text-gray-500">Offline</p>
                  <p className="text-2xl font-semibold mt-2 text-red-700">{metrics.offline}</p>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="rounded-2xl border bg-white p-6 shadow-sm overflow-x-auto">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Device Snapshot</h2>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Device ID</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Latitude</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Longitude</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Last Seen</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Device Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {!loading && devices.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-3 py-6 text-center text-sm text-gray-500">No devices found.</td>
                      </tr>
                    )}
                    {devices.map(device => (
                      <tr key={device.deviceId} className="hover:bg-gray-50">
                        <td className="px-3 py-3 text-sm text-gray-900 font-medium">{device.deviceId}</td>
                        <td className="px-3 py-3 text-sm text-gray-700">{device.name}</td>
                        <td className="px-3 py-3 text-sm">
                          <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusPill[device.status]}`}>
                            {device.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-700">{device.latitude ?? '—'}</td>
                        <td className="px-3 py-3 text-sm text-gray-700">{device.longitude ?? '—'}</td>
                        <td className="px-3 py-3 text-sm text-gray-700 whitespace-nowrap">{fmtDate(device.lastSeen)}</td>
                        <td className="px-3 py-3 text-sm text-gray-700 whitespace-nowrap">{fmtDate(device.lastDeviceTimestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default IotDevicesDashboard
