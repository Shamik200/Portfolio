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
      case "mclaren":
        return <McLaren720S key={id} />
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
    }, 6000)
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
      } else if (newSequence.includes("mclaren") || newSequence.includes("720s")) {
        triggerEasterEgg("mclaren")
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

// ─── McLaren 720S Easter Egg ──────────────────────────────────────────────────
function McLaren720S() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dark overlay flash */}
      <motion.div
        className="absolute inset-0 bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      {/* Speed lines */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px"
          style={{
            top: `${15 + i * 6}%`,
            left: 0,
            right: 0,
            background: `linear-gradient(90deg, transparent, rgba(255,102,0,${0.15 + (i % 3) * 0.1}), transparent)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, delay: 0.1 + i * 0.04, ease: "easeOut" }}
        />
      ))}

      {/* The McLaren 720S */}
      <motion.div
        className="absolute"
        style={{ top: "38%", translateY: "-50%" }}
        initial={{ x: "-25vw", opacity: 0 }}
        animate={{ x: "110vw", opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 2.8, ease: [0.2, 0.8, 0.6, 1], delay: 0.15 }}
      >
        {/* Glow trail */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-10 rounded-full blur-xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,102,0,0.6))" }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />

        {/* Car SVG */}
        <svg
          viewBox="0 0 420 160"
          width="420"
          height="160"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 0 18px rgba(255,102,0,0.9)) drop-shadow(0 0 40px rgba(255,102,0,0.4))" }}
        >
          {/* Body shadow */}
          <ellipse cx="210" cy="148" rx="180" ry="10" fill="rgba(0,0,0,0.4)" />

          {/* Main body — low Papaya Orange McLaren profile */}
          <path
            d="M30,110 L50,90 L80,70 L130,52 L200,44 L270,44 L320,52 L370,72 L395,95 L400,110 Z"
            fill="url(#bodyGrad)"
          />

          {/* Roof/canopy */}
          <path
            d="M130,52 L155,28 L200,18 L245,18 L285,28 L320,52 Z"
            fill="url(#roofGrad)"
          />

          {/* Windshield */}
          <path
            d="M148,50 L168,28 L200,20 L240,20 L268,28 L285,50 Z"
            fill="rgba(120,200,255,0.18)"
            stroke="rgba(200,230,255,0.3)"
            strokeWidth="1"
          />

          {/* Side window */}
          <path
            d="M148,50 L155,35 L200,26 L240,26 L265,35 L285,50 Z"
            fill="rgba(100,180,240,0.12)"
          />

          {/* Dihedral door lines */}
          <path d="M130,52 L140,110" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" fill="none" />
          <path d="M320,52 L310,110" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" fill="none" />

          {/* Front splitter */}
          <path d="M25,110 L35,108 L55,110 L35,115 Z" fill="#111" />

          {/* Rear diffuser */}
          <path d="M370,108 L395,95 L400,115 L380,118 Z" fill="#1a1a1a" />

          {/* Front air intake */}
          <path d="M50,92 L75,82 L90,90 L65,98 Z" fill="rgba(0,0,0,0.6)" />

          {/* Side air vent */}
          <path d="M310,68 L340,68 L345,80 L308,80 Z" fill="rgba(0,0,0,0.5)" />

          {/* McLaren badge area */}
          <circle cx="215" cy="110" r="6" fill="#1a1a1a" stroke="#FF6600" strokeWidth="1" />
          <text x="215" y="114" textAnchor="middle" fontSize="5" fill="#FF6600" fontWeight="bold">M</text>

          {/* Front headlight */}
          <path d="M48,88 L75,80 L85,88 L60,94 Z" fill="url(#headlightGrad)" opacity="0.9" />
          {/* Headlight glow */}
          <ellipse cx="58" cy="88" rx="18" ry="5" fill="rgba(255,240,180,0.6)" />

          {/* Rear light strip */}
          <path d="M370,80 L392,95 L390,100 L368,86 Z" fill="url(#taillightGrad)" />

          {/* Front wheel arch */}
          <path
            d="M75,110 Q95,68 120,110 Z"
            fill="url(#archGrad)"
          />
          {/* Rear wheel arch */}
          <path
            d="M295,110 Q315,68 340,110 Z"
            fill="url(#archGrad)"
          />

          {/* Front wheel */}
          <circle cx="97" cy="118" r="26" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
          <circle cx="97" cy="118" r="18" fill="#222" />
          <circle cx="97" cy="118" r="10" fill="url(#wheelSpoke)" />
          {/* Spoke lines */}
          {[0,45,90,135].map((angle, i) => (
            <line
              key={i}
              x1={97 + Math.cos((angle * Math.PI)/180) * 10}
              y1={118 + Math.sin((angle * Math.PI)/180) * 10}
              x2={97 + Math.cos((angle * Math.PI)/180) * 17}
              y2={118 + Math.sin((angle * Math.PI)/180) * 17}
              stroke="#555" strokeWidth="2.5"
            />
          ))}
          <circle cx="97" cy="118" r="4" fill="#FF6600" />

          {/* Rear wheel */}
          <circle cx="318" cy="118" r="28" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
          <circle cx="318" cy="118" r="20" fill="#222" />
          <circle cx="318" cy="118" r="11" fill="url(#wheelSpoke)" />
          {[0,45,90,135].map((angle, i) => (
            <line
              key={i}
              x1={318 + Math.cos((angle * Math.PI)/180) * 11}
              y1={118 + Math.sin((angle * Math.PI)/180) * 11}
              x2={318 + Math.cos((angle * Math.PI)/180) * 19}
              y2={118 + Math.sin((angle * Math.PI)/180) * 19}
              stroke="#555" strokeWidth="2.5"
            />
          ))}
          <circle cx="318" cy="118" r="5" fill="#FF6600" />

          {/* Orange accent stripe */}
          <path
            d="M130,110 L320,110"
            stroke="#FF6600"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Brake disc glow */}
          <circle cx="97" cy="118" r="13" fill="none" stroke="rgba(255,100,0,0.2)" strokeWidth="3" />
          <circle cx="318" cy="118" r="15" fill="none" stroke="rgba(255,100,0,0.2)" strokeWidth="3" />

          {/* Defs */}
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6200" />
              <stop offset="40%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="#CC4400" />
            </linearGradient>
            <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF7400" />
              <stop offset="100%" stopColor="#CC4400" />
            </linearGradient>
            <linearGradient id="headlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFEEAA" />
            </linearGradient>
            <linearGradient id="taillightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF0000" />
              <stop offset="100%" stopColor="#FF4400" />
            </linearGradient>
            <linearGradient id="archGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#CC4400" />
              <stop offset="100%" stopColor="#881100" />
            </linearGradient>
            <radialGradient id="wheelSpoke" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#444" />
              <stop offset="100%" stopColor="#111" />
            </radialGradient>
          </defs>
        </svg>

        {/* Exhaust particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              background: `rgba(255,${80 + Math.floor(Math.random()*80)},0,0.7)`,
              right: `${-5 - i * 8}px`,
              top: `${80 + (Math.random() - 0.5) * 20}px`,
            }}
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{ opacity: 0, scale: 3, x: -30 }}
            transition={{ duration: 0.5 + Math.random() * 0.4, delay: i * 0.06 }}
          />
        ))}
      </motion.div>

      {/* "MCLAREN 720S" label */}
      <motion.div
        className="absolute"
        style={{ top: "calc(38% + 60px)", left: "50%", translateX: "-50%" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
        transition={{ duration: 2.8, delay: 0.6, times: [0, 0.2, 0.8, 1] }}
      >
        <div
          className="px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase"
          style={{
            background: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(255,102,0,0.6)",
            color: "#FF6600",
            letterSpacing: "0.2em",
            textShadow: "0 0 12px rgba(255,102,0,0.9)",
            boxShadow: "0 0 20px rgba(255,102,0,0.3)",
          }}
        >
          🏎 McLaren 720S — Papaya Orange
        </div>
      </motion.div>
    </div>
  )
}