"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ExternalLink, Github, Eye, TrendingUp, Brain, Search } from "lucide-react"
import { projects } from "../../src/lib/data"
import { Project } from "../../src/lib/types"

// Project-specific animations and icons
const projectAnimations = {
  1: { // InvestIQ Trading Bot
    icon: TrendingUp,
    bgGradient: "from-green-400/20 via-emerald-500/20 to-cyan-400/20"
  },
  2: { // Hybrid Data Assimilation
    icon: Brain,
    bgGradient: "from-blue-400/20 via-indigo-500/20 to-purple-400/20"
  },
  3: { // ML Course Notebooks
    icon: Brain,
    bgGradient: "from-purple-400/20 via-pink-500/20 to-red-400/20"
  },
  4: { // Information Retrieval System
    icon: Search,
    bgGradient: "from-cyan-400/20 via-blue-500/20 to-indigo-400/20"
  }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const animation = projectAnimations[project.id as keyof typeof projectAnimations]
  const IconComponent = animation?.icon || Github

  const handleCardClick = () => {
    if (project.github) {
      window.open(project.github, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className={`bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-gray-600/50 rounded-xl overflow-hidden hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02] hover:bg-gradient-to-br hover:from-gray-800/70 hover:to-gray-700/50 flex flex-col h-full backdrop-blur-sm`}>
        {/* Project Visual */}
        <div className="relative h-56 overflow-hidden flex-shrink-0">
          <div className={`w-full h-full bg-gradient-to-br from-gray-800/40 to-gray-700/60 hover:from-blue-900/30 hover:to-purple-900/30 flex items-center justify-center relative transition-all duration-300`}>
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {project.id === 1 && ( // Trading Bot - Stock Chart
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 200">
                  <motion.path
                    d="M0,150 Q100,100 200,120 T400,80"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-green-400"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="200"
                    cy="120"
                    r="4"
                    className="fill-green-400"
                    animate={{ 
                      cx: [200, 250, 300, 350],
                      cy: [120, 100, 110, 80]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
              )}

              {project.id === 2 && ( // 3D Orrery - Orbiting Planets
                <div className="absolute inset-0">
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full -translate-x-1/2" />
                    <div className="absolute top-1/2 right-0 w-2 h-2 bg-red-400 rounded-full -translate-y-1/2" />
                    <div className="absolute bottom-0 left-1/2 w-2.5 h-2.5 bg-green-400 rounded-full -translate-x-1/2" />
                  </motion.div>
                  <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
                </div>
              )}

              {project.id === 3 && ( // ML Classification - Neural Network
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-4 opacity-40">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-purple-400 rounded-full"
                        animate={{ 
                          scale: [0.5, 1, 0.5],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {project.id === 4 && ( // Android App - Phone
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-32 border-2 border-orange-400/50 rounded-lg relative"
                    animate={{ 
                      rotateY: [0, 15, 0, -15, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-full h-6 bg-orange-400/30 rounded-t-md" />
                    <motion.div
                      className="absolute top-8 left-2 right-2 h-16 bg-gradient-to-b from-orange-400/20 to-red-400/20 rounded"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              )}
            </div>

            {/* Main Icon */}
            <div className="relative z-10">
              <motion.div
                className="p-6 bg-white/10 backdrop-blur-sm rounded-full"
                animate={
                  project.id === 1 ? { x: [0, 15, 0, -10, 0], y: [0, -5, 2, -2, 0] } :
                  project.id === 2 ? { rotate: 360 } :
                  project.id === 3 ? { scale: [1, 1.1, 1] } :
                  project.id === 4 ? { y: [0, -8, 0] } :
                  project.id === 5 ? { rotate: [0, 5, 0, -5, 0] } :
                  { scale: [1, 1.05, 1] }
                }
                transition={{
                  duration: project.id === 2 ? 20 : project.id === 6 ? 6 : 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <IconComponent className="h-12 w-12 text-white" />
              </motion.div>
            </div>
          </div>
          
          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center gap-3"
          >
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button-green p-3 rounded-full hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            )}
            
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button-blue p-3 rounded-full hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View source code"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}
          </motion.div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
              Featured
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="p-6 space-y-4 flex-grow flex flex-col">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => {
              return (
                <span
                  key={tag}
                  className="bg-gray-700/50 border border-gray-600 text-gray-300 text-xs px-3 py-1 rounded-full font-medium hover:border-primary/50 hover:text-primary transition-colors"
                >
                  {tag}
                </span>
              )
            })}
            {project.tags.length > 4 && (
              <span className="bg-gray-700/50 border border-gray-600 text-gray-300 text-xs px-3 py-1 rounded-full font-medium">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2 mt-auto">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button-green flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all transform hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="h-4 w-4" />
                Live Demo
              </a>
            )}
            
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button-blue flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all transform hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-gray-900/95 to-black/90"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">My </span><span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            A showcase of my work spanning ML applications, Android development, and web technologies. 
            Each project represents real solutions built with modern technologies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}