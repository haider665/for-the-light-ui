import Sidebar from '../components/dashboard/Sidebar'

const IotDevicesDashboard = () => {
  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="flex gap-6">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <section className="flex-1 min-h-[60vh]">
            <div className="max-w-6xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">IoT GPS Tracking</h1>
                <p className="text-gray-600 mt-1">Phase 0 scaffold. Live device map and telemetry panels will land in next phase.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {['Total Devices', 'Online', 'Delayed', 'Offline'].map((label) => (
                  <div key={label} className="rounded-2xl border bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="text-2xl font-semibold mt-2">—</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border bg-white p-6 shadow-sm min-h-[380px] flex items-center justify-center text-gray-500">
                Map panel scaffold
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default IotDevicesDashboard
