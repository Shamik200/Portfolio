export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  github?: string
  demo?: string
  featured: boolean
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  readTime: number
  featured: boolean
}

export interface Skill {
  name: string
  level: number
  category: 'mobile' | 'ai-ml' | 'devops' | 'cp'
}

export interface Experience {
  id: number
  company: string
  position: string
  duration: string
  description: string[]
  technologies: string[]
}