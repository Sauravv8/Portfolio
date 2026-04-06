import { useState } from 'react'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'
            const res = await fetch(`${API_BASE}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
            if (!res.ok) throw new Error('Failed to send')
            setSent(true)
            setForm({ name: '', email: '', message: '' })
            setTimeout(() => setSent(false), 4000)
        } catch (e) {
            setError('Something went wrong. Please email directly.')
        } finally {
            setLoading(false)
        }
    }

    const socials = [
        { icon: 'in', label: 'LinkedIn', href: 'https://linkedin.com/in/saurav-chopade-a377b0290' },
        { icon: '⌂', label: 'GitHub', href: 'https://github.com/Sauravv8' },
        { icon: '✉', label: 'Email', href: 'mailto:sauravchopade33@gmail.com' },
    ]

    return (
        <section id="contact" className="py-24 lg:py-32 relative">
            {/* "Have any project idea?" banner */}
            <div className="section-container mb-16">
                <div
                    className="rounded-3xl p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(109,40,217,0.4) 0%, rgba(49,10,120,0.5) 100%)',
                        border: '1px solid rgba(139,92,246,0.3)',
                    }}
                >
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-800/30 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 text-center lg:text-left">
                        <div className="text-4xl mb-3">🚀</div>
                        <h3 className="text-3xl lg:text-4xl font-black text-white mb-2">
                            Have any project idea?
                        </h3>
                        <p className="text-white/60 max-w-md">
                            Let's build something amazing together. I'm available for freelance projects and collaborations.
                        </p>
                    </div>
                    <a href="mailto:sauravchopade33@gmail.com" className="btn-primary relative z-10 whitespace-nowrap">
                        Contact Now →
                    </a>
                </div>
            </div>

            {/* Contact form + info */}
            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left — info */}
                    <div>
                        <p className="section-label">GET IN TOUCH</p>
                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                            Let's <span className="gradient-text">Connect</span>
                        </h2>
                        <p className="text-white/50 leading-relaxed mb-10">
                            Ready to start a project? Have a question? Feel free to reach out through the form or
                            any of the channels below.
                        </p>

                        <div className="space-y-5">
                            <div className="flex items-center gap-4 glass rounded-xl p-4 border border-white/5">
                                <div className="w-10 h-10 rounded-lg bg-primary-600/20 border border-primary-600/30 flex items-center justify-center text-lg shrink-0">📧</div>
                                <div>
                                    <p className="text-white/40 text-xs mb-0.5">EMAIL</p>
                                    <p className="text-white font-medium text-sm">sauravchopade33@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 glass rounded-xl p-4 border border-white/5">
                                <div className="w-10 h-10 rounded-lg bg-primary-600/20 border border-primary-600/30 flex items-center justify-center text-lg shrink-0">📞</div>
                                <div>
                                    <p className="text-white/40 text-xs mb-0.5">PHONE</p>
                                    <p className="text-white font-medium text-sm">+91-9284746564</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 glass rounded-xl p-4 border border-white/5">
                                <div className="w-10 h-10 rounded-lg bg-primary-600/20 border border-primary-600/30 flex items-center justify-center text-lg shrink-0">📍</div>
                                <div>
                                    <p className="text-white/40 text-xs mb-0.5">LOCATION</p>
                                    <p className="text-white font-medium text-sm">Nagpur, Maharashtra, India</p>
                                </div>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="flex gap-3 mt-8">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-sm text-white/60 hover:text-white hover:border-primary-500/50 hover:bg-primary-600/20 transition-all duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right — form */}
                    <div>
                        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 border border-white/10 space-y-5">
                            {sent && (
                                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-emerald-300 text-sm animate-fade-in">
                                    ✅ Message sent! I'll get back to you soon.
                                </div>
                            )}
                            {error && (
                                <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-300 text-sm animate-fade-in">
                                    ⚠️ {error}
                                </div>
                            )}
                            <div>
                                <label className="text-white/50 text-xs block mb-2">YOUR NAME</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-primary-500/60 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-white/50 text-xs block mb-2">EMAIL ADDRESS</label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="john@example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-primary-500/60 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-white/50 text-xs block mb-2">YOUR MESSAGE</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    placeholder="Tell me about your project..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-primary-500/60 transition-colors resize-none"
                                />
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
                                {loading ? 'Sending...' : 'Send Message'}
                                {!loading && (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
