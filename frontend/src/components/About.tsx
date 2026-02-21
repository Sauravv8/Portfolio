const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Delivered' },
    { value: '10+', label: 'Happy Clients' },
    { value: '5+', label: 'AI Systems Built' },
]

const process = [
    {
        icon: '📧',
        title: 'Email Marketing',
        desc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
        icon: '📊',
        title: 'Market Analysis',
        desc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
        icon: '🔑',
        title: 'Keyword Research',
        desc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
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
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                        consequat duis enim velit mollit. Exercitation veniam.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {process.map((item) => (
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
                            <div className="text-center z-10">
                                <div className="w-24 h-24 rounded-full bg-primary-700/50 border-2 border-primary-500/40 mx-auto mb-4 flex items-center justify-center text-4xl">
                                    👨‍💻
                                </div>
                                <span className="text-white/30 text-sm">Saurav's Photo</span>
                            </div>

                            {/* Spinning badge */}
                            <div className="absolute bottom-8 right-8 w-20 h-20">
                                <div className="w-full h-full rounded-full border border-primary-500/40 animate-spin-slow flex items-center justify-center">
                                    <span className="text-primary-400 text-xs font-bold">SKILLED</span>
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
                            My <span className="gradient-text">work process</span>
                        </h2>
                        <p className="text-white/60 leading-relaxed mb-6">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                            consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                        </p>
                        <p className="text-white/60 leading-relaxed mb-10">
                            I specialise in building AI-powered web applications — bridging intelligent backend
                            services with clean, performant frontends. My stack spans FastAPI, React, TypeScript,
                            and cutting-edge AI frameworks.
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
