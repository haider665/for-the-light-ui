import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/dashboard/Sidebar'
import ProgramList from '../components/program/ProgramList'
import CreateProgram from '../components/program/CreateProgram'
import { Program } from '../services/programService'

const Programs = () => {
    const { user } = useAuth()
    const [showProgramCreate, setShowProgramCreate] = useState(false)
    const [editingProgram, setEditingProgram] = useState<Program | undefined>(undefined)
    const [refreshKey, setRefreshKey] = useState(0)

    const isSuperAdmin = user?.roles?.includes('SUPER_ADMIN')

    if (!isSuperAdmin) {
        return (
            <main className="pt-24">
                <div className="container mx-auto px-4">
                    <div className="flex gap-6">
                        <Sidebar />
                        <div className="flex-1 min-h-[60vh] p-6 bg-yellow-50 text-yellow-800 rounded-md">
                            Access denied. This page is only accessible to super administrators.
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    const toggleCreate = () => {
        if (showProgramCreate) {
            setShowProgramCreate(false)
            setEditingProgram(undefined)
        } else {
            setShowProgramCreate(true)
            setEditingProgram(undefined)
        }
    }

    return (
        <main className="pt-24">
            <div className="container mx-auto px-4">
                <div className="flex gap-6">
                    <div className="hidden md:block">
                        <Sidebar />
                    </div>
                    <section className="flex-1 min-h-[60vh]">
                        <div className="max-w-4xl mx-auto space-y-8">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold">Program Management</h1>
                                    <p className="text-gray-600">Manage training programs and workshops</p>
                                </div>
                                <button
                                    onClick={toggleCreate}
                                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    {showProgramCreate ? 'Cancel' : 'Create Program'}
                                </button>
                            </div>

                            {showProgramCreate ? (
                                <CreateProgram
                                    program={editingProgram}
                                    onSuccess={() => {
                                        setShowProgramCreate(false)
                                        setEditingProgram(undefined)
                                        setRefreshKey(k => k + 1)
                                    }}
                                />
                            ) : (
                                <ProgramList
                                    keyTrigger={refreshKey}
                                    onEdit={(program) => {
                                        setEditingProgram(program)
                                        setShowProgramCreate(true)
                                    }}
                                />
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Programs
