import type { Word, AlphabetLetter } from '../types'

export const mockWords: Word[] = [
  {
    id: '1',
    word: 'Buenos días',
    description: 'Saludo utilizado durante la mañana para dar inicio al día de forma cortés.',
    steps: [
      {
        stepNumber: 1,
        imageUrl: '/mock/buenos-dias-1.jpg',
        instruction: 'Coloca tu mano derecha abierta frente a tu pecho',
      },
      {
        stepNumber: 2,
        imageUrl: '/mock/buenos-dias-2.jpg',
        instruction: 'Mueve suavemente la mano hacia adelante',
      },
      {
        stepNumber: 3,
        imageUrl: '/mock/buenos-dias-3.jpg',
        instruction: 'Forma una sonrisa mientras realizas el gesto',
      },
    ],
    videoUrl: '/mock/buenos-dias.mp4',
    category: 'Saludos',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    word: 'Gracias',
    description: 'Expresión de agradecimiento o cortesía hacia otra persona.',
    steps: [
      {
        stepNumber: 1,
        imageUrl: '/mock/gracias-1.jpg',
        instruction: 'Coloca la mano cerca de tu boca',
      },
      {
        stepNumber: 2,
        imageUrl: '/mock/gracias-2.jpg',
        instruction: 'Extiende la mano hacia adelante',
      },
    ],
    videoUrl: '/mock/gracias.mp4',
    category: 'Cortesía',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
  },
  {
    id: '3',
    word: 'Hola',
    description: 'Saludo informal utilizado para iniciar una conversación.',
    steps: [
      {
        stepNumber: 1,
        imageUrl: '/mock/hola-1.jpg',
        instruction: 'Levanta tu mano derecha',
      },
      {
        stepNumber: 2,
        imageUrl: '/mock/hola-2.jpg',
        instruction: 'Mueve la mano de lado a lado',
      },
    ],
    videoUrl: '/mock/hola.mp4',
    category: 'Saludos',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
  },
  {
    id: '4',
    word: 'Por favor',
    description: 'Expresión de cortesía utilizada al solicitar algo.',
    steps: [
      {
        stepNumber: 1,
        imageUrl: '/mock/por-favor-1.jpg',
        instruction: 'Coloca tu mano abierta sobre tu pecho',
      },
      {
        stepNumber: 2,
        imageUrl: '/mock/por-favor-2.jpg',
        instruction: 'Realiza un movimiento circular suave',
      },
    ],
    category: 'Cortesía',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z',
  },
]

export const mockAlphabet: AlphabetLetter[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('').map(letter => ({
  letter,
  imageUrl: `/mock/alphabet/${letter.toLowerCase()}.jpg`,
  videoUrl: `/mock/alphabet/${letter.toLowerCase()}.mp4`,
}))
