import type { Word } from '@/types'

const BASE_URL = 'http://localhost:8080/word'

export const dictionaryService = {

  async getAllWords(): Promise<Word[]> {
    const res = await fetch(`${BASE_URL}/all`)
    return res.json()
  },

  async getWord(word: string): Promise<Word | undefined> {
    const res = await fetch(`${BASE_URL}?word=${encodeURIComponent(word.toLowerCase())}`)
    if (res.status === 204) return undefined
    const data: Word = await res.json()

    // Asegura que cada imagen tenga el prefijo correcto
    data.steps = data.steps.map(step => ({
      ...step,
      imageData: step.imageData
          ? step.imageData.startsWith('data:')
              ? step.imageData
              : `data:image/jpeg;base64,${step.imageData}`
          : ''
    }))

    return data
  },

  async searchWords(query: string): Promise<Word[]> {
    const res = await fetch(`${BASE_URL}/all`)
    const words: Word[] = await res.json()
    return words.filter(w =>
        w.word.toLowerCase().includes(query.toLowerCase())
    )
  },

  async createWord(wordData: Omit<Word, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wordData),
    })
  },

  async updateWord(id: string, wordData: Partial<Word>): Promise<void> {
    const word = wordData.word ?? id
    await fetch(`${BASE_URL}/update?word=${encodeURIComponent(word.toLowerCase())}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wordData),
    })
  },

  async deleteWord(id: string): Promise<void> {
    await fetch(`${BASE_URL}/delete?word=${encodeURIComponent(id.toLowerCase())}`, {
      method: 'DELETE',
    })
  },
}