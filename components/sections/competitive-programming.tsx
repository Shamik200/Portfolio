"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ExternalLink, Trophy, Target, Calendar, Hash, LucideIcon, RefreshCw, Wifi, WifiOff } from "lucide-react"
import { cpPlatforms, cpStats } from "../../src/lib/data"
import { CPPlatform } from "../../src/lib/cp-types"
import { useLiveCPData } from "../../src/lib/use-live-cp-data"

function PlatformCard({ platform, index }: { platform: CPPlatform; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  
  const getRatingColor = (rating: number, platform: string) => {
    if (platform === "codeforces") {
      if (rating >= 2100) return "text-blue-200"
      if (rating >= 1900) return "text-blue-300"
      if (rating >= 1600) return "text-blue-400"
      if (rating >= 1400) return "text-blue-500"
      if (rating >= 1200) return "text-blue-600"
      return "text-gray-400"
    }
    return platform === "leetcode" ? "text-blue-400" : 
           platform === "atcoder" ? "text-blue-500" :
           platform === "codechef" ? "text-blue-300" : "text-blue-400"
  }

  const getProgressPercentage = () => {
    const maxPossible = platform.id === "codeforces" ? 3000 : 
                       platform.id === "leetcode" ? 3000 : 
                       platform.id === "atcoder" ? 3000 : 2500
    return Math.min((platform.rating / maxPossible) * 100, 100)
  }

  const handleCardClick = () => {
    window.open(platform.profileUrl, '_blank', 'noopener,noreferrer')
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
      <div className="bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-900/40 border border-gray-600/50 rounded-xl p-6 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
        {/* Platform Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: platform.color }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              {platform.logo}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                {platform.lastUpdated && new Date(platform.lastUpdated).getTime() > Date.now() - 60 * 60 * 1000 && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-blue-400">Live</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-400">@{platform.username}</p>
            </div>
          </div>
          
          <motion.a
            href={platform.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-button-green p-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Visit ${platform.name} profile`}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        </div>

        {/* Rating Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Current Rating</p>
              <p className={`text-2xl font-bold ${getRatingColor(platform.rating, platform.id)}`}>
                {platform.rating}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Max Rating</p>
              <p className="text-lg font-semibold text-white">
                {platform.maxRating}
              </p>
            </div>
          </div>

          {/* Rating Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Rank: {platform.rank}</span>
              <span className="text-gray-400">{getProgressPercentage().toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: platform.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700">
            <div className="text-center">
              <p className="text-lg font-bold neon-blue">{platform.problemsSolved}</p>
              <p className="text-xs text-gray-400">Problems</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold neon-green">{platform.contestsParticipated}</p>
              <p className="text-xs text-gray-400">Contests</p>
            </div>
            {platform.globalRank && (
              <div className="text-center">
                <p className="text-lg font-bold neon-blue">#{platform.globalRank}</p>
                <p className="text-xs text-gray-400">Global Rank</p>
              </div>
            )}
            {platform.countryRank && (
              <div className="text-center">
                <p className="text-lg font-bold neon-green">#{platform.countryRank}</p>
                <p className="text-xs text-gray-400">Country Rank</p>
              </div>
            )}
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-[#0099ff]/5 rounded-xl pointer-events-none"
        />
      </div>
    </motion.div>
  )
}



function StatCard({ title, value, subtitle, icon: Icon, color }: { 
  title: string; 
  value: number; 
  subtitle: string; 
  icon: LucideIcon; 
  color: string; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-900/40 border border-gray-600/50 rounded-xl p-6 text-center hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 backdrop-blur-sm"
    >
      <motion.div 
        className={`inline-flex p-3 rounded-lg mb-4 ${color}`}
        whileHover={{ rotate: 10 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-6 w-6" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl font-bold text-white mb-2"
      >
        {value.toLocaleString()}
      </motion.div>
      <div className="text-sm font-medium mb-1 text-white">{title}</div>
      <div className="text-xs text-gray-400">{subtitle}</div>
    </motion.div>
  )
}

export function CompetitiveProgrammingSection() {
  const { data: livePlatforms, loading, error, lastUpdated, refetch } = useLiveCPData(cpPlatforms);
  
  return (
    <section id="competitive-programming" className="py-16 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-gray-900/95 to-black/90"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
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
            <span className="text-white">Competitive </span><span className="bg-gradient-to-r from-yellow-400 via-red-400 to-purple-400 bg-clip-text text-transparent">Programming</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Showcasing my algorithmic problem-solving skills and competitive programming 
            achievements across major platforms. Constantly pushing boundaries and 
            climbing the leaderboards.
          </p>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <StatCard
            title="Total Problems"
            value={cpStats.totalProblems}
            subtitle="Across all platforms"
            icon={Target}
            color="neon-blue-bg neon-blue"
          />
          <StatCard
            title="Contests"
            value={cpStats.totalContests}
            subtitle="Participated"
            icon={Trophy}
            color="neon-green-bg neon-green"
          />
          <StatCard
            title="Active Days"
            value={cpStats.activeDays}
            subtitle="Coding streak"
            icon={Calendar}
            color="neon-blue-bg neon-blue"
          />
          <StatCard
            title="Submissions"
            value={cpStats.submissions}
            subtitle="Total attempts"
            icon={Hash}
            color="neon-green-bg neon-green"
          />
        </motion.div>

        {/* Live Platform Data & Profiles */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-white"
            >
              Live <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Platform Data</span>
            </motion.h3>
            
            <div className="flex items-center gap-4">
              {loading && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Fetching live data...</span>
                </div>
              )}
              
              {!loading && !error && lastUpdated && (
                <div className="flex items-center gap-2 text-sm text-blue-400">
                  <Wifi className="h-4 w-4" />
                  <span>Live • {new Date(lastUpdated).toLocaleTimeString()}</span>
                </div>
              )}
              
              {error && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <WifiOff className="h-4 w-4" />
                  <span>Using cached data</span>
                </div>
              )}
              
              <motion.button
                onClick={refetch}
                disabled={loading}
                className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className={`h-4 w-4 text-blue-400 ${loading ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>
          </div>
          
          {/* Combined Platform Cards and Stats */}
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {livePlatforms.map((platform, index) => (
                <PlatformCard key={platform.id} platform={platform} index={index} />
              ))}
            </div>

            {/* Integrated Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-white">Combined Live Statistics</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-blue-400">Real-time</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">
                    {livePlatforms.reduce((sum, p) => sum + p.problemsSolved, 0)}
                  </div>
                  <div className="text-sm text-gray-400">Total Problems</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">
                    {livePlatforms.reduce((sum, p) => sum + (p.contestsParticipated || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-400">Total Contests</div>
                </div>
                <div className="text-center p-4 bg-blue-600/10 rounded-xl border border-blue-600/20">
                  <div className="text-2xl font-bold text-blue-300">
                    {Math.round(livePlatforms.reduce((sum, p) => sum + p.rating, 0) / livePlatforms.length)}
                  </div>
                  <div className="text-sm text-gray-400">Avg Rating</div>
                </div>
                <div className="text-center p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <div className="text-2xl font-bold text-orange-400">
                    {livePlatforms.length}
                  </div>
                  <div className="text-sm text-gray-400">Active Platforms</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>


      </div>
    </section>
  )
}