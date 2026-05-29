"use client"

import { motion } from "framer-motion"
import { ArrowDown, ExternalLink, Mountain } from "lucide-react"



export function HeroSection() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-gray-900/95 to-black/90"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Name with epic entrance */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-white">
              Shamik
            </span>{" "}
            <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Munjani
            </span>
          </motion.h1>

          {/* Professional tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/50 border border-gray-700/50 rounded-full text-lg sm:text-xl font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
              <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent font-semibold">
                GenAI & Agentic AI | Machine Learning & Deep Learning | Competitive Programming
              </span>
            </div>
          </motion.div>

          {/* Epic description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg sm:text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
              Crafting intelligent solutions with{" "}
            </span>
            <span className="bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent font-semibold">Machine Learning & Deep Learning</span>
            <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
              , building next-gen{" "}
            </span>
            <span className="bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent font-semibold">GenAI applications</span>
            <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
              , and conquering{" "}
            </span>
            <span className="bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent font-semibold">algorithmic challenges</span>
            <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">.</span>
          </motion.p>

          {/* CTA Button - Download Resume */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center mb-16"
          >
            <motion.a
              href="/Resume.pdf"
              download="Shamik_Munjani_Resume.pdf"
              className="modern-button group relative px-10 py-5 rounded-xl font-bold text-xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative flex items-center gap-3 text-white font-bold">
                <Mountain className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                Download Resume
                <ExternalLink className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-gray-400 mb-4 text-sm">Scroll to discover more</p>
            <motion.button
              onClick={() => handleScroll("about")}
              className="p-3 rounded-full border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all backdrop-blur-sm"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
              aria-label="Scroll down"
            >
              <ArrowDown className="h-5 w-5 text-white" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}