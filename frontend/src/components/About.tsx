const stats = [
    { value: '3+', label: 'Live Production Apps' },
    { value: '40%', label: 'AI Latency Reduction' },
    { value: '25%', label: 'Pipeline Throughput ↑' },
    { value: '100+', label: 'Test Users Secured' },
]

const specialties = [
    {
        icon: '🤖',
        title: 'AI Integration',
        desc: 'Building AI-powered applications with Gemini AI, ControlNet, Stable Diffusion, NLP, and custom ML pipelines integrated into production systems.',
    },
    {
        icon: '⚙️',
        title: 'Full Stack Engineering',
        desc: 'End-to-end ownership from React 19 frontends to Python/Flask & Express.js backends, PostgreSQL databases, and Vercel/AWS deployments.',
    },
    {
        icon: '🔒',
        title: 'Security & Auth',
        desc: 'OAuth 2.0 multi-provider authentication, Supabase Row Level Security, JWT, AES/RSA cryptography, and CORS/Helmet.js hardening.',
    },
]

export default function About() {
    return (
        <section id="about" className="py-24 lg:py-32 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/5 to-transparent pointer-events-none" />

            <div className="section-container">
                {/* Speciality cards */}
                <div className="text-center mb-16">
                    <p className="section-label">SPECIALITY</p>
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                        My <span className="gradient-text">specialities</span>
                    </h2>
                    <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
                        From AI-powered backends to pixel-perfect frontends — I build full-stack products
                        that are live, scalable, and production-grade.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {specialties.map((item) => (
                        <div
                            key={item.title}
                            className="glass rounded-2xl p-8 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-600/10 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-600/30 flex items-center justify-center text-2xl mb-5 group-hover:bg-primary-600/30 transition-colors">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* About me section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Photo placeholder */}
                    <div className="relative">
                        <div className="glass rounded-3xl overflow-hidden aspect-[4/5] flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-transparent" />
                            <div className="text-center z-10 px-8">
                                <div className="w-24 h-24 rounded-full bg-primary-700/50 border-2 border-primary-500/40 mx-auto mb-4 flex items-center justify-center text-4xl">
                                    👨‍💻
                                </div>
                                <h3 className="text-white font-bold text-xl mb-2">Saurav Chopade</h3>
                                <p className="text-primary-300 text-sm mb-4">Full Stack Engineer</p>
                                <div className="flex justify-center gap-3">
                                    <a
                                        href="https://github.com/Sauravv8"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/50 hover:text-white transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/saurav-chopade-a377b0290"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/50 hover:text-primary-400 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Spinning badge */}
                            <div className="absolute bottom-8 right-8 w-20 h-20">
                                <div className="w-full h-full rounded-full border border-primary-500/40 animate-spin-slow flex items-center justify-center">
                                    <span className="text-primary-400 text-xs font-bold text-center">OCI<br/>CERT</span>
                                </div>
                            </div>
                        </div>

                        {/* Star decoration */}
                        <div className="absolute -top-4 -right-4 animate-float">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <path d="M14 0L15.5 12L28 14L15.5 16L14 28L12.5 16L0 14L12.5 12L14 0Z" fill="#8b5cf6" />
                            </svg>
                        </div>
                    </div>

                    {/* Text */}
                    <div>
                        <p className="section-label">ABOUT ME</p>
                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                            Building <span className="gradient-text">production-grade</span> products
                        </h2>
                        <p className="text-white/60 leading-relaxed mb-6">
                            I'm a Full Stack Engineer from Nagpur, Maharashtra, currently pursuing B.Tech in
                            Artificial Intelligence at GH Raisoni College (CGPA: 7.88). I'm currently interning
                            as a Full Stack AI/ML Engineer at Voice of Ether / Horizon Exhibits, Mumbai.
                        </p>
                        <p className="text-white/60 leading-relaxed mb-6">
                            I've built and shipped 3 production-grade applications — a Twilio + Gemini AI powered
                            cold calling platform, an OAuth 2.0 multi-provider image search platform with Supabase
                            Row Level Security, and an AI-driven interior design system. All are live on Vercel.
                        </p>
                        <p className="text-white/60 leading-relaxed mb-10">
                            Oracle Cloud AI Foundations Certified (OCI 2025). Passionate about system design,
                            microservices, and integrating AI into real-world products.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat) => (
                                <div key={stat.label} className="glass rounded-2xl p-5 text-center">
                                    <p className="text-3xl font-black gradient-text mb-1">{stat.value}</p>
                                    <p className="text-white/50 text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
