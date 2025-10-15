"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "../src/lib/utils"

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Competitive", href: "#competitive-programming" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleActiveSection = () => {
      const sections = navigation.map(item => item.href.slice(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", handleActiveSection)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleActiveSection)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <nav className={cn(
        "rounded-full px-8 py-4 transition-all duration-300 shadow-2xl",
        isScrolled 
          ? "bg-black/90 backdrop-blur-xl border border-gray-700/50" 
          : "bg-black/20 backdrop-blur-md border border-gray-700/30"
      )}>
        <div className="flex items-center justify-center space-x-2">
          {/* Navigation Items */}
          {navigation.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={cn(
                "relative px-6 py-3 text-sm font-medium rounded-full transition-all duration-300",
                activeSection === item.href.slice(1)
                  ? "text-white bg-white/10 backdrop-blur-sm shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{item.name}</span>
              {activeSection === item.href.slice(1) && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full border border-blue-400/40"
                  layoutId="activeNavPill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </nav>
    </motion.header>
  )
}