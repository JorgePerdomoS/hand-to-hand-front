import type { Word } from '@/types'

const BASE_URL = 'http://localhost:8080/word'

const normalize = (str: string) =>
    str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()

export const dictionaryService = {

  async getAllWords(): Promise<Word[]> {
    const res = await fetch(`${BASE_URL}/all`)
    return res.json()
  },

  async getWord(word: string): Promise<Word | undefined> {
    const res = await fetch(`${BASE_URL}?word=${encodeURIComponent(word.toLowerCase())}`)
    if (res.status === 204) return undefined
    const data: Word = await res.json()

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
    const normalizedQuery = normalize(query)
    return words.filter(w =>
        normalize(w.word).includes(normalizedQuery) ||
        normalize(w.description).includes(normalizedQuery) ||
        normalize(w.category || '').includes(normalizedQuery)
    )
  },

  async createWord(wordData: Omit<Word, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wordData),
    })
  },

  async updateWord(word: string, wordData: Partial<Word>): Promise<void> {
    await fetch(`${BASE_URL}/update?word=${encodeURIComponent(word.toLowerCase())}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wordData),
    })
  },

  async deleteWord(word: string): Promise<void> {
    if (!word) throw new Error('Word is required')
    await fetch(`${BASE_URL}/delete?word=${encodeURIComponent(word.toLowerCase())}`, {
      method: 'DELETE',
    })
  },
}