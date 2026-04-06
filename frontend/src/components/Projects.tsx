const projects = [
    {
        name: 'ColdCaller.io — AI Cold Calling Platform',
        description:
            'Full-stack cold calling app with React 19 + TypeScript frontend, Express.js/Node.js backend, and PostgreSQL. Twilio SDK for real-time voice calls, Gemini AI generating dynamic call scripts. Lead management with Excel import & analytics — reducing manual sales effort by ~60%.',
        technologies: ['React 19', 'TypeScript', 'Express.js', 'Twilio SDK', 'Gemini AI', 'PostgreSQL', 'Vite'],
        github: 'https://github.com/Sauravv8/Calling-Bot',
        live: 'https://calling-bot-pi.vercel.app',
        emoji: '📞',
    },
    {
        name: 'Image Search Platform — Multi-Provider OAuth',
        description:
            '97% TypeScript codebase. Multi-provider OAuth 2.0 (Google, Facebook, GitHub) via Supabase Auth with Row Level Security. Real-time Unsplash image search with trending analytics. Zero unauthorized access across 100+ test users.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'OAuth 2.0', 'PostgreSQL', 'Vercel'],
        github: 'https://github.com/Sauravv8/Image-Authentication',
        live: 'https://image-authentication.vercel.app',
        emoji: '🔍',
    },
    {
        name: 'AI-Driven Virtual Interior Design System',
        description:
            'Full-stack AI web app with Python/Flask backend + React.js frontend. Generates photorealistic interior designs from room images using ControlNet & Stable Diffusion. Optimized inference pipeline by ~40% via async processing and request caching.',
        technologies: ['Python', 'Flask', 'React.js', 'ControlNet', 'Stable Diffusion', 'OpenCV', 'NumPy'],
        github: 'https://github.com/Sauravv8/AI-Interior-Design',
        live: null,
        emoji: '🏠',
    },
    {
        name: 'AigentX — Web3 AI Agent Marketplace',
        description:
            'Production-grade decentralised marketplace for AI agent services. Smart contracts (ERC-20 token, Escrow, Staking), FastAPI backend with wallet authentication, and Next.js + Wagmi/RainbowKit frontend for Web3 interactions.',
        technologies: ['Solidity', 'TypeScript', 'Next.js', 'Wagmi', 'Hardhat', 'FastAPI'],
        github: 'https://github.com/Sauravv8/AigentX',
        live: null,
        emoji: '⛓️',
    },
    {
        name: 'Emotional Analysis — Bhagavad Gita AI',
        description:
            'AI-powered emotion analysis app that detects the user\'s emotional state and provides relevant solutions and guidance from the Bhagavad Gita. Built with TypeScript and React, deployed on Vercel.',
        technologies: ['TypeScript', 'React', 'NLP', 'AI', 'Emotion Detection'],
        github: 'https://github.com/Sauravv8/Emotional-analysis-v4',
        live: 'https://emotional-analysis-v4.vercel.app',
        emoji: '🧠',
    },
    {
        name: 'Ether Soul — Web3 Platform',
        description:
            'Web3 platform with blockchain integration featuring decentralized application architecture with smart contract interactions and a modern frontend.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Web3', 'Blockchain'],
        github: 'https://github.com/Sauravv8/Ether-Soul',
        live: 'https://ether-soul-vg86.vercel.app',
        emoji: '🌐',
    },
]

export default function Projects() {
    return (
        <section id="projects" className="py-24 lg:py-32 relative">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(109,40,217,0.06) 0%, transparent 70%)',
                }}
            />

            <div className="section-container">
                <div className="flex items-end justify-between mb-14">
                    <div>
                        <p className="section-label">PORTFOLIO</p>
                        <h2 className="text-4xl lg:text-5xl font-black text-white">
                            Featured <span className="gradient-text">Projects</span>
                        </h2>
                    </div>
                    <a
                        href="https://github.com/Sauravv8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-semibold transition-colors underline underline-offset-4"
                    >
                        View All on GitHub →
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.name}
                            className="glass rounded-2xl p-7 hover:border-primary-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-600/10 transition-all duration-300 group"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-600/30 flex items-center justify-center text-2xl group-hover:bg-primary-600/30 transition-colors">
                                    {project.emoji}
                                </div>
                                <div className="flex gap-3">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/30 hover:text-white transition-colors"
                                            aria-label="GitHub"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                            </svg>
                                        </a>
                                    )}
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/30 hover:text-primary-400 transition-colors"
                                            aria-label="Live demo"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-white font-bold text-lg mb-3 leading-tight">{project.name}</h3>
                            <p className="text-white/50 text-sm leading-relaxed mb-5">{project.description}</p>

                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs px-2.5 py-1 rounded-full bg-primary-600/10 border border-primary-600/20 text-primary-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10 sm:hidden">
                    <a
                        href="https://github.com/Sauravv8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline text-sm"
                    >
                        View All on GitHub →
                    </a>
                </div>

                {/* Resume Download */}
                <div className="mt-16 glass rounded-2xl p-8 text-center border border-primary-500/20">
                    <p className="text-white/50 text-sm mb-3">Want to know more about my work?</p>
                    <h3 className="text-2xl font-bold text-white mb-6">Download my Resume</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="http://localhost:8000/api/resume/Saurav_Chopade_FullStack.pdf"
                            download
                            className="btn-primary"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Full Stack Resume
                        </a>
                        <a
                            href="http://localhost:8000/api/resume/Saurav_Chopade_FrontendEngineer_Final.docx.pdf"
                            download
                            className="btn-outline"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Frontend Resume
                        </a>
                        <a
                            href="http://localhost:8000/api/resume/Saurav_Chopade_SoftwareEngineer_Final.pdf"
                            download
                            className="btn-outline"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Software Eng Resume
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
