import type { Word } from '@/types'
import { mockWords } from '@/data/mockData'

export const dictionaryService = {
  // Get all words
  async getAllWords(): Promise<Word[]> {
    // return apiClient.get('/words').then(res => res.data)
    return Promise.resolve(mockWords)
  },

  // Get a specific word
  async getWord(word: string): Promise<Word | undefined> {
    // return apiClient.get(`/words/${word}`).then(res => res.data)
    return Promise.resolve(
      mockWords.find(w => w.word.toLowerCase() === word.toLowerCase())
    )
  },

  // Search words
  async searchWords(query: string): Promise<Word[]> {
    // return apiClient.get(`/words/search?q=${query}`).then(res => res.data)
    return Promise.resolve(
      mockWords.filter(w => 
        w.word.toLowerCase().includes(query.toLowerCase())
      )
    )
  },

  // Create a new word (admin)
  async createWord(wordData: Omit<Word, 'id' | 'createdAt' | 'updatedAt'>): Promise<Word> {
    // return apiClient.post('/words', wordData).then(res => res.data)
    const newWord: Word = {
      ...wordData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    return Promise.resolve(newWord)
  },

  // Update a word (admin)
  async updateWord(id: string, wordData: Partial<Word>): Promise<Word> {
    // return apiClient.put(`/words/${id}`, wordData).then(res => res.data)
    const word = mockWords.find(w => w.id === id)
    if (!word) throw new Error('Word not found')
    return Promise.resolve({ ...word, ...wordData, updatedAt: new Date().toISOString() })
  },

  // Delete a word (admin)
  async deleteWord(id: string): Promise<void> {
    // return apiClient.delete(`/words/${id}`).then(res => res.data)
    return Promise.resolve()
  },
}
