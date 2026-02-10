import { useEffect, useState } from 'react'
import { Program, getPrograms, updateProgramStatus, getEnrolledUsers } from '../../services/programService'
import { User } from '../../pages/Users'
import { X, Users } from 'lucide-react'

const ProgramList = ({ keyTrigger, onEdit }: { keyTrigger: number, onEdit: (program: Program) => void }) => {
    const [programs, setPrograms] = useState<Program[]>([])
    const [loading, setLoading] = useState(true)
    const [enrolledUsers, setEnrolledUsers] = useState<User[]>([])
    const [isFetchingEnrolled, setIsFetchingEnrolled] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)

    const fetchPrograms = async () => {
        setLoading(true)
        try {
            const data = await getPrograms()
            setPrograms(data)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const handleViewEnrolled = async (program: Program) => {
        setIsFetchingEnrolled(true)
        setSelectedProgram(program)
        setShowModal(true)
        try {
            const users = await getEnrolledUsers(program.id)
            setEnrolledUsers(users)
        } catch (e) {
            console.error('Failed to fetch enrolled users', e)
        } finally {
            setIsFetchingEnrolled(false)
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setEnrolledUsers([])
        setSelectedProgram(null)
    }

    useEffect(() => {
        fetchPrograms()
    }, [keyTrigger])

    const handleStatusChange = async (id: number, currentStatus: string) => {
        const newStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
        try {
            // Optimistic update
            setPrograms(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p))
            await updateProgramStatus(id, newStatus)
        } catch (e) {
            console.error('Failed to update status', e)
            fetchPrograms() // Revert on failure
        }
    }

    if (loading) return <div className="p-4">Loading programs...</div>

    return (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">All Programs</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {programs.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No programs found.</td>
                            </tr>
                        )}
                        {programs.map((program) => (
                            <tr key={program.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{program.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {program.displayImage && <img src={program.displayImage} alt="" className="h-8 w-8 rounded mr-3 object-cover" />}
                                        <div className="text-sm font-medium text-gray-900">{program.title}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.programSchedule}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${program.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {program.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(program)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(program.id, program.status)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        {program.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                                    </button>
                                    <button
                                        onClick={() => handleViewEnrolled(program)}
                                        className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-1"
                                    >
                                        <Users size={14} />
                                        Enrolled
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Enrolled Users Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
                        <div className="p-6 border-b flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Enrolled Users</h3>
                                <p className="text-sm text-gray-500">{selectedProgram?.title}</p>
                            </div>
                            <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full transition">
                                <X size={24} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {isFetchingEnrolled ? (
                                <div className="text-center py-12 text-gray-500">Loading enrolled users...</div>
                            ) : enrolledUsers.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">No users enrolled in this program yet.</div>
                            ) : (
                                <div className="space-y-4">
                                    {enrolledUsers.map((user) => (
                                        <div key={user.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition">
                                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                                                {user.picture ? (
                                                    <img src={user.picture} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    user.name?.charAt(0) || user.email.charAt(0)
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-semibold text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-400 capitalize">
                                                    {user.roles.join(', ')}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-gray-50 border-t flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProgramList
