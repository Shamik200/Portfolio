import { Project, BlogPost, Skill, Experience } from './types'
import { CPPlatform, CPAchievement, CPStats } from './cp-types'

export const projects: Project[] = [
  {
    id: 1,
    title: "InvestIQ - Ensemble ML Trading Bot",
    description: "Sophisticated cryptocurrency trading bot using ensemble machine learning algorithms for price prediction and automated trading.",
    longDescription: "A comprehensive trading bot built with Python and FastAPI that leverages ensemble ML algorithms to predict cryptocurrency price movements. Features real-time data processing, backtesting capabilities, and risk management.",
    image: "/projects/trading-bot.jpg",
    tags: ["Python", "FastAPI", "Machine Learning", "Ensemble Models", "Crypto Trading"],
    github: "https://github.com/Shamik200/InvestIQ",
    demo: "",
    featured: true
  },
  {
    id: 2,
    title: "Tripster - AI-Powered Multi-Agent Travel Planner",
    description: "Intelligent travel platform using LangGraph and LangChain with multi-agent system for autonomous itinerary generation.",
    longDescription: "Designed intelligent travel platform using LangGraph and LangChain with Gemini AI models. Orchestrated multi-agent system (Destination, Event, Route, Stay, Budget, Packing Agents) for autonomous itinerary generation. Engineered backend with FastAPI, PostgreSQL, and FAISS embeddings for personalized recommendations.",
    image: "/projects/tripster.jpg",
    tags: ["LangGraph", "LangChain", "Gemini AI", "FastAPI", "PostgreSQL", "FAISS", "React.js"],
    github: "https://github.com/Shamik200/tripster",
    demo: "",
    featured: true
  },
  {
    id: 3,
    title: "AlgoForge - Institutional-Grade Trading System",
    description: "Institutional-grade algorithmic trading system with 31 strategies across 5 market regimes, powered by AI agents and ML models.",
    longDescription: "An institutional-grade algorithmic trading system featuring 31 strategies across 5 market regimes. Built with a modular pipeline: AI-powered fundamental analysis agents, 31 technical strategies with regime detection, XGBoost/LSTM/RL ML models, a risk management VETO layer, and a paper/live trading execution engine with a real-time Next.js dashboard.",
    image: "/projects/algoforge.jpg",
    tags: ["Python", "FastAPI", "XGBoost", "LSTM", "Reinforcement Learning", "Next.js", "Docker"],
    github: "https://github.com/Shamik200/AlgoForge",
    demo: "",
    featured: true
  }
]

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Transformer Architecture in Deep Learning",
    excerpt: "A comprehensive guide to understanding how transformers work and why they're revolutionizing AI.",
    content: "Full content of the blog post...",
    date: "2024-01-15",
    tags: ["AI", "Machine Learning", "Transformers", "NLP"],
    readTime: 8,
    featured: true
  },
  {
    id: 2,
    title: "Building Scalable Android Apps with Kotlin Coroutines",
    excerpt: "Learn how to handle asynchronous operations efficiently in Android development.",
    content: "Full content of the blog post...",
    date: "2024-01-10",
    tags: ["Android", "Kotlin", "Coroutines", "Mobile Development"],
    readTime: 6,
    featured: true
  },
  {
    id: 3,
    title: "Optimizing React Performance with Concurrent Features",
    excerpt: "Exploring React 18's concurrent features and how they improve user experience.",
    content: "Full content of the blog post...",
    date: "2024-01-05",
    tags: ["React", "Performance", "Frontend", "JavaScript"],
    readTime: 5,
    featured: false
  }
]

export const skills: Skill[] = [
  // Backend Development
  { name: "Python", level: 90, category: "backend" },
  { name: "FastAPI", level: 92, category: "backend" },
  { name: "PostgreSQL", level: 88, category: "backend" },
  { name: "Redis", level: 86, category: "backend" },
  { name: "FastMCP", level: 80, category: "backend" },
  { name: "Docker", level: 84, category: "backend" },
  { name: "REST APIs", level: 90, category: "backend" },
  
  // AI/ML
  { name: "TensorFlow-Keras", level: 85, category: "ai-ml" },
  { name: "Scikit-learn", level: 88, category: "ai-ml" },
  { name: "Pandas", level: 85, category: "ai-ml" },
  { name: "NumPy", level: 85, category: "ai-ml" },
  
  // Competitive Programming
  { name: "Data Structures", level: 85, category: "cp" },
  { name: "Algorithms", level: 85, category: "cp" },
  { name: "Problem Solving", level: 80, category: "cp" },
  { name: "C++", level: 75, category: "cp" }
]

export const experiences: Experience[] = [
  {
    id: 1,
    company: "B.Tech Computer Science Student",
    position: "Self-Directed Learning & Projects",
    duration: "2021 - Present",
    description: [
      "Built InvestIQ ensemble ML trading bot achieving ~78% signal accuracy",
      "Developed hybrid data assimilation system combining traditional methods with ML",
      "Created comprehensive ML course notebooks with practical implementations",
      "Solved 600+ competitive programming problems across multiple platforms"
    ],
    technologies: ["Python", "Machine Learning", "Android", "FastAPI", "React", "TensorFlow"]
  },
  {
    id: 2,
    company: "Open Source Contributions",
    position: "Independent Developer",
    duration: "2022 - Present", 
    description: [
      "Contributed to educational ML projects and information retrieval systems",
      "Built scalable Android applications with Kotlin and Jetpack Compose",
      "Implemented various AI/ML algorithms and data structures from scratch",
      "Actively maintaining GitHub repositories with clean, documented code"
    ],
    technologies: ["Kotlin", "Python", "Git", "Android SDK", "Open Source", "Documentation"]
  }
]

export const cpPlatforms: CPPlatform[] = [
  {
    id: "codeforces",
    name: "Codeforces",
    username: "R_E_D_D_E_V_I_L",
    profileUrl: "https://codeforces.com/profile/R_E_D_D_E_V_I_L",
    rating: 1305,
    maxRating: 1305,
    rank: "Pupil",
    color: "#10b981",
    logo: "CF",
    problemsSolved: 100,
    contestsParticipated: 25,
    lastUpdated: "2024-01-15"
  },
  {
    id: "leetcode",
    name: "LeetCode",
    username: "C_RONALDO7",
    profileUrl: "https://leetcode.com/C_RONALDO7",
    rating: 1690,
    maxRating: 1690,
    rank: "",
    color: "#f59e0b",
    logo: "LC",
    problemsSolved: 600,
    contestsParticipated: 15,
    lastUpdated: "2024-01-14"
  },
  {
    id: "codechef",
    name: "CodeChef",
    username: "shamik_munjani",
    profileUrl: "https://www.codechef.com/users/shamik_munjani",
    rating: 1644,
    maxRating: 1644,
    rank: "3 Star",
    color: "#8b5cf6",
    logo: "CC",
    problemsSolved: 120,
    contestsParticipated: 20,
    lastUpdated: "2024-01-12"
  }
]

export const cpAchievements: CPAchievement[] = []

export const cpStats: CPStats = {
  totalProblems: 820,
  totalContests: 60,
  averageRating: 1545,
  maxRating: 1690,
  activeDays: 500,
  submissions: 2800
}