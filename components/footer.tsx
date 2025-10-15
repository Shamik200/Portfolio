"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="border-t border-gray-700/50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent mb-1">
              Shamik Munjani
            </h3>
            <p className="text-sm text-gray-400">Software Engineer • GenAI Developer</p>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center space-y-1"
          >
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Shamik Munjani. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Built with <span className="text-blue-400">Next.js</span> & <span className="text-blue-400">Framer Motion</span>
            </p>
          </motion.div>

          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
        </div>
      </div>
    </footer>
  )
}