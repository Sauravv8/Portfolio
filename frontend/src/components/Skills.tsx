const skillCategories = [
    {
        icon: '🤖',
        title: 'AI & Machine Learning',
        color: 'from-violet-600/30 to-purple-600/10',
        border: 'border-violet-500/30',
        skills: ['Stable Diffusion', 'ControlNet', 'LangChain', 'OpenRouter', 'Prompt Engineering'],
    },
    {
        icon: '⚙️',
        title: 'Backend Development',
        color: 'from-purple-600/30 to-indigo-600/10',
        border: 'border-purple-500/30',
        skills: ['Python', 'FastAPI', 'Flask', 'SQLAlchemy', 'PostgreSQL', 'REST APIs'],
    },
    {
        icon: '🎨',
        title: 'Frontend Development',
        color: 'from-indigo-600/30 to-blue-600/10',
        border: 'border-indigo-500/30',
        skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Vite', 'Axios'],
    },
    {
        icon: '🚀',
        title: 'DevOps & Tools',
        color: 'from-fuchsia-600/30 to-pink-600/10',
        border: 'border-fuchsia-500/30',
        skills: ['Docker', 'Git', 'Linux', 'Cloudflare', 'Uvicorn', 'GitHub Actions'],
    },
]

export default function Skills() {
    return (
        <section id="skills" className="py-24 lg:py-32 relative">
            <div className="section-container">
                <div className="text-center mb-16">
                    <p className="section-label">EXPERTISE</p>
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                        My <span className="gradient-text">skills</span>
                    </h2>
                    <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
                        Technologies I work with daily to build production-grade AI applications and web services.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {skillCategories.map((cat) => (
                        <div
                            key={cat.title}
                            className={`relative rounded-2xl bg-gradient-to-b ${cat.color} border ${cat.border} p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-primary-600/10 group overflow-hidden`}
                        >
                            {/* Glow blob */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="text-3xl mb-4">{cat.icon}</div>
                            <h3 className="text-white font-bold text-sm mb-4 leading-tight">{cat.title}</h3>

                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-primary-300 hover:border-primary-500/40 transition-all duration-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
