import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from 'react'
import { API_BASE_URL } from '../config/api'

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
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? match[1] : undefined
}


const base = (path: string) => `${API_BASE_URL}${path}`

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const fetchUser = async () => {
      try {
        // Fetch CSRF token first to ensure the cookie is set
        await fetch(base('/csrf'), { credentials: 'include' })

        // Then fetch user details
        const res = await fetch(base('/user/details'), { credentials: 'include' })
        if (!cancelled) {
          if (res.ok) {
            const data = await res.json()
            setUser(data)
          } else {
            setUser(null)
          }
        }
      } catch (e) {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchUser()

    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(() => {
    window.location.href = base('/oauth2/authorization/google')
  }, [])

  const logout = useCallback(async () => {
    try {
      const csrfToken = getCookie('XSRF-TOKEN')

      if (!csrfToken) {
        console.error('No CSRF token found')
        setUser(null)
        return
      }

      const response = await fetch(base('/logout'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken,
        },
      })

      if (!response.ok) {
        console.error('Logout failed:', response.status)
      }
    } catch (e) {
      console.error('Logout error:', e)
    } finally {
      setUser(null)
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, login, logout }),
    [user, loading, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}