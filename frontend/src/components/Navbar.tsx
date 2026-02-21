import { useState, useEffect } from 'react'

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Chat AI', href: '#chat' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-dark-200/90 backdrop-blur-lg border-b border-white/5 shadow-xl shadow-black/20'
                    : 'bg-transparent'
                }`}
        >
            {/* Top info bar */}
            <div className="hidden lg:flex items-center justify-between px-8 py-2 text-xs text-white/40 border-b border-white/5">
                <div className="flex items-center gap-6">
                    <span>in</span>
                    <span>f</span>
                    <span>t</span>
                    <span>✉</span>
                </div>
                <div className="flex items-center gap-8">
                    <span>+123-456-789</span>
                    <span>example@gmail.com</span>
                    <span>13/1 Eye St, Co. to, Delaware</span>
                </div>
            </div>

            {/* Main nav */}
            <nav className="flex items-center justify-between px-6 lg:px-8 py-4">
                {/* Logo */}
                <a href="#home" className="flex items-center gap-2 text-white font-bold text-lg">
                    <span className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center text-sm font-black">S</span>
                    <span className="gradient-text">designer</span>
                </a>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-sm text-white/70 hover:text-white transition-colors duration-200 relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary-500 transition-all duration-300 group-hover:w-full" />
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a href="#contact" className="hidden md:inline-flex btn-primary text-sm">
                    Discuss Projects
                </a>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="w-6 flex flex-col gap-1.5">
                        <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden glass border-t border-white/10 px-6 py-4">
                    <ul className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-white/80 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary text-sm w-full text-center">
                                Discuss Projects
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )
}
