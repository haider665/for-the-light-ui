import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import { Program, getAvailablePrograms, enrollInProgram } from '../services/programService'
import { useAuth } from '../context/AuthContext'

export default function PublicPrograms() {
    const { user, login } = useAuth()
    const navigate = useNavigate()
    const [programs, setPrograms] = useState<Program[]>([])
    const [loading, setLoading] = useState(true)
    const [enrolling, setEnrolling] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleEnroll = async (id: number) => {
        setEnrolling(id)
        setError(null)
        try {
            await enrollInProgram(id)
            navigate('/dashboard')
        } catch (e: any) {
            setError(e?.response?.data?.message || 'Enrollment failed')
        } finally {
            setEnrolling(null)
        }
    }

    useEffect(() => {
        const run = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await getAvailablePrograms()
                setPrograms(data)
            } catch (e: any) {
                setError(e?.message || 'Failed to load programs')
            } finally {
                setLoading(false)
            }
        }
        run()
    }, [])

    return (
        <main className="pt-24">
            <div className="container mx-auto px-4">
                <section className="py-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-semibold">Training Programs</h1>
                            <p className="text-gray-600">Join our upcoming workshops and training sessions</p>
                        </div>
                    </div>

                    {loading && <div>Loading...</div>}
                    {error && <div className="text-red-600">{error}</div>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programs.map(program => (
                            <Card key={program.id} className="overflow-hidden p-0 flex flex-col h-full">
                                <div className="aspect-video bg-gray-100 overflow-hidden relative">
                                    {program.displayImage ? (
                                        <img src={program.displayImage} alt={program.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">No Image</div>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="mb-2">
                                        <h3 className="text-xl font-bold line-clamp-2 mb-1">{program.title}</h3>
                                        <div className="text-sm text-gray-500 font-medium">{program.programSchedule}</div>
                                    </div>

                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                                        {program.description}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto pt-4 border-t">
                                        <Link
                                            to={`/programs/${program.id}`}
                                            className="px-4 py-2 rounded-md bg-gray-100 text-gray-900 text-center font-medium hover:bg-gray-200 transition"
                                        >
                                            Details
                                        </Link>
                                        {user ? (
                                            program.enrolled ? (
                                                <span className="px-4 py-2 rounded-md bg-green-100 text-green-800 text-center font-medium border border-green-200">
                                                    Enrolled
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleEnroll(program.id)}
                                                    disabled={enrolling !== null}
                                                    className="px-4 py-2 rounded-md bg-blue-600 text-white text-center font-medium hover:bg-blue-700 transition disabled:bg-blue-300"
                                                >
                                                    {enrolling === program.id ? 'Enrolling...' : 'Enroll'}
                                                </button>
                                            )
                                        ) : (
                                            <button
                                                onClick={login}
                                                className="px-4 py-2 rounded-md bg-blue-600 text-white text-center font-medium hover:bg-blue-700 transition"
                                            >
                                                Sign in to Enroll
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {!loading && !error && programs.length === 0 && (
                        <div className="text-center text-gray-500 py-12">No available programs at the moment.</div>
                    )}
                </section>
            </div>
        </main>
    )
}
