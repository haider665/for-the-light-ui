import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'
import { getIotDevice, getIotDeviceLocations, IotDevice, IotLocationPoint } from '../services/iotService'

function fmtDate(value: string | null | undefined) {
  if (!value) return '—'
  const d = new Date(value)
  if (isNaN(d.getTime())) return value
  return d.toLocaleString()
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

  useEffect(() => {
    const now = new Date()
    const fromDate = new Date(now.getTime() - 6 * 60 * 60 * 1000)
    setFrom(fromDate.toISOString().slice(0, 16))
    setTo(now.toISOString().slice(0, 16))
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
        size: 200,
      })
      setHistory(result.items)
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
                      {history.map((item, idx) => (
                        <tr key={`${item.deviceTimestamp}-${idx}`} className="hover:bg-gray-50">
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
