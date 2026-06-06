'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem('vacation_auth') === '1')
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const { data } = await supabase.from('settings').select('password').single()

    if (data?.password === input) {
      sessionStorage.setItem('vacation_auth', '1')
      setAuthenticated(true)
    } else {
      setError(true)
      setInput('')
    }
    setLoading(false)
  }

  if (authenticated === null) return null

  if (authenticated) return <>{children}</>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">
          Heering Family Vacation
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">Enter the password to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none text-gray-800 text-base transition-colors"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">Incorrect password. Try again.</p>
          )}

          <button
            type="submit"
            disabled={loading || !input}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-base"
          >
            {loading ? 'Checking...' : "Let's Go →"}
          </button>
        </form>
      </div>
    </div>
  )
}
