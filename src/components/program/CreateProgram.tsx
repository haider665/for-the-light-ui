import { useState } from 'react'
// Reuse the same env vars as CreatePost
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqhhr1py2'
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'for-the-light'
const CLOUDINARY_FOLDER = 'for-the-light-program' // Separate folder for programs if desired, or same

import { createProgram, CreateProgramRequest, Program } from '../../services/programService'

const CreateProgram = ({ onSuccess, program }: { onSuccess: () => void, program?: Program }) => {
    const [title, setTitle] = useState(program?.title || '')
    const [description, setDescription] = useState(program?.description || '')
    const [displayImage, setDisplayImage] = useState(program?.displayImage || '')
    const [programSchedule, setProgramSchedule] = useState(program?.programSchedule || '')
    const [programStartDate, setProgramStartDate] = useState(program?.programStartDate ? new Date(program.programStartDate).toISOString().slice(0, 16) : '')
    const [registrationDeadline, setRegistrationDeadline] = useState(program?.registrationDeadline ? new Date(program.registrationDeadline).toISOString().slice(0, 16) : '')
    const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'REJECTED'>(program?.status as any || 'DRAFT')

    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const cloudinaryReady = Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET)

    const uploadFileToCloud = async (file: File) => {
        if (!cloudinaryReady) {
            setUploadError('Cloudinary config missing.')
            return
        }
        setUploadError(null)
        setUploading(true)
        try {
            const fd = new FormData()
            fd.append('file', file)
            fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            fd.append('folder', CLOUDINARY_FOLDER)

            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd })
            if (!res.ok) throw new Error('Upload failed')
            const json = await res.json()
            if (json.secure_url) {
                setDisplayImage(json.secure_url)
            }
        } catch (e) {
            setUploadError('Image upload failed.')
            console.error(e)
        } finally {
            setUploading(false)
        }
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) uploadFileToCloud(file)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !description || !displayImage || !programSchedule || !programStartDate || !registrationDeadline) {
            setError('All fields are required.')
            return
        }

        setSubmitting(true)
        setError(null)

        const payload: CreateProgramRequest = {
            id: program?.id,
            title,
            description,
            displayImage,
            programSchedule,
            programStartDate: new Date(programStartDate).toISOString(),
            registrationDeadline: new Date(registrationDeadline).toISOString(),
            status
        }

        try {
            await createProgram(payload)
            onSuccess()
            if (!program) {
                // Reset form only if creating new
                setTitle('')
                setDescription('')
                setDisplayImage('')
                setProgramSchedule('')
                setProgramStartDate('')
                setRegistrationDeadline('')
                setStatus('DRAFT')
            }
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Failed to save program')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">{program ? 'Edit Program' : 'Create New Program'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        className="w-full border rounded-md px-3 py-2"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        className="w-full border rounded-md px-3 py-2"
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Schedule (e.g. Weekends 10AM)</label>
                        <input
                            type="text"
                            className="w-full border rounded-md px-3 py-2"
                            value={programSchedule}
                            onChange={e => setProgramSchedule(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            className="w-full border rounded-md px-3 py-2"
                            value={status}
                            onChange={e => setStatus(e.target.value as any)}
                        >
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="ARCHIVED">Archived</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Start Date</label>
                        <input
                            type="datetime-local"
                            className="w-full border rounded-md px-3 py-2"
                            value={programStartDate}
                            onChange={e => setProgramStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Registration Deadline</label>
                        <input
                            type="datetime-local"
                            className="w-full border rounded-md px-3 py-2"
                            value={registrationDeadline}
                            onChange={e => setRegistrationDeadline(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Display Image</label>
                    <input type="file" accept="image/*" onChange={onFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    {uploading && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                    {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}
                    {displayImage && (
                        <img src={displayImage} alt="Preview" className="mt-2 h-20 w-auto rounded object-cover" />
                    )}
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black transition disabled:opacity-50"
                    disabled={submitting || uploading}
                >
                    {submitting ? 'Saving...' : (program ? 'Save Program' : 'Create Program')}
                </button>
            </form>
        </div>
    )
}

export default CreateProgram
