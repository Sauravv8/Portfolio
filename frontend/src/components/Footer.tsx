const footerLinks = {
    'Quick Links': ['Home', 'Service', 'Projects', 'About', 'Client', 'Contact'],
    'Important': ['Privacy Policy', 'Terms & Service', 'Cookie Policy', 'Disclaimer'],
}

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="border-t border-white/5 pt-16 pb-8">
            <div className="section-container">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center text-sm font-black text-white">S</span>
                            <span className="gradient-text font-bold text-lg">Saurav Chopade</span>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed">
                            Full Stack Engineer building AI-powered applications, scalable APIs, and
                            production-grade web systems. Oracle Cloud AI Foundations Certified.
                        </p>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-white font-semibold text-sm mb-5">{title}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-white/40 hover:text-primary-400 text-sm transition-colors"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-5">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-white/40 text-sm">
                                <span className="mt-0.5">📞</span> +91-9284746564
                            </li>
                            <li className="flex items-start gap-2 text-white/40 text-sm">
                                <span className="mt-0.5">✉</span> sauravchopade33@gmail.com
                            </li>
                            <li className="flex items-start gap-2 text-white/40 text-sm">
                                <span className="mt-0.5">📍</span> Nagpur, Maharashtra, India
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/30 text-sm text-center sm:text-left">
                        © {year} Saurav Chopade. All rights reserved. Built with ❤️ using React + FastAPI.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://github.com/Sauravv8" target="_blank" rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-xs text-white/40 hover:text-white hover:border-primary-500/40 transition-all">
                            GH
                        </a>
                        <a href="https://linkedin.com/in/saurav-chopade-a377b0290" target="_blank" rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-xs text-white/40 hover:text-white hover:border-primary-500/40 transition-all">
                            in
                        </a>
                        <a href="mailto:sauravchopade33@gmail.com"
                            className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-xs text-white/40 hover:text-white hover:border-primary-500/40 transition-all">
                            ✉
                        </a>
                        <a href="#/admin"
                            className="w-8 h-8 rounded-full glass border border-white/5 flex items-center justify-center text-xs text-white/10 hover:text-white/30 hover:border-white/20 transition-all"
                            title="Admin">
                            ⚙
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
