import { useEffect, useState } from 'react'

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? match[1] : undefined
}

const CsrfIndicator = () => {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const refresh = async () => {
    setLoading(true)
    try {
      await fetch('/csrf', { credentials: 'include' })
      setToken(getCookie('XSRF-TOKEN') || null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setToken(getCookie('XSRF-TOKEN') || null)
  }, [])

  if (!import.meta.env.DEV) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <div className="px-3 py-2 rounded-md shadow bg-white border text-xs text-gray-700 flex items-center gap-2">
        <span className="font-semibold">CSRF:</span>
        <span className={token ? 'text-green-600' : 'text-red-600'}>
          {token ? `present (${token.slice(0, 6)}…${token.slice(-4)})` : 'missing'}
        </span>
        <button
          onClick={refresh}
          disabled={loading}
          className="ml-2 px-2 py-1 rounded border bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </div>
  )
}

export default CsrfIndicator
