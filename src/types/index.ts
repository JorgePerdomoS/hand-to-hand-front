export interface Word {
  id: string
  word: string
  description: string
  steps: WordStep[]
  videoUrl?: string
  category?: string
  createdAt: string
  updatedAt: string
}

export interface WordStep {
  stepNumber: number
  imageUrl: string
  instruction: string
}

export interface AlphabetLetter {
  letter: string
  imageUrl: string
  videoUrl?: string
}
