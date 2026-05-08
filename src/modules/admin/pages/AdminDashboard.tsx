import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Book } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useApi } from '@/core-api'
import type { Word } from '@/types'

export default function AdminDashboard() {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const { dictionaryService } = useApi()

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const allWords = await dictionaryService.getAllWords()
        setWords(allWords)
      } catch (error) {
        console.error('Error fetching words:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWords()
  }, [dictionaryService])

  const handleDelete = async (wordName: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta palabra?')) {
      return
    }

    try {
      await dictionaryService.deleteWord(wordName)
      setWords(words.filter(w => w.word !== wordName))
    } catch (error) {
      console.error('Error deleting word:', error)
      alert('Error al eliminar la palabra')
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">
              Gestiona el contenido del diccionario
            </p>
          </div>
          <Link to="/admin/nueva-palabra">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Nueva palabra
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de palabras
              </CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{words.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Con video
              </CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {words.filter(w => w.videoUrl).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Categorías
              </CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(words.map(w => w.category).filter(Boolean)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Words List */}
        <Card>
          <CardHeader>
            <CardTitle>Palabras en el diccionario</CardTitle>
            <CardDescription>
              Administra, edita o elimina palabras existentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground">Cargando...</p>
            ) : words.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No hay palabras en el diccionario aún
              </p>
            ) : (
              <div className="space-y-4">
                {words.map((word) => (
                  <div
                    key={word.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{word.word}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {word.description}
                      </p>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{word.steps.length} pasos</span>
                        {word.videoUrl && <span>• Video</span>}
                        {word.category && <span>• {word.category}</span>}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/admin/editar/${encodeURIComponent(word.word)}`}>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Edit className="h-4 w-4" />
                          Editar
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleDelete(word.word)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
