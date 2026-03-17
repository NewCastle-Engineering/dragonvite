export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

export interface GameState {
  status: 'idle' | 'playing' | 'paused' | 'finished'
  score: number
  timestamp: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
