import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, AlertCircle } from 'lucide-react'
import { Program, getProgramById, enrollInProgram } from '../services/programService'
import { useAuth } from '../context/AuthContext'

function fmtDate(iso?: string) {
    if (!iso) return ''
    const d = new Date(iso)
    if (isNaN(d.getTime())) return iso || ''
    return new Intl.DateTimeFormat(undefined, {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(d)
}

export default function ProgramDetail() {
    const { id } = useParams()
    const { user, login } = useAuth()
    const navigate = useNavigate()
    const [program, setProgram] = useState<Program | null>(null)
    const [loading, setLoading] = useState(true)
    const [enrolling, setEnrolling] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleEnroll = async () => {
        if (!id) return
        setEnrolling(true)
        setError(null)
        try {
            await enrollInProgram(Number(id))
            navigate('/dashboard')
        } catch (e: any) {
            setError(e?.response?.data?.message || 'Enrollment failed')
        } finally {
            setEnrolling(false)
        }
    }

    useEffect(() => {
        const run = async () => {
            if (!id) return
            setLoading(true)
            setError(null)
            try {
                const data = await getProgramById(Number(id))
                setProgram(data)
            } catch (e: any) {
                setError(e?.message || 'Failed to load program details')
            } finally {
                setLoading(false)
            }
        }
        run()
    }, [id])

    if (loading) return <main className="pt-24"><div className="container mx-auto px-4">Loading...</div></main>
    if (error) return <main className="pt-24"><div className="container mx-auto px-4 text-red-600">{error}</div></main>
    if (!program) return <main className="pt-24"><div className="container mx-auto px-4">Program not found.</div></main>

    return (
        <main className="pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <Link to="/programs" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6">
                        <ArrowLeft size={20} />
                        <span>Back to Programs</span>
                    </Link>

                    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                        <div className="aspect-video w-full bg-gray-100 relative">
                            {program.displayImage ? (
                                <img src={program.displayImage} alt={program.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-gray-400">No Image Available</div>
                            )}
                        </div>

                        <div className="p-8">
                            <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8">
                                <div className="flex-1">
                                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{program.title}</h1>
                                    <div className="flex flex-wrap gap-4 text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={18} />
                                            <span>Starts: {fmtDate(program.programStartDate)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={18} />
                                            <span>Schedule: {program.programSchedule}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 w-full md:w-auto">
                                    {user ? (
                                        program.enrolled ? (
                                            <div className="block w-full md:w-auto px-8 py-3 bg-green-100 text-green-800 rounded-lg font-semibold border border-green-200 text-center shadow-sm cursor-default">
                                                Enrolled
                                            </div>
                                        ) : (
                                            <button
                                                onClick={handleEnroll}
                                                disabled={enrolling}
                                                className="block w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-center shadow-md disabled:bg-blue-300"
                                            >
                                                {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                            </button>
                                        )
                                    ) : (
                                        <button
                                            onClick={login}
                                            className="block w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-center shadow-md"
                                        >
                                            Sign in to Enroll
                                        </button>
                                    )}
                                    <p className="mt-3 text-xs text-center text-gray-500 max-w-[200px]">
                                        <AlertCircle size={12} className="inline mr-1" />
                                        Registration closes {fmtDate(program.registrationDeadline)}
                                    </p>
                                </div>
                            </div>

                            <hr className="mb-8 border-gray-100" />

                            <div className="prose prose-lg max-w-none text-gray-700">
                                <h3 className="text-xl font-semibold mb-4 text-gray-900">About this Program</h3>
                                <p className="whitespace-pre-wrap leading-relaxed">{program.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
