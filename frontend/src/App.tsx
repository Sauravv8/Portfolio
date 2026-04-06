import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Chat from './components/Chat'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './components/Admin'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkRoute = () => {
      setIsAdmin(window.location.hash === '#/admin' || window.location.pathname === '/admin')
    }
    checkRoute()
    window.addEventListener('hashchange', checkRoute)
    return () => window.removeEventListener('hashchange', checkRoute)
  }, [])

  if (isAdmin) {
    return <Admin />
  }

  return (
    <div className="min-h-screen bg-[#0a0a10] text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Chat />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
