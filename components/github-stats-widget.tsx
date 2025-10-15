import { motion } from "framer-motion"
import { ExternalLink, Trophy, Target, Calendar, BarChart3 } from "lucide-react"

interface GitHubStatsWidgetProps {
  username: string;
  platform: string;
  data: {
    rating?: number;
    maxRating?: number;
    rank?: string;
    problemsSolved?: number;
    contestsParticipated?: number;
    acceptanceRate?: number;
  };
  color: string;
}

export function GitHubStatsWidget({ username, platform, data, color }: GitHubStatsWidgetProps) {
  const getStatsForPlatform = () => {
    switch (platform.toLowerCase()) {
      case 'codeforces':
        return [
          { label: 'Rating', value: data.rating || 0, icon: BarChart3 },
          { label: 'Max Rating', value: data.maxRating || 0, icon: Trophy },
          { label: 'Problems', value: data.problemsSolved || 0, icon: Target },
          { label: 'Contests', value: data.contestsParticipated || 0, icon: Calendar },
        ];
      case 'leetcode':
        return [
          { label: 'Rating', value: data.rating || 0, icon: BarChart3 },
          { label: 'Problems', value: data.problemsSolved || 0, icon: Target },
          { label: 'Acceptance', value: `${data.acceptanceRate || 0}%`, icon: Trophy },
        ];
      default:
        return [
          { label: 'Rating', value: data.rating || 0, icon: BarChart3 },
          { label: 'Problems', value: data.problemsSolved || 0, icon: Target },
        ];
    }
  };

  const stats = getStatsForPlatform();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-primary/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h4 className="text-sm font-semibold text-white">{platform} Stats</h4>
        </div>
        <ExternalLink className="h-3 w-3 text-gray-400" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <stat.icon className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
            <div className="text-sm font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-3 pt-2 border-t border-gray-700">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>@{username}</span>
          <span>Live</span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}