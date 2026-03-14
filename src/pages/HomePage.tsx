import { Link } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import hand from '@/assets/hand.png'
import handConversation from '@/assets/handconversation.png'
import connect from '@/assets/connect.png'

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          A Una Seña de Distancia
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Aprende lengua de señas de forma visual e intuitiva. 
          Un diccionario completo con videos paso a paso.
        </p>
        <Link to="/buscar">
          <Button size="lg" className="gap-2">
            <Search className="h-5 w-5" />
            Comenzar a buscar
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>


      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <img src={hand} alt="Buscar" className="h-32 w-32 object-contain" />
            </div>
            <CardTitle>Busca cualquier palabra</CardTitle>
            <CardDescription>
              Encuentra rápidamente cómo expresar cualquier palabra en lengua de señas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/buscar">
              <Button variant="outline" className="w-full">
                Ir al buscador
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <img src={handConversation} alt="Alfabeto" className="h-32 w-32 object-contain" />
            </div>
            <CardTitle>Aprende el alfabeto</CardTitle>
            <CardDescription>
              Comienza con lo básico: el alfabeto en lengua de señas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/alfabeto">
              <Button variant="outline" className="w-full">
                Ver alfabeto
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="text-center bg-muted/30 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-8">Palabras populares</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {['Buenos días', 'Gracias', 'Hola', 'Por favor'].map((word) => (
            <Link key={word} to={`/palabra/${word.toLowerCase()}`}>
              <Button variant="outline" size="lg">
                {word}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
