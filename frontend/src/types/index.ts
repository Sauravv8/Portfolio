export interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

export interface Project {
    name: string
    description: string
    technologies: string[]
    github?: string
    live?: string
}

export interface SkillCategory {
    category: string
    items: string[]
}
