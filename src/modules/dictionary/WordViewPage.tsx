import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Play } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useApi } from '@/core-api'
import type { Word } from '@/types'

export default function WordViewPage() {
  const { word } = useParams<{ word: string }>()
  const [wordData, setWordData] = useState<Word | null>(null)
  const [loading, setLoading] = useState(true)
  const { dictionaryService } = useApi()

  useEffect(() => {
    const fetchWord = async () => {
      if (!word) return

      setLoading(true)
      try {
        const data = await dictionaryService.getWord(decodeURIComponent(word))
        setWordData(data || null)
      } catch (error) {
        console.error('Error fetching word:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWord()
  }, [word, dictionaryService])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center">Cargando...</p>
      </div>
    )
  }

  if (!wordData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Palabra no encontrada</h1>
          <p className="text-muted-foreground mb-8">
            No encontramos la palabra "{word}" en nuestro diccionario.
          </p>
          <Link to="/buscar">
            <Button>Volver al buscador</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/buscar" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Volver al buscador
        </Link>

        {/* Word Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">{wordData.word}</h1>
          <p className="text-xl text-muted-foreground">{wordData.description}</p>
          {wordData.category && (
            <p className="text-sm text-muted-foreground mt-2">
              Categoría: {wordData.category}
            </p>
          )}
        </div>

        {/* Steps Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pasos para realizar la seña</CardTitle>
            <CardDescription>
              Sigue estos pasos en orden para realizar correctamente la seña
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {wordData.steps.map((step) => (
                <div key={step.stepNumber} className="flex gap-6 items-start">
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {step.stepNumber}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    {/* Mock Image Placeholder */}
                    <div className="bg-muted rounded-lg mb-3 aspect-video flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Imagen paso {step.stepNumber}
                      </p>
                    </div>
                    <p className="text-lg">{step.instruction}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Video Section */}
        {wordData.videoUrl && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Video demostrativo
              </CardTitle>
              <CardDescription>
                Mira el video completo de cómo realizar la seña
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mock Video Placeholder */}
              <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                <Play className="h-16 w-16 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Video: {wordData.videoUrl}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
