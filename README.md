# A Una Seña de Distancia

Diccionario visual de lengua de señas - Aplicación web moderna construida con React, TypeScript y Vite.

## 🎯 Descripción del Proyecto

**A Una Seña de Distancia** es una aplicación web diseñada para ayudar a las personas a aprender lengua de señas a través de recursos visuales paso a paso. Inspirada en el diseño del diccionario de la Real Academia Española (RAE), ofrece una experiencia limpia, moderna y accesible.

## ✨ Características

- **Búsqueda de palabras**: Encuentra rápidamente cualquier palabra y aprende su seña
- **Guías paso a paso**: Cada palabra incluye instrucciones visuales detalladas
- **Videos demostrativos**: Aprende con videos que muestran la seña completa
- **Alfabeto completo**: Sección dedicada para aprender el alfabeto en lengua de señas
- **Panel de administración**: Gestiona el contenido del diccionario (crear, editar, eliminar palabras)
- **Diseño responsive**: Funciona perfectamente en dispositivos móviles y de escritorio

## 🛠️ Stack Tecnológico

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite 6** - Build tool y dev server
- **React Router DOM** - Navegación
- **shadcn/ui** - Componentes de UI
- **TailwindCSS** - Estilos
- **Lucide React** - Iconos
- **Axios** - Cliente HTTP

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Servicios API
│   ├── client.ts          # Cliente Axios configurado
│   └── dictionaryService.ts
│
├── components/            # Componentes compartidos
│   ├── Layout.tsx        # Layout principal con navbar
│   └── ui/               # Componentes de shadcn/ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── textarea.tsx
│
├── modules/              # Módulos principales (arquitectura modular)
│   ├── admin/           # Módulo de administración
│   │   └── pages/
│   │       ├── AdminDashboard.tsx
│   │       ├── CreateWord.tsx
│   │       └── EditWord.tsx
│   ├── search/          # Módulo de búsqueda
│   │   └── SearchPage.tsx
│   ├── dictionary/      # Módulo de visualización de palabras
│   │   └── WordViewPage.tsx
│   └── alphabet/        # Módulo del alfabeto
│       └── AlphabetPage.tsx
│
├── pages/               # Páginas principales
│   └── HomePage.tsx
│
├── providers/           # Context providers
│   └── ApiProvider.tsx
│
├── data/               # Mock data
│   └── mockData.ts
│
├── types/              # Tipos TypeScript
│   └── index.ts
│
├── lib/                # Utilidades
│   └── utils.ts
│
├── App.tsx            # Componente principal con rutas
├── main.tsx           # Punto de entrada
└── index.css          # Estilos globales con Tailwind
```

## 🚀 Comenzar

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn

### Instalación

1. Clonar el repositorio (cuando esté disponible)
2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir en el navegador: http://localhost:5173

### Comandos Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Previsualizar build de producción
npm run lint     # Ejecutar linter
```

## 📚 Rutas de la Aplicación

- `/` - Página principal
- `/buscar` - Buscar palabras
- `/palabra/:word` - Ver detalles de una palabra específica
- `/alfabeto` - Ver alfabeto completo
- `/admin` - Dashboard de administración
- `/admin/nueva-palabra` - Crear nueva palabra
- `/admin/editar/:id` - Editar palabra existente

## 🎨 Diseño y UI

El diseño sigue los principios de:

- **Minimalismo**: UI limpia y sin distracciones
- **Espaciado generoso**: Facilita la lectura y navegación
- **Colores neutros**: Enfoque en el contenido
- **Accesibilidad**: Alto contraste y buena legibilidad
- **Modernidad**: Uso de componentes modernos de shadcn/ui

## 🔌 API y Backend

Actualmente la aplicación usa **datos mock** (simulados) almacenados en `src/data/mockData.ts`.

La capa de API está preparada para conectarse a un backend real cuando esté disponible:

- Cliente Axios configurado en `src/api/client.ts`
- Servicios separados por dominio
- Provider context para gestión global

### Endpoints esperados del futuro backend:

```
GET    /api/words           # Obtener todas las palabras
GET    /api/words/:word     # Obtener palabra específica
GET    /api/words/search    # Buscar palabras
POST   /api/words           # Crear palabra (admin)
PUT    /api/words/:id       # Actualizar palabra (admin)
DELETE /api/words/:id       # Eliminar palabra (admin)
```

## 📝 Modelo de Datos

### Word (Palabra)

```typescript
interface Word {
  id: string
  word: string
  description: string
  steps: WordStep[]
  videoUrl?: string
  category?: string
  createdAt: string
  updatedAt: string
}
```

### WordStep (Paso)

```typescript
interface WordStep {
  stepNumber: number
  imageUrl: string
  instruction: string
}
```

### AlphabetLetter (Letra del alfabeto)

```typescript
interface AlphabetLetter {
  letter: string
  imageUrl: string
  videoUrl?: string
}
```

## 🔄 Próximos Pasos

- [ ] Conectar con backend real
- [ ] Implementar autenticación para admin
- [ ] Agregar sistema de categorías avanzado
- [ ] Implementar carga de imágenes y videos
- [ ] Agregar favoritos y historial de búsqueda
- [ ] Implementar modo oscuro
- [ ] Agregar tests unitarios y de integración
- [ ] Optimizar imágenes y videos
- [ ] Implementar PWA (Progressive Web App)

## 🤝 Contribuir

(Por definir cuando el proyecto esté en producción)

## 📄 Licencia

(Por definir)

## 👥 Contacto

(Por definir)

---

**Nota**: Este es un prototipo funcional listo para desarrollo. Los recursos visuales (imágenes y videos) son actualmente placeholders que deben ser reemplazados con contenido real.
