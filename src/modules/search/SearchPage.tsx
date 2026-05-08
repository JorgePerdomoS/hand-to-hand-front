import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useApi } from '@/core-api'
import type { Word } from '@/types'
import handImage from '@/assets/hand.png'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Word[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const { dictionaryService } = useApi()


  useEffect(() => {
    const searchWords = async () => {
      if (query.trim().length === 0) {
        setResults([])
        return
      }

      setIsSearching(true)
      try {
        const words = await dictionaryService.searchWords(query)
        setResults(words)
      } catch (error) {
        console.error('Error searching words:', error)
      } finally {
        setIsSearching(false)
      }
    }

    const debounce = setTimeout(searchWords, 300)
    return () => clearTimeout(debounce)
  }, [query, dictionaryService])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Search Header */}
        <div className="text-center mb-12">
          {!query && (
            <div className="flex justify-center mb-6">
              <img src={handImage} alt="Buscar" className="h-32 w-32 object-contain" />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">Buscar palabra</h1>
          <p className="text-muted-foreground mb-8">
            Ingresa la palabra que deseas aprender en lengua de señas
          </p>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Ej: Buenos días, Gracias, Hola..."
              className="pl-10 h-14 text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {isSearching && (
            <p className="text-center text-muted-foreground">Buscando...</p>
          )}

          {!isSearching && query && results.length === 0 && (
            <p className="text-center text-muted-foreground">
              No se encontraron resultados para "{query}"
            </p>
          )}

          {results.map((word) => (
            <Link key={word.id} to={`/palabra/${encodeURIComponent(word.word.toLowerCase())}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle>{word.word}</CardTitle>
                  <CardDescription>{word.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{word.steps.length} pasos</span>
                    {word.videoUrl && <span>• Video disponible</span>}
                    {word.category && <span>• {word.category}</span>}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
