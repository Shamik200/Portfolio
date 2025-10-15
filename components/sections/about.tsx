"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Brain, Settings } from "lucide-react";
import { skills } from "../../src/lib/data";
import { Skill } from "../../src/lib/types";

// Beyond Code Interests
const beyondCode = [
  {
    icon: "⚽",
    title: "Football", 
    description: "Team strategy and quick decision-making on the field translate to collaborative problem-solving in development teams"
  },
  {
    icon: "🎬",
    title: "Movies",
    description: "Film analysis and storytelling techniques that inspire creative problem-solving approaches"
  },
  {
    icon: "🏔️", 
    title: "Hiking",
    description: "Scaling peaks teaches resilience, planning, and problem-solving under pressure - essential skills for tackling complex systems"
  }
];

const skillCategories = [
  { id: "mobile", name: "App & Web Development", icon: Smartphone, color: "text-blue-400", bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20" },
  { id: "ai-ml", name: "AI/ML & GenAI", icon: Brain, color: "text-blue-300", bgColor: "bg-gradient-to-br from-blue-600/20 to-blue-500/20" },
  { id: "devops", name: "DevOps & Cloud", icon: Settings, color: "text-blue-400", bgColor: "bg-gradient-to-br from-blue-700/20 to-blue-600/20" },
  { id: "cp", name: "Competitive Programming", icon: Code2, color: "text-blue-300", bgColor: "bg-gradient-to-br from-blue-600/20 to-blue-700/20" }
];

// Curated Tech stack - 12 items for 2 rows of 6
const techStack = [
  { name: "Python", icon: "🐍", color: "#3776ab", category: "language" },
  { name: "Kotlin", icon: "🎯", color: "#7F52FF", category: "language" },
  { name: "React", icon: "⚛️", color: "#61DAFB", category: "frontend" },
  { name: "FastAPI", icon: "⚡", color: "#009688", category: "backend" },
  { name: "Jetpack Compose", icon: "📱", color: "#4285F4", category: "mobile" },
  { name: "Docker", icon: "🐳", color: "#2496ED", category: "devops" },
  { name: "LangChain", icon: "🔗", color: "#1C3A3A", category: "ai" },
  { name: "LangGraph", icon: "📊", color: "#4A90E2", category: "ai" },
  { name: "TensorFlow", icon: "🧠", color: "#FF6F00", category: "ai" },
  { name: "PyTorch", icon: "🔥", color: "#EE4C2C", category: "ai" },
  { name: "Ensemble Learning", icon: "🎯", color: "#8B5CF6", category: "ai" },
  { name: "OpenAI", icon: "🤖", color: "#10a37f", category: "ai" }
];

function TechStackItem({ tech, index }: { tech: typeof techStack[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.1, y: -5 }}
      className="flex flex-col items-center p-4 rounded-xl cursor-pointer group relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(${tech.color.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(',')}, 0.1) 100%)`,
        border: `1px solid rgba(${tech.color.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(',')}, 0.3)`,
        boxShadow: `0 4px 15px rgba(${tech.color.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(',')}, 0.1)`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">
        {tech.icon}
      </div>
      <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors text-center relative z-10">
        {tech.name}
      </span>
    </motion.div>
  );
}

function SkillCategory({ category, skills }: { category: typeof skillCategories[0]; skills: Skill[] }) {
  const IconComponent = category.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl p-6 group"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(30,35,40,0.8) 50%, rgba(0,0,0,0.9) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="flex items-center mb-4 relative z-10">
        <div className={`p-3 rounded-lg ${category.bgColor} mr-4 group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className={`w-6 h-6 ${category.color}`} />
        </div>
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">{category.name}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2 relative z-10">
        {skills.slice(0, 6).map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center text-sm text-gray-300 hover:text-white transition-colors group-hover:text-blue-200"
          >
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 opacity-60 group-hover:opacity-100 group-hover:bg-blue-300 transition-all duration-300"></span>
            {skill.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-12 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-gray-900/95 to-black/90"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-white via-blue-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            <span className="bg-gradient-to-r from-blue-400 via-white to-cyan-400 bg-clip-text text-transparent font-semibold">
              Software Engineer • Problem Solver • Adventure Seeker
            </span>
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-600/50 p-6 mb-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
            <div className="relative z-10 text-center">
              <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
                  I&apos;m Shamik Munjani, a B.Tech Computer Science student passionate about GenAI development, machine learning, and deep learning. I have a strong foundation in DSA, competitive programming, and scalable AI/ML system design. Currently exploring DevOps to bridge deployment and automation.
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold mb-8 text-center">
              <span className="text-white">Tech </span><span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Arsenal</span>
            </h3>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-2xl blur-xl"></div>
              <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {techStack.map((tech, index) => (
                    <TechStackItem key={tech.name} tech={tech} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Expertise</span> <span className="text-white">Domains</span>
            </h3>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-2xl blur-xl"></div>
              <div className="relative grid md:grid-cols-2 gap-6">
                {skillCategories.map((category) => {
                  const categorySkills = skills.filter(skill => skill.category === category.id);
                  return (
                    <SkillCategory 
                      key={category.id} 
                      category={category} 
                      skills={categorySkills} 
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold mb-8 text-center">
              <span className="text-white">Beyond </span><span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Code</span>
            </h3>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-cyan-500/5 rounded-2xl blur-xl"></div>
              <div className="relative grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {beyondCode.map((interest, index) => (
                  <motion.div
                    key={interest.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative overflow-hidden rounded-xl p-6 text-center group"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(40,40,60,0.8) 50%, rgba(0,0,0,0.9) 100%)',
                      border: '1px solid rgba(168, 85, 247, 0.2)',
                      boxShadow: '0 8px 32px rgba(168, 85, 247, 0.1)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{interest.icon}</div>
                      <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">{interest.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{interest.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
