import { useEffect, useState } from 'react'

const roles = [
    'Full Stack Engineer',
    'AI/ML Developer',
    'Frontend Engineer',
    'Software Engineer',
    'Python Developer',
]

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [typing, setTyping] = useState(true)

    useEffect(() => {
        const current = roles[roleIndex]
        let timeout: ReturnType<typeof setTimeout>

        if (typing) {
            if (displayed.length < current.length) {
                timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70)
            } else {
                timeout = setTimeout(() => setTyping(false), 1800)
            }
        } else {
            if (displayed.length > 0) {
                timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
            } else {
                setRoleIndex((i) => (i + 1) % roles.length)
                setTyping(true)
            }
        }

        return () => clearTimeout(timeout)
    }, [displayed, typing, roleIndex])

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{
                background:
                    'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109,40,217,0.35) 0%, transparent 70%), #0a0a10',
            }}
        >
            {/* Decorative stars */}
            <div className="absolute top-32 right-24 animate-float" style={{ animationDelay: '0s' }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 0L18 14L32 16L18 18L16 32L14 18L0 16L14 14L16 0Z" fill="#8b5cf6" />
                </svg>
            </div>
            <div className="absolute top-64 left-12 animate-float" style={{ animationDelay: '1s' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 0L10 8L18 9L10 10L9 18L8 10L0 9L8 8L9 0Z" fill="#a78bfa" opacity="0.6" />
                </svg>
            </div>
            <div className="absolute bottom-40 right-40 animate-float" style={{ animationDelay: '2s' }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 0L12.5 9L22 11L12.5 13L11 22L9.5 13L0 11L9.5 9L11 0Z" fill="#7c3aed" opacity="0.5" />
                </svg>
            </div>

            {/* Decorative circle & Photo */}
            <div className="absolute right-8 lg:right-32 top-1/2 -translate-y-1/2 w-56 h-56 lg:w-80 lg:h-80 opacity-90 transition-opacity duration-1000">
                <div className="w-full h-full rounded-full border border-primary-500/30 absolute inset-0 animate-spin-slow pointer-events-none" />
                <div className="absolute inset-4 rounded-full border border-primary-400/20 pointer-events-none z-0" />
                
                {/* Profile Photo */}
                <div className="absolute inset-2 lg:inset-4 rounded-full overflow-hidden bg-primary-900/20 z-10 p-1 glass">
                    <img
                        src={`http://localhost:8000/static/profile.jpg`}
                        alt="Saurav Chopade"
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                            // If no photo is uploaded yet, hide the img
                            e.currentTarget.style.display = 'none'
                        }}
                    />
                </div>
            </div>

            <div className="section-container w-full pt-32 pb-20 lg:pb-32">
                <div className="max-w-2xl animate-fade-in">
                    {/* Subtitle */}
                    <p className="section-label mb-6">Available for work</p>

                    {/* Name */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-2">
                        Hi, I'm
                    </h1>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black gradient-text leading-tight mb-6">
                        Saurav Chopade
                    </h2>

                    {/* Animated role */}
                    <p className="text-lg sm:text-xl text-white/70 font-medium mb-4 h-8">
                        <span className="text-primary-300">{displayed}</span>
                        <span className="animate-pulse">|</span>
                    </p>

                    {/* Description */}
                    <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-lg mb-10">
                        Full Stack Engineer with end-to-end ownership of 3 live production applications.
                        Passionate about building scalable AI-powered products.
                        Oracle Cloud AI Foundations Certified.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4">
                        <a href="#contact" className="btn-primary">
                            Hire Me
                        </a>
                        <a
                            href="https://github.com/Sauravv8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                        <a href="#projects" className="btn-outline">
                            View Projects
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a10] to-transparent pointer-events-none" />
        </section>
    )
}
