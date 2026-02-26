import api from '../config/api';
import { User } from '../pages/Users';

export interface Program {
    id: number;
    title: string;
    description: string;
    displayImage: string;
    programSchedule: string;
    programStartDate: string;
    registrationDeadline: string;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'REJECTED';
    createdBy?: string;
    version?: number;
    createdAt?: string;
    updatedAt?: string;
    enrolled?: boolean;
}

export interface CreateProgramRequest {
    id?: number;
    title: string;
    description: string;
    displayImage: string;
    programSchedule: string;
    programStartDate: string;
    registrationDeadline: string;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'REJECTED';
}

export const getPrograms = async (): Promise<Program[]> => {
    const response = await api.get('/program');
    return response.data;
};

export const createProgram = async (program: CreateProgramRequest): Promise<Program> => {
    const response = await api.post('/program', program);
    return response.data;
};

export const updateProgramStatus = async (id: number, status: Program['status']): Promise<Program> => {
    // Using POST to update status as requested
    const response = await api.post(`/program/${id}/status`, { status });
    return response.data;
};

export const getAvailablePrograms = async (): Promise<Program[]> => {
    const response = await api.get('/program/available');
    return response.data;
};

export const getProgramById = async (id: number): Promise<Program> => {
    const response = await api.get(`/program/${id}`);
    return response.data;
};

export const enrollInProgram = async (id: number): Promise<void> => {
    await api.post(`/program/${id}/enroll`);
};

export const getEnrolledUsers = async (id: number): Promise<User[]> => {
    const response = await api.get(`/program/${id}/enrolled`);
    return response.data;
};
