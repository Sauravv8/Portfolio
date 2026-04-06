import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

interface Profile {
  label: string
  resume_pdf: string
}

interface Config {
  active_profile: string
  profiles: Record<string, Profile>
  active_data: Record<string, unknown>
}

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border animate-fade-in ${
      type === 'success' 
        ? 'bg-emerald-900/90 border-emerald-500/30 text-emerald-300' 
        : 'bg-red-900/90 border-red-500/30 text-red-300'
    }`}>
      <span>{type === 'success' ? '✓' : '✕'}</span>
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)
  const [config, setConfig] = useState<Config | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [activeTab, setActiveTab] = useState<'profiles' | 'preview'>('profiles')
  const [switching, setSwitching] = useState(false)
  const [uploadingFor, setUploadingFor] = useState<string | null>(null)
  const [photoUploading, setPhotoUploading] = useState(false)

  // Check saved session
  useEffect(() => {
    const savedPwd = sessionStorage.getItem('admin_pwd')
    if (savedPwd) {
      setPassword(savedPwd)
      loginWithPassword(savedPwd)
    }
  }, [])

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
  }

  const loginWithPassword = async (pwd: string) => {
    setLoading(true)
    setLoginError('')
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      })
      if (!res.ok) throw new Error('Invalid password')
      sessionStorage.setItem('admin_pwd', pwd)
      setIsLoggedIn(true)
      fetchConfig(pwd)
    } catch {
      setLoginError('Invalid admin password. Please try again.')
      sessionStorage.removeItem('admin_pwd')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    loginWithPassword(password)
  }

  const fetchConfig = async (pwd: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/config`, {
        headers: { 'x-admin-password': pwd },
      })
      if (!res.ok) throw new Error('Failed to fetch config')
      const data = await res.json()
      setConfig(data)
    } catch (e) {
      showToast('Failed to load admin config', 'error')
    }
  }

  const switchProfile = async (profileKey: string) => {
    setSwitching(true)
    try {
      const res = await fetch(`${API_BASE}/api/admin/switch-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ profile_key: profileKey }),
      })
      if (!res.ok) throw new Error('Failed to switch profile')
      showToast(`Switched to "${config?.profiles[profileKey]?.label}" profile! AI chat will now use this resume.`, 'success')
      await fetchConfig(password)
    } catch {
      showToast('Failed to switch profile', 'error')
    } finally {
      setSwitching(false)
    }
  }

  const uploadResumePDF = async (profileKey: string, file: File) => {
    setUploadingFor(profileKey)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${API_BASE}/api/admin/upload-resume/${profileKey}`, {
        method: 'POST',
        headers: { 'x-admin-password': password },
        body: formData,
      })
      if (!res.ok) throw new Error('Upload failed')
      showToast(`Resume PDF uploaded for ${config?.profiles[profileKey]?.label}!`, 'success')
      await fetchConfig(password)
    } catch {
      showToast('Failed to upload resume PDF', 'error')
    } finally {
      setUploadingFor(null)
    }
  }

  const uploadProfilePhoto = async (file: File) => {
    setPhotoUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${API_BASE}/api/admin/upload-photo`, {
        method: 'POST',
        headers: { 'x-admin-password': password },
        body: formData,
      })
      if (!res.ok) throw new Error('Upload failed')
      showToast('Profile photo updated successfully!', 'success')
      // force reload image by triggering re-render if needed, but it's statically requested
    } catch {
      showToast('Failed to upload profile photo', 'error')
    } finally {
      setPhotoUploading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_pwd')
    setIsLoggedIn(false)
    setPassword('')
    setConfig(null)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a10] flex items-center justify-center px-4">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-600/20 border border-primary-600/30 flex items-center justify-center text-3xl mx-auto mb-4">
              🔐
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Admin Panel</h1>
            <p className="text-white/50 text-sm">Saurav Chopade's Portfolio Management</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="glass rounded-2xl p-8 border border-white/10"
          >
            <label className="block text-white/70 text-sm font-medium mb-2">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password…"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors mb-4"
              id="admin-password-input"
            />
            {loginError && (
              <p className="text-red-400 text-xs mb-4">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full btn-primary justify-center disabled:opacity-40"
              id="admin-login-btn"
            >
              {loading ? 'Logging in…' : 'Login to Admin Panel'}
            </button>
            <a
              href="/"
              className="block text-center text-white/30 text-xs hover:text-white/60 mt-4 transition-colors"
            >
              ← Back to Portfolio
            </a>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a10] text-white">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="border-b border-white/8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-600/30 border border-primary-600/40 flex items-center justify-center text-sm">
              🎛️
            </div>
            <div>
              <h1 className="text-white font-bold text-sm">Portfolio Admin</h1>
              <p className="text-white/40 text-xs">Saurav Chopade</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-xs text-white/40 hover:text-white/70 transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
            >
              ← View Site
            </a>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg border border-red-500/20 hover:border-red-500/40"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['profiles', 'preview'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-primary-600/30 border border-primary-500/40 text-primary-300'
                  : 'text-white/40 hover:text-white/70 border border-transparent hover:border-white/10'
              }`}
            >
              {tab === 'profiles' ? '👤 Resume Profiles' : '👁️ Active Resume JSON'}
            </button>
          ))}
        </div>

        {/* Profiles Tab */}
        {activeTab === 'profiles' && config && (
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 border border-white/10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Resume Profiles & Assets</h2>
                  <p className="text-white/50 text-sm">
                    Switch AI focus between profiles, upload fresh PDFs, or update your main profile photo.
                  </p>
                </div>
                
                {/* Photo Upload standalone button */}
                <label className="shrink-0">
                  <span className="sr-only">Upload Profile Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    id="upload-photo-btn"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) uploadProfilePhoto(file)
                    }}
                  />
                  <label
                    htmlFor="upload-photo-btn"
                    className={`btn-primary px-5 py-2 cursor-pointer flex items-center justify-center gap-2 ${
                      photoUploading ? 'opacity-50 cursor-wait' : ''
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {photoUploading ? 'Uploading...' : 'Change Profile Photo'}
                  </label>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(config.profiles).map(([key, profile]) => {
                  const isActive = config.active_profile === key
                  return (
                    <div
                      key={key}
                      className={`rounded-2xl p-6 border transition-all ${
                        isActive
                          ? 'bg-primary-600/15 border-primary-500/40'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className={`text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block ${
                            isActive
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-white/5 text-white/30 border border-white/10'
                          }`}>
                            {isActive ? '● ACTIVE' : '○ INACTIVE'}
                          </div>
                          <h3 className="text-white font-bold text-base">{profile.label}</h3>
                          <p className="text-white/40 text-xs mt-1 truncate max-w-[160px]">{profile.resume_pdf}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {!isActive && (
                          <button
                            onClick={() => switchProfile(key)}
                            disabled={switching}
                            className="w-full btn-primary justify-center text-sm py-2 disabled:opacity-40"
                          >
                            {switching ? 'Switching…' : 'Set as Active'}
                          </button>
                        )}
                        {isActive && (
                          <div className="w-full text-center text-emerald-400 text-sm font-medium py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            ✓ Currently Active
                          </div>
                        )}

                        {/* PDF Upload */}
                        <label className="block">
                          <span className="sr-only">Upload new PDF for {profile.label}</span>
                          <input
                            type="file"
                            accept=".pdf"
                            className="sr-only"
                            id={`upload-${key}`}
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) uploadResumePDF(key, file)
                            }}
                          />
                          <label
                            htmlFor={`upload-${key}`}
                            className={`flex items-center justify-center gap-2 w-full text-sm px-4 py-2 rounded-xl border cursor-pointer transition-all ${
                              uploadingFor === key
                                ? 'border-primary-500/20 text-primary-400/50'
                                : 'border-white/10 text-white/40 hover:border-primary-500/30 hover:text-primary-300'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            {uploadingFor === key ? 'Uploading…' : 'Upload New PDF'}
                          </label>
                        </label>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Info Banner */}
            <div className="glass rounded-2xl p-5 border border-primary-500/20 flex items-start gap-4">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">How it works</h3>
                <ul className="text-white/50 text-xs space-y-1">
                  <li>• The AI chat on the portfolio reads the <strong className="text-white/70">active profile</strong> for every visitor question</li>
                  <li>• Switching profiles takes effect <strong className="text-white/70">instantly</strong> — no server restart needed</li>
                  <li>• Upload a new PDF to update the stored filename (raw content is in the JSON profiles)</li>
                  <li>• Your admin password is: <code className="bg-white/10 px-1 rounded">Saurav@Admin2025</code> — change it in <code className="bg-white/10 px-1 rounded">backend/.env</code></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && config && (
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Active Resume Data</h2>
                <p className="text-white/40 text-sm">
                  Profile: <span className="text-primary-300">{config.profiles[config.active_profile]?.label}</span>
                </p>
              </div>
              <button
                onClick={() => fetchConfig(password)}
                className="text-xs text-white/40 hover:text-white/70 transition-colors px-3 py-1.5 rounded-lg border border-white/10"
              >
                Refresh
              </button>
            </div>
            <pre className="bg-black/30 rounded-xl p-4 text-xs text-white/60 overflow-auto max-h-[600px] border border-white/5 leading-relaxed">
              {JSON.stringify(config.active_data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
