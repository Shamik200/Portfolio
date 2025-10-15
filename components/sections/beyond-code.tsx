"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Mountain, Target, Dumbbell, Zap } from "lucide-react"

const interests = [
  {
    icon: Target,
    title: "Football",
    description: "Team strategy and quick decision-making on the field translate to collaborative problem-solving in development teams.",
    color: "from-green-400 to-emerald-600",
    emoji: "⚽",
    funFact: "Just like debugging, sometimes you need to think outside the box to score!"
  },
  {
    icon: Dumbbell,
    title: "Gym & Fitness",
    description: "Discipline and consistency in fitness routines mirror the dedication required for clean code and continuous learning.",
    color: "from-orange-400 to-red-600",
    emoji: "💪",
    funFact: "Lifting weights builds strength; lifting code quality builds careers."
  },
  {
    icon: Mountain,
    title: "Mountaineering",
    description: "Scaling peaks teaches resilience, planning, and problem-solving under pressure - essential skills for tackling complex systems.",
    color: "from-blue-400 to-indigo-600",
    emoji: "🏔️",
    funFact: "Every mountain peak reached is like solving a challenging algorithm - the view from the top is worth it!"
  }
]





export function BeyondCodeSection() {
  return (
    <section id="beyond-code" className="py-12 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-gray-900/95 to-black/90"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimized Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold mb-2">
            Beyond <span className="bg-gradient-to-r from-indigo-400 via-pink-400 to-teal-400 bg-clip-text text-transparent">Code</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Life experiences that shape my problem-solving approach
          </p>
        </motion.div>

        {/* Compact Interests Row */}
        <div className="flex justify-center items-center gap-6 flex-wrap">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 glass-card px-4 py-2 rounded-full"
            >
              <span className="text-xl">{interest.emoji}</span>
              <span className="text-sm font-medium text-foreground">{interest.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
