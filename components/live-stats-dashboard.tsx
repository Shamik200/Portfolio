import { motion } from "framer-motion"
import { GitHubStatsWidget } from "./github-stats-widget"

interface LiveStatsDashboardProps {
  platforms: Array<{
    id: string;
    name: string;
    username: string;
    rating: number;
    maxRating?: number;
    rank?: string;
    problemsSolved: number;
    contestsParticipated?: number;
    acceptanceRate?: number;
    color: string;
  }>;
}

export function LiveStatsDashboard({ platforms }: LiveStatsDashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Live Statistics Dashboard</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-500">Real-time</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <GitHubStatsWidget
            key={platform.id}
            username={platform.username}
            platform={platform.name}
            data={{
              rating: platform.rating,
              maxRating: platform.maxRating,
              rank: platform.rank,
              problemsSolved: platform.problemsSolved,
              contestsParticipated: platform.contestsParticipated,
              acceptanceRate: platform.acceptanceRate,
            }}
            color={platform.color}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-900/30 border border-gray-700 rounded-lg">
        <h4 className="text-lg font-semibold text-white mb-2">Combined Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {platforms.reduce((sum, p) => sum + p.problemsSolved, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Problems</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {platforms.reduce((sum, p) => sum + (p.contestsParticipated || 0), 0)}
            </div>
            <div className="text-sm text-gray-400">Total Contests</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {Math.round(platforms.reduce((sum, p) => sum + p.rating, 0) / platforms.length)}
            </div>
            <div className="text-sm text-gray-400">Avg Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {platforms.length}
            </div>
            <div className="text-sm text-gray-400">Platforms</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}