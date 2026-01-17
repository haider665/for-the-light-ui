// import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'

// type User = {
//   name?: string
//   email?: string
//   picture?: string
//   sub?: string
//   roles?: string[]
// }

// type AuthContextValue = {
//   user: User | null
//   loading: boolean
//   login: () => void
//   logout: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextValue | undefined>(undefined)

// function getCookie(name: string): string | undefined {
//   const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
//   // Do NOT decode; Spring compares header to raw cookie value for CSRF
//   return match ? match[1] : undefined
// }

// // In dev, prefer relative paths so Vite proxy handles cookies as same-origin
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
// const base = (path: string) => `${BACKEND_URL}${path}`

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     let cancelled = false
//     ;(async () => {
//       try {
//         // Ensure CSRF cookie is issued early (harmless if CSRF disabled)
//         try { await fetch(base('/csrf'), { credentials: 'include' }) } catch {}
//         const res = await fetch(base('/user/details'), { credentials: 'include' })
//         if (!cancelled) {
//           if (res.ok) {
//             const data = await res.json()
//             setUser(data)
//           } else {
//             setUser(null)
//           }
//         }
//       } catch (e) {
//         if (!cancelled) setUser(null)
//       } finally {
//         if (!cancelled) setLoading(false)
//       }
//     })()
//     return () => {
//       cancelled = true
//     }
//   }, [])

//   const login = () => {
//     // Redirect to backend OAuth2 authorization endpoint
//     window.location.href = base('/oauth2/authorization/google')
//   }

//   const logout = async () => {
//     const csrfToken = getCookie('XSRF-TOKEN') || ''
//     try {
//       await fetch(base('/logout'), {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-XSRF-TOKEN': csrfToken,
//         },
//       })
//     } catch (e) {
//       // ignore network errors; still clear client state
//     } finally {
//       setUser(null)
//     }
//   }

//   const value = useMemo<AuthContextValue>(() => ({ user, loading, login, logout }), [user, loading])

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext)
//   if (!ctx) throw new Error('useAuth must be used within AuthProvider')
//   return ctx
// }


// import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'

// type User = {
//   name?: string
//   email?: string
//   picture?: string
//   sub?: string
//   roles?: string[]
// }

// type AuthContextValue = {
//   user: User | null
//   loading: boolean
//   login: () => void
//   logout: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextValue | undefined>(undefined)

// function getCookie(name: string): string | undefined {
//   const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
//   return match ? match[1] : undefined
// }

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
// const base = (path: string) => `${BACKEND_URL}${path}`

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     let cancelled = false
//     const fetchUser = async () => {
//       try {
//         // Fetch CSRF token first
//         await fetch(base('/csrf'), { credentials: 'include' })
        
//         // Then check user details
//         const res = await fetch(base('/user/details'), { credentials: 'include' })
//         if (!cancelled) {
//           if (res.ok) {
//             const data = await res.json()
//             setUser(data)
//           } else {
//             setUser(null)
//           }
//         }
//       } catch (e) {
//         if (!cancelled) setUser(null)
//       } finally {
//         if (!cancelled) setLoading(false)
//       }
//     }
    
//     fetchUser()
    
//     return () => {
//       cancelled = true
//     }
//   }, [])

//   const login = () => {
//     window.location.href = base('/oauth2/authorization/google')
//   }

//   const logout = async () => {
//     try {
//       // Ensure we have a fresh CSRF token
//       await fetch(base('/csrf'), { credentials: 'include' })
      
//       const csrfToken = getCookie('XSRF-TOKEN')
      
//       if (!csrfToken) {
//         console.error('No CSRF token found')
//         setUser(null)
//         return
//       }

//       const response = await fetch(base('/logout'), {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-XSRF-TOKEN': csrfToken,
//         },
//       })

//       if (!response.ok) {
//         console.error('Logout failed:', response.status)
//       }
//     } catch (e) {
//       console.error('Logout error:', e)
//     } finally {
//       setUser(null)
//     }
//   }

//   const value = useMemo<AuthContextValue>(
//     () => ({ user, loading, login, logout }),
//     [user, loading]
//   )

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext)
//   if (!ctx) throw new Error('useAuth must be used within AuthProvider')
//   return ctx
// }



import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from 'react'

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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const base = (path: string) => `${BACKEND_URL}${path}`

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