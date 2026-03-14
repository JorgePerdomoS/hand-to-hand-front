import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useApi } from '@/core-api'
import type { Word, WordStep } from '@/types'

export default function EditWord() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { dictionaryService } = useApi()
  
  const [loading, setLoading] = useState(true)
  const [word, setWord] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [steps, setSteps] = useState<WordStep[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchWord = async () => {
      if (!id) return

      try {
        // For mock data, we'll search by ID in the getAllWords
        const allWords = await dictionaryService.getAllWords()
        const foundWord = allWords.find(w => w.id === id)
        
        if (foundWord) {
          setWord(foundWord.word)
          setDescription(foundWord.description)
          setCategory(foundWord.category || '')
          setVideoUrl(foundWord.videoUrl || '')
          setSteps(foundWord.steps)
        }
      } catch (error) {
        console.error('Error fetching word:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWord()
  }, [id, dictionaryService])

  const addStep = () => {
    setSteps([...steps, { stepNumber: steps.length + 1, imageUrl: '', instruction: '' }])
  }

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index).map((step, i) => ({
      ...step,
      stepNumber: i + 1
    })))
  }

  const updateStep = (index: number, field: keyof WordStep, value: string) => {
    const newSteps = [...steps]
    if (field === 'stepNumber') {
      newSteps[index][field] = parseInt(value) || 1
    } else {
      newSteps[index][field] = value as never
    }
    setSteps(newSteps)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!word || !description || steps.some(s => !s.instruction)) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    if (!id) return

    setSaving(true)
    try {
      await dictionaryService.updateWord(id, {
        word,
        description,
        category: category || undefined,
        videoUrl: videoUrl || undefined,
        steps,
      })
      
      alert('Palabra actualizada exitosamente')
      navigate('/admin')
    } catch (error) {
      console.error('Error updating word:', error)
      alert('Error al actualizar la palabra')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Volver al panel
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Editar palabra</h1>
          <p className="text-muted-foreground">
            Modifica la información de la palabra
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Información básica</CardTitle>
              <CardDescription>
                Datos principales de la palabra
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Palabra *
                </label>
                <Input
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="Ej: Buenos días"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Descripción *
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción de la palabra..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Categoría
                </label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Ej: Saludos, Cortesía, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  URL del video
                </label>
                <Input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="/videos/palabra.mp4"
                  type="url"
                />
              </div>
            </CardContent>
          </Card>

          {/* Steps */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pasos para realizar la seña</CardTitle>
                  <CardDescription>
                    Define los pasos con imágenes e instrucciones
                  </CardDescription>
                </div>
                <Button type="button" onClick={addStep} variant="outline" size="sm">
                  Agregar paso
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Paso {step.stepNumber}</h4>
                    {steps.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeStep(index)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      URL de la imagen *
                    </label>
                    <Input
                      value={step.imageUrl}
                      onChange={(e) => updateStep(index, 'imageUrl', e.target.value)}
                      placeholder="/images/paso-1.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Instrucción *
                    </label>
                    <Textarea
                      value={step.instruction}
                      onChange={(e) => updateStep(index, 'instruction', e.target.value)}
                      placeholder="Describe qué hacer en este paso..."
                      rows={2}
                      required
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" disabled={saving} className="gap-2">
              <Save className="h-5 w-5" />
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </Button>
            <Link to="/admin">
              <Button type="button" variant="outline" size="lg">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
