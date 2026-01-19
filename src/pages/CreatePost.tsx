import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/dashboard/Sidebar'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import { Icon, DivIcon } from 'leaflet' // added DivIcon
import 'leaflet/dist/leaflet.css' // ensure Leaflet layout is correct
/* Cloudinary setup:
   1) Create account: https://cloudinary.com
   2) Get cloud_name from Dashboard.
   3) Create unsigned upload preset: Settings → Upload → Upload presets.
   4) Add to .env.local and restart:
      VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
      VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
   Defaults (you can override via env):
      cloud_name: dqhhr1py2
      upload_preset: for-the-light
      folder: for-the-light-incident
*/
// Provide defaults; env vars override these if present
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqhhr1py2'
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'for-the-light'
const CLOUDINARY_FOLDER = 'for-the-light-incident'

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
}) // lightweight visual indicator

type LatLng = { lat: number; lng: number }

const ClickToSetMarker = ({ onSet }: { onSet: (pos: LatLng) => void }) => {
  useMapEvents({
    click(e) {
      onSet({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })
  return null
}

// helper to make the map recompute size when mounted/resized
const FixSize = () => {
  const map = useMap()
  useEffect(() => {
    map.invalidateSize()
    const onResize = () => map.invalidateSize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [map])
  return null
}

const BD_DATA = {
  divisions: [
    {
      name: 'Dhaka',
      districts: [
        { name: 'Dhaka', upazilas: ['Dhamrai', 'Dohar', 'Keraniganj', 'Nawabganj', 'Savar'] },
        { name: 'Faridpur', upazilas: ['Alfadanga', 'Bhanga', 'Boalmari', 'Charbhadrasan', 'Faridpur Sadar', 'Madhukhali', 'Nagarkanda', 'Sadarpur', 'Saltha'] },
        { name: 'Gazipur', upazilas: ['Gazipur Sadar', 'Kaliakair', 'Kaliganj', 'Kapasia', 'Sreepur'] },
        { name: 'Gopalganj', upazilas: ['Gopalganj Sadar', 'Kashiani', 'Kotalipara', 'Muksudpur', 'Tungipara'] },
        { name: 'Kishoreganj', upazilas: ['Austagram', 'Bajitpur', 'Bhairab', 'Hossainpur', 'Itna', 'Karimganj', 'Katiadi', 'Kishoreganj Sadar', 'Kuliarchar', 'Mithamain', 'Nikli', 'Pakundia', 'Tarail'] },
        { name: 'Madaripur', upazilas: ['Kalkini', 'Madaripur Sadar', 'Rajoir', 'Shibchar'] },
        { name: 'Manikganj', upazilas: ['Daulatpur', 'Ghior', 'Harirampur', 'Manikganj Sadar', 'Saturia', 'Shivalaya', 'Singair'] },
        { name: 'Munshiganj', upazilas: ['Gazaria', 'Lohajang', 'Munshiganj Sadar', 'Sirajdikhan', 'Sreenagar', 'Tongibari'] },
        { name: 'Narayanganj', upazilas: ['Araihazar', 'Bandar', 'Narayanganj Sadar', 'Rupganj', 'Sonargaon'] },
        { name: 'Narsingdi', upazilas: ['Belabo', 'Monohardi', 'Narsingdi Sadar', 'Palash', 'Raipura', 'Shibpur'] },
        { name: 'Rajbari', upazilas: ['Baliakandi', 'Goalanda', 'Kalukhali', 'Pangsha', 'Rajbari Sadar'] },
        { name: 'Shariatpur', upazilas: ['Bhedarganj', 'Damudya', 'Gosairhat', 'Naria', 'Shariatpur Sadar', 'Zajira'] },
        { name: 'Tangail', upazilas: ['Basail', 'Bhuapur', 'Delduar', 'Dhanbari', 'Ghatail', 'Gopalpur', 'Kalihati', 'Madhupur', 'Mirzapur', 'Nagarpur', 'Sakhipur', 'Tangail Sadar'] },
      ],
    },
    {
      name: 'Barishal',
      districts: [
        { name: 'Barguna', upazilas: ['Amtali', 'Bamna', 'Barguna Sadar', 'Betagi', 'Patharghata', 'Taltali'] },
        { name: 'Barishal', upazilas: ['Agailjhara', 'Babuganj', 'Bakerganj', 'Banaripara', 'Barishal Sadar', 'Gournadi', 'Hizla', 'Mehendiganj', 'Muladi', 'Wazirpur'] },
        { name: 'Bhola', upazilas: ['Bhola Sadar', 'Borhanuddin', 'Char Fasson', 'Daulatkhan', 'Lalmohan', 'Manpura', 'Tazumuddin'] },
        { name: 'Jhalokathi', upazilas: ['Jhalokathi Sadar', 'Kathalia', 'Nalchity', 'Rajapur'] },
        { name: 'Patuakhali', upazilas: ['Bauphal', 'Dashmina', 'Dumki', 'Galachipa', 'Kalapara', 'Mirzaganj', 'Patuakhali Sadar', 'Rangabali'] },
        { name: 'Pirojpur', upazilas: ['Bhandaria', 'Kawkhali', 'Mathbaria', 'Nazirpur', 'Nesarabad (Swarupkathi)', 'Pirojpur Sadar'] },
      ],
    },
    {
      name: 'Sylhet',
      districts: [
        { name: 'Habiganj', upazilas: ['Ajmiriganj', 'Bahubal', 'Baniachong', 'Chunarughat', 'Habiganj Sadar', 'Lakhai', 'Madhabpur', 'Nabiganj'] },
        { name: 'Moulvibazar', upazilas: ['Barlekha', 'Juri', 'Kamalganj', 'Kulaura', 'Moulvibazar Sadar', 'Rajnagar', 'Sreemangal'] },
        { name: 'Sunamganj', upazilas: ['Bishwamvarpur', 'Chhatak', 'Derai', 'Dharampasha', 'Dowarabazar', 'Jagannathpur', 'Jamalganj', 'Sullah', 'Sunamganj Sadar', 'Tahirpur'] },
        { name: 'Sylhet', upazilas: ['Balaganj', 'Beanibazar', 'Bishwanath', 'Companiganj', 'Dakshin Surma', 'Fenchuganj', 'Golapganj', 'Gowainghat', 'Jaintiapur', 'Kanaighat', 'Sylhet Sadar', 'Zakiganj'] },
      ],
    },
  ],
}

// Provide API base URL (env overrides default localhost:8080)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

// Read cookie without decoding (Spring expects raw value)
function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? match[1] : undefined
}

// Ensure CSRF cookie is present, then return token
async function ensureCsrf(): Promise<string> {
  try {
    await fetch(`${API_BASE_URL}/csrf`, { credentials: 'include' })
  } catch {}
  return getCookie('XSRF-TOKEN') || ''
}

const CreatePost = () => {
  useAuth() // ensures provider is loaded; ProtectedRoute gates access
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [divisionCode, setDivisionCode] = useState('')
  const [districtCode, setDistrictCode] = useState('')
  const [upazilaCode, setUpazilaCode] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [marker, setMarker] = useState<LatLng | null>(null)
  const [center, setCenter] = useState<LatLng>({ lat: 23.685, lng: 90.3563 }) // Bangladesh approx
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [errors, setErrors] = useState<{
    title?: string
    description?: string
    division?: string
    district?: string
    upazila?: string
    images?: string
    location?: string
  }>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ status?: string; message?: string } | null>(null)
  const [needsAuth, setNeedsAuth] = useState(false)

  // Backend validation constraints
  const TITLE_MIN = 3
  const TITLE_MAX = 200
  const DESC_MIN = 10
  const DESC_MAX = 5000

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      )
    }
  }, [])

  const filteredDistricts = useMemo(() => {
    const div = BD_DATA.divisions.find(d => d.name === divisionCode)
    return div ? div.districts.map(d => d.name) : []
  }, [divisionCode])

  const filteredUpazilas = useMemo(() => {
    const div = BD_DATA.divisions.find(d => d.name === divisionCode)
    const dis = div?.districts.find(d => d.name === districtCode)
    return dis ? dis.upazilas : []
  }, [divisionCode, districtCode])

  // derive human-readable names from selected codes
  const divisionName = useMemo(() => BD_DATA.divisions.find(d => d.name === divisionCode)?.name ?? null, [divisionCode])
  const districtName = useMemo(() => filteredDistricts.find(d => d === districtCode) ?? null, [districtCode, filteredDistricts])
  const upazilaName = useMemo(() => filteredUpazilas.find(u => u === upazilaCode) ?? null, [upazilaCode, filteredUpazilas])

  const cloudinaryReady = Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET)

  const uploadFilesToCloud = async (list: File[]) => {
    if (!cloudinaryReady) {
      setUploadError('Cloudinary config missing. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env.local.')
      return
    }
    setUploadError(null)
    setUploading(true)
    try {
      const urls: string[] = []
      for (const file of list) {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        fd.append('folder', CLOUDINARY_FOLDER)
        const baseName = file.name.replace(/\.[^/.]+$/, '')
        const publicId = `${baseName}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`
        fd.append('public_id', publicId)

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd })
        if (!res.ok) {
          const txt = await res.text()
          throw new Error(txt || 'Upload failed')
        }
        const json = await res.json()
        if (json.secure_url) urls.push(json.secure_url)
      }
      setImageUrls(urls)
    } catch (e) {
      setUploadError('Upload failed. Check Cloudinary preset and network.')
      console.error(e)
    } finally {
      setUploading(false)
    }
  }

  const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files ? Array.from(e.target.files) : []
    setFiles(list)
    setImageUrls([])
    setUploadError(null)
    if (!list.length) return
    if (!cloudinaryReady) {
      setUploadError('Cloudinary config missing. Define VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env.local and restart.')
      return
    }
    void uploadFilesToCloud(list)
  }

  const validate = () => {
    const e: typeof errors = {}
    const tlen = title.trim().length
    const dlen = description.trim().length
    if (!title.trim()) {
      e.title = 'Title is required.'
    } else if (tlen < TITLE_MIN) {
      e.title = `Title must be at least ${TITLE_MIN} characters.`
    } else if (tlen > TITLE_MAX) {
      e.title = `Title must be at most ${TITLE_MAX} characters.`
    }
    if (!description.trim()) {
      e.description = 'Description is required.'
    } else if (dlen < DESC_MIN) {
      e.description = `Description must be at least ${DESC_MIN} characters.`
    } else if (dlen > DESC_MAX) {
      e.description = `Description must be at most ${DESC_MAX} characters.`
    }
    if (!divisionCode) e.division = 'Division is required.'
    if (!districtCode) e.district = 'District is required.'
    if (!upazilaCode) e.upazila = 'Upazila is required.'
    if (uploading) e.images = 'Please wait until images finish uploading.'
    if (!imageUrls.length) e.images = 'At least one image is required.'
    if (!marker) e.location = 'Location is required. Click on the map to set it.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    setSubmitResult(null)
    if (!validate()) return
    setSubmitting(true)
    try {
      const csrfToken = await ensureCsrf()
      const res = await fetch(`${API_BASE_URL}/incident`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken, // send CSRF token
        },
        credentials: 'include', // include cookies/session
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      const status = res.ok ? 'success' : (data.status ?? 'failed')
      const message = data.message ?? (res.ok ? 'Incident created successfully.' : 'Failed to create incident.')
      setSubmitResult({ status, message })
    } catch {
      setSubmitResult({ status: 'failed', message: 'Network/CORS error. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  // For now, just prepare payload; saving will be handled later
  const payload = useMemo(() => ({
    title,
    description,
    location: {
      division: divisionCode || null,
      district: districtCode || null,
      upazila: upazilaCode || null,
      lat: marker?.lat ?? null,
      lng: marker?.lng ?? null,
    },
    images: imageUrls, // use cloud URLs instead of raw file metadata
  }), [title, description, divisionCode, districtCode, upazilaCode, marker, imageUrls])

  return (
    <section className="pt-28 pb-16 bg-gray-50 min-h-screen">
      {/* Add minimal CSS for smoothness + pulse */}
      <style>{`
        /* keep transforms smooth without clipping */
        .leaflet-container { will-change: transform; }
        /* pulsing indicator */
        .pulse-dot {
          width: 12px; height: 12px; border-radius: 9999px;
          background: #3b82f6;
          box-shadow: 0 0 0 rgba(59,130,246,0.7);
          animation: pulse 2s infinite;
          display: inline-block;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.7); }
          70% { box-shadow: 0 0 0 20px rgba(59,130,246,0); }
          100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="flex gap-6">
          <Sidebar />
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-6">Create Post</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  maxLength={TITLE_MAX}
                  className="w-full border rounded-md px-3 py-2"
                />
                <div className="mt-1 text-xs text-gray-500">{title.trim().length}/{TITLE_MAX}</div>
                {errors.title && <div className="mt-1 text-xs text-red-600">{errors.title}</div>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={6}
                  maxLength={DESC_MAX}
                  className="w-full border rounded-md px-3 py-2"
                />
                <div className="mt-1 text-xs text-gray-500">{description.trim().length}/{DESC_MAX}</div>
                {errors.description && <div className="mt-1 text-xs text-red-600">{errors.description}</div>}
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Division</label>
                  <select value={divisionCode} onChange={e => { setDivisionCode(e.target.value); setDistrictCode(''); setUpazilaCode('') }} className="w-full border rounded-md px-3 py-2">
                    <option value="">Select Division</option>
                    {BD_DATA.divisions.map(div => (
                      <option key={div.name} value={div.name}>{div.name}</option>
                    ))}
                  </select>
                  {errors.division && <div className="mt-1 text-xs text-red-600">{errors.division}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">District</label>
                  <select value={districtCode} onChange={e => { setDistrictCode(e.target.value); setUpazilaCode('') }} className="w-full border rounded-md px-3 py-2" disabled={!divisionCode}>
                    <option value="">Select District</option>
                    {filteredDistricts.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  {errors.district && <div className="mt-1 text-xs text-red-600">{errors.district}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Upazila</label>
                  <select value={upazilaCode} onChange={e => setUpazilaCode(e.target.value)} className="w-full border rounded-md px-3 py-2" disabled={!districtCode}>
                    <option value="">Select Upazila</option>
                    {filteredUpazilas.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  {errors.upazila && <div className="mt-1 text-xs text-red-600">{errors.upazila}</div>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Images</label>
                <input type="file" accept="image/*" multiple onChange={onFilesChange} />
                {uploading && <div className="mt-2 text-xs text-blue-600">Uploading...</div>}
                {uploadError && <div className="mt-2 text-xs text-red-600">{uploadError}</div>}
                {errors.images && <div className="mt-2 text-xs text-red-600">{errors.images}</div>}
                {imageUrls.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {imageUrls.map((url, idx) => (
                      <div key={idx} className="border rounded-md p-2 text-xs text-gray-600">
                        <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 break-all">Image URL</a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="h-[420px] w-full rounded-md overflow-hidden border">
                <MapContainer
                  center={[center.lat, center.lng]}
                  zoom={8}
                  minZoom={6}
                  maxZoom={18}
                  preferCanvas={true}
                  inertia={true}
                  inertiaDeceleration={3000}
                  wheelDebounceTime={80}
                  wheelPxPerZoomLevel={120}
                  zoomAnimation={true}
                  markerZoomAnimation={true}
                  fadeAnimation={true}
                  doubleClickZoom={false}
                  style={{ height: '100%', width: '100%' }}
                >
                  <FixSize />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                  <ClickToSetMarker onSet={setMarker} />
                  {marker && (
                    <>
                      <Marker position={[marker.lat, marker.lng]} icon={markerIcon} />
                      <Marker position={[marker.lat, marker.lng]} icon={pulsingIcon} />
                    </>
                  )}
                </MapContainer>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                GPS: {marker ? `${marker.lat.toFixed(6)}, ${marker.lng.toFixed(6)}` : 'Click on the map to set location'}
              </div>
              {errors.location && <div className="mt-1 text-xs text-red-600">{errors.location}</div>}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button className="px-4 py-2 rounded-full bg-primary text-white" disabled={uploading || submitting} onClick={handleSubmit}>Save</button>
            <button className="px-4 py-2 rounded-full border">Cancel</button>
          </div>
          {submitResult && (
            <div className={`mt-2 text-sm ${submitResult.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {submitResult.message}
            </div>
          )}
          {needsAuth && (
            <div className="mt-2">
              <button
                className="px-3 py-1 rounded-full border text-sm"
                onClick={() => (window.location.href = `${API_BASE_URL}/oauth2/authorization/google`)}
              >
                Login with Google
              </button>
            </div>
          )}

          <pre className="mt-6 text-xs bg-gray-50 p-3 rounded border overflow-auto">{JSON.stringify(payload, null, 2)}</pre>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreatePost
