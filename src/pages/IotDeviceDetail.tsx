import { Link, useParams } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'

const IotDeviceDetail = () => {
  const { deviceId } = useParams()

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
                <p className="text-gray-600 mt-1">Phase 0 scaffold. History timeline and route playback will be added in later phase.</p>
              </div>

              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-3">Current State</h2>
                <p className="text-gray-500">No live data connected yet.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default IotDeviceDetail
