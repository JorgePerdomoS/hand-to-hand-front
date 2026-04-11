import { Card, CardContent } from '@/components/ui/card'
import { mockAlphabet } from '@/data/mockData'
import handConversation from '@/assets/handconversation.png'

export default function AlphabetPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src={handConversation} alt="Alfabeto" className="h-32 w-32 object-contain" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Alfabeto en Lengua de Señas</h1>
          <p className="text-xl text-muted-foreground">
            Aprende el alfabeto completo en lengua de señas
          </p>
        </div>

        {/* Alphabet Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockAlphabet.map((letter) => (
            <Card key={letter.letter} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Letter */}
                <div className="text-center mb-4">
                  <h2 className="text-4xl font-bold">{letter.letter}</h2>
                </div>

                {/* Mock Image Placeholder */}
                {/* Imagen de la seña */}
                <div className="flex justify-center">
                  <img
                      src={letter.imageUrl}
                      alt={`Letra ${letter.letter} en LSC`}
                      className="rounded-lg border-2 border-gray-100"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Consejos para aprender</h2>
              <div className="text-left space-y-3 text-muted-foreground">
                <p>• Practica cada letra lentamente hasta dominar la forma</p>
                <p>• Asegúrate de que tus dedos estén en la posición correcta</p>
                <p>• Practica frente a un espejo para verificar tu forma</p>
                <p>• Repite las letras varias veces al día para mejorar la memoria muscular</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
