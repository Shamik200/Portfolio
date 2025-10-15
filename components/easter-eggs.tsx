"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface EasterEgg {
  id: string
  isActive: boolean
  component: React.ReactNode
}

export function EasterEggs() {
  const [easterEggs, setEasterEggs] = useState<EasterEgg[]>([])
  const [keySequence, setKeySequence] = useState<string>("")

  const getEasterEggComponent = (type: string, id: string) => {
    switch (type) {
      case "dumbbell":
        return <DumbbellAnimation key={id} />
      case "snowfall":
        return <SnowfallEffect key={id} />
      case "football":
        return <BouncingFootball key={id} />
      case "climbing":
        return <ClimbingAnimation key={id} />
      default:
        return null
    }
  }

  const triggerEasterEgg = useCallback((type: string) => {
    const id = `${type}-${Date.now()}`
    const newEgg: EasterEgg = {
      id,
      isActive: true,
      component: getEasterEggComponent(type, id)
    }

    setEasterEggs(prev => [...prev, newEgg])

    // Remove after animation
    setTimeout(() => {
      setEasterEggs(prev => prev.filter(egg => egg.id !== id))
    }, 5000)
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const newSequence = (keySequence + event.key).toLowerCase().slice(-10) // Keep last 10 chars
      setKeySequence(newSequence)

      // Check for easter egg triggers
      if (newSequence.includes("gym")) {
        triggerEasterEgg("dumbbell")
      } else if (newSequence.includes("mountain")) {
        triggerEasterEgg("climbing")
      } else if (newSequence.includes("football")) {
        triggerEasterEgg("football")
      } else if (newSequence.includes("snow")) {
        triggerEasterEgg("snowfall")
      }
    }

    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [keySequence, triggerEasterEgg])

  // Handle mountain peak clicks
  useEffect(() => {
    const handleMountainClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.closest('.mountain-peak')) {
        triggerEasterEgg("climbing")
      }
    }

    document.addEventListener("click", handleMountainClick)
    return () => document.removeEventListener("click", handleMountainClick)
  }, [triggerEasterEgg])

  // Handle double-clicks for hidden football
  useEffect(() => {
    const handleDoubleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.tagName === "BODY" || target.closest("section")) {
        triggerEasterEgg("football")
      }
    }

    document.addEventListener("dblclick", handleDoubleClick)
    return () => document.removeEventListener("dblclick", handleDoubleClick)
  }, [triggerEasterEgg])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {easterEggs.map(egg => (
          <div key={egg.id}>
            {egg.component}
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function DumbbellAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: "50vw", y: "50vh" }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0],
        y: ["50vh", "30vh", "20vh", "10vh"],
        rotate: [0, 180, 360]
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeOut" }}
      className="absolute"
    >
      <div className="relative">
        {/* Dumbbell */}
        <div className="w-20 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full relative">
          <div className="absolute -left-3 top-0 w-6 h-6 bg-orange-600 rounded" />
          <div className="absolute -right-3 top-0 w-6 h-6 bg-orange-600 rounded" />
        </div>
        
        {/* Sparks */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos(i * 45) * 30,
              y: Math.sin(i * 45) * 30,
              opacity: 0
            }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

function SnowfallEffect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 4 }}
      className="absolute inset-0 bg-blue-900/20"
    >
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-80"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
          }}
          initial={{ y: -20, rotate: 0 }}
          animate={{ 
            y: "110vh",
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 360],
            opacity: [0.8, 1, 0.3]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            delay: Math.random() * 2,
            ease: "linear",
            repeat: Infinity
          }}
        />
      ))}
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white text-4xl font-bold text-center"
        >
          ❄️ Mountain Snow Mode! 🏔️
        </motion.div>
      </div>
    </motion.div>
  )
}

function BouncingFootball() {
  return (
    <motion.div
      initial={{ x: "-10vw", y: "80vh", rotate: 0 }}
      animate={{ 
        x: ["0vw", "20vw", "40vw", "60vw", "80vw", "100vw"],
        y: ["80vh", "60vh", "70vh", "55vh", "65vh", "75vh"],
        rotate: [0, 180, 360, 540, 720, 900]
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 4, ease: "easeOut" }}
      className="absolute"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-white via-gray-100 to-gray-300 rounded-full relative border-2 border-black">
        {/* Football pattern */}
        <div className="absolute inset-0 rounded-full">
          <div className="absolute top-1/4 left-1/2 w-6 h-0.5 bg-black transform -translate-x-1/2 rotate-45" />
          <div className="absolute top-1/4 left-1/2 w-6 h-0.5 bg-black transform -translate-x-1/2 -rotate-45" />
          <div className="absolute bottom-1/4 left-1/2 w-6 h-0.5 bg-black transform -translate-x-1/2 rotate-45" />
          <div className="absolute bottom-1/4 left-1/2 w-6 h-0.5 bg-black transform -translate-x-1/2 -rotate-45" />
        </div>
      </div>
      
      {/* Trail effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-20 h-1 bg-gradient-to-r from-green-400 to-transparent rounded-full transform -translate-y-1/2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

function ClimbingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 4 }}
      className="absolute bottom-0 left-1/3 w-32 h-32"
    >
      {/* Mountain climber */}
      <motion.div
        initial={{ y: 20, x: 0 }}
        animate={{ 
          y: [20, 0, -10, -20, -30],
          x: [0, 5, 10, 15, 20]
        }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute bottom-0"
      >
        <div className="w-6 h-6 bg-orange-500 rounded-full relative">
          {/* Climber body */}
          <div className="absolute top-6 left-1/2 w-0.5 h-8 bg-orange-600 transform -translate-x-1/2" />
          <div className="absolute top-8 left-0 w-4 h-0.5 bg-orange-600 transform rotate-45" />
          <div className="absolute top-8 right-0 w-4 h-0.5 bg-orange-600 transform -rotate-45" />
          <div className="absolute top-12 left-0 w-4 h-0.5 bg-orange-600 transform rotate-15" />
          <div className="absolute top-12 right-0 w-4 h-0.5 bg-orange-600 transform -rotate-15" />
        </div>
      </motion.div>

      {/* Success message */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap"
      >
        🏔️ Summit Reached! 🏔️
      </motion.div>

      {/* Climbing rope */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-0.5 bg-gray-600 transform -translate-x-1/2"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 2 }}
      />
    </motion.div>
  )
}