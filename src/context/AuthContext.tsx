import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from 'react'
import api, { API_BASE_URL } from '../config/api'

type User = {
  name?: string
  email?: string
  picture?: string
  sub?: string
  id?: number | string
  roles?: string[]
  createdAt?: string
  lastLogin?: string
}

type AuthContextValue = {
  user: User | null
  loading: boolean
  login: () => void
  logout: () => Promise<void>
  authenticate: (token: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        if (!token) {
          setLoading(false)
          return
        }

        const res = await api.get('/user/details')
        if (!cancelled) {
          setUser(res.data)
        }
      } catch (e) {
        if (!cancelled) {
          setUser(null)
          localStorage.removeItem('accessToken')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchUser()

    return () => {
      cancelled = true
    }
  }, [])

  // const login = useCallback(() => {
  //   window.location.href = `${API_BASE_URL}/oauth2/authorization/google`
  // }, [])

  const login = useCallback(() => {
    // OLD: window.location.href = `${API_BASE_URL}/oauth2/authorization/google`
    // NEW: Should match .baseUri("/oauth2/authorize") + /google
    // We need to point to the BACKEND for the initial handshake, but the redirect_uri param 
    // tells Google where to send the user back.
    // Since we removed the /oauth2 proxy, we must use the full backend URL for the start.
    window.location.href = `${API_BASE_URL}/oauth2/authorize/google?redirect_uri=${window.location.origin}/oauth2/redirect`
  }, [])

  const logout = useCallback(async () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    window.location.href = '/' // or navigate('/login') if we had access to navigate here. 
    // Since AuthProvider wraps Router, we can't use useNavigate here unless we split the context.
    // But forcing a reload with window.location is acceptable for logout.
    // Or we could return a promise and let the caller handle navigation.
    // For now, simple client-side logout.
  }, [])

  const authenticate = useCallback(async (token: string) => {
    localStorage.setItem('accessToken', token)
    setLoading(true)
    try {
      const res = await api.get('/user/details')
      setUser(res.data)
    } catch (e: any) {
      setUser(null)
      localStorage.removeItem('accessToken')
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, login, logout, authenticate }),
    [user, loading, login, logout, authenticate]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}