import api from '../config/api'

export type DeviceLiveStatus = 'ONLINE' | 'DELAYED' | 'OFFLINE'

export type IotDevice = {
  deviceId: string
  name: string
  latitude: number | null
  longitude: number | null
  lastSeen: string | null
  lastDeviceTimestamp: string | null
  status: DeviceLiveStatus
}

export type IotLocationPoint = {
  latitude: number
  longitude: number
  deviceTimestamp: string
  receivedAt: string
  eventId?: string | null
}

export async function getIotDevices() {
  const response = await api.get<IotDevice[]>('/api/iot/devices')
  return response.data
}

export async function getIotDevice(deviceId: string) {
  const response = await api.get<IotDevice>(`/api/iot/devices/${deviceId}`)
  return response.data
}

export async function getIotDeviceLocations(deviceId: string, params: {
  from: string
  to: string
  page?: number
  size?: number
}) {
  const response = await api.get<IotLocationPoint[]>(`/api/iot/devices/${deviceId}/locations`, { params })
  return response.data
}
