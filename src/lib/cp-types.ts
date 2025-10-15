export interface CPPlatform {
  id: string
  name: string
  username: string
  profileUrl: string
  rating: number
  maxRating: number
  rank: string
  color: string
  logo: string
  problemsSolved: number
  contestsParticipated: number
  globalRank?: number
  countryRank?: number
  lastUpdated: string
}

export interface CPAchievement {
  id: number
  title: string
  description: string
  platform: string
  date: string
  rank?: number
  rating?: number
  contestName?: string
  icon: string
  featured: boolean
}

export interface CPStats {
  totalProblems: number
  totalContests: number
  averageRating: number
  maxRating: number
  activeDays: number
  submissions: number
}