# 📋 Guía de Desarrollo - A Una Seña de Distancia

## 🎯 Resumen del Proyecto

Esta aplicación está completamente lista para desarrollo y pruebas. Incluye:

- ✅ Configuración completa de Vite + React + TypeScript
- ✅ 4 módulos principales funcionando
- ✅ Routing completo con React Router
- ✅ UI moderna con shadcn/ui + TailwindCSS
- ✅ Mock data para pruebas
- ✅ Capa API preparada para backend real

## 🚀 Estado Actual

### ✅ Completado

1. **Configuración base del proyecto**
   - Vite 6.0.7 + React 18 + TypeScript
   - TailwindCSS con configuración personalizada
   - Componentes shadcn/ui integrados

2. **Módulos implementados**
   - **Search Module**: Búsqueda en tiempo real con debounce
   - **Dictionary Module**: Vista detallada de palabras con pasos
   - **Alphabet Module**: Grilla visual del alfabeto completo
   - **Admin Module**: CRUD completo de palabras

3. **Navegación y Routing**
   - Layout con header y footer
   - Rutas públicas y de admin
   - Navegación entre módulos

4. **Mock Data**
   - 4 palabras de ejemplo: "Buenos días", "Gracias", "Hola", "Por favor"
   - Alfabeto completo (A-Z incluyendo Ñ)

## 📂 Arquitectura del Proyecto

### Estructura de carpetas

```
src/
├── core-api/                     # ⭐ Capa de API centralizada
│   ├── client.ts                 # Cliente Axios con interceptores
│   ├── services/                 # Servicios por dominio
│   │   └── dictionaryService.ts  # Servicio del diccionario (mock)
│   ├── providers/                # Context Providers
│   │   └── ApiProvider.tsx       # Provider para servicios API
│   ├── index.ts                  # Exportaciones centralizadas
│   └── README.md                 # Documentación de core-api
│
├── components/                   # Componentes globales
│   ├── Layout.tsx               # Layout principal (Header + Footer)
│   └── ui/                      # Componentes shadcn/ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── textarea.tsx
│
├── modules/                      # Módulos principales
│   ├── admin/                   # Módulo de administración
│   │   └── pages/
│   │       ├── AdminDashboard.tsx   # Dashboard principal
│   │       ├── CreateWord.tsx       # Crear palabra
│   │       └── EditWord.tsx         # Editar palabra
│   │
│   ├── search/                  # Módulo de búsqueda
│   │   └── SearchPage.tsx       # Búsqueda con autocompletado
│   │
│   ├── dictionary/              # Módulo del diccionario
│   │   └── WordViewPage.tsx     # Vista de palabra individual
│   │
│   └── alphabet/                # Módulo del alfabeto
│       └── AlphabetPage.tsx     # Vista del alfabeto completo
│
├── pages/                       # Páginas principales
│   └── HomePage.tsx             # Página de inicio
│
├── data/                        # Datos mock
│   └── mockData.ts             # Palabras y alfabeto de prueba
│
├── types/                       # Definiciones TypeScript
│   └── index.ts                # Tipos: Word, WordStep, AlphabetLetter
│
├── lib/                        # Utilidades
│   └── utils.ts               # cn() para clases CSS
│
├── App.tsx                     # Componente raíz con rutas
├── main.tsx                    # Punto de entrada
└── index.css                   # Estilos globales Tailwind
```

## 🔗 Rutas Disponibles

### Rutas Públicas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | HomePage | Página de inicio con features principales |
| `/buscar` | SearchPage | Búsqueda de palabras |
| `/palabra/:word` | WordViewPage | Detalles de una palabra |
| `/alfabeto` | AlphabetPage | Alfabeto completo |

### Rutas de Admin

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/admin` | AdminDashboard | Panel de control |
| `/admin/nueva-palabra` | CreateWord | Formulario para nueva palabra |
| `/admin/editar/:id` | EditWord | Editar palabra existente |

## 🎨 Componentes UI Disponibles

### shadcn/ui Components

- `Button` - Botones con variantes (default, outline, ghost, etc.)
- `Card` - Tarjetas para contenido
- `Input` - Campos de texto
- `Textarea` - Áreas de texto

### Uso de componentes

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>Acción</Button>
  </CardContent>
</Card>
```

## 🔄 Flujo de Datos

### 1. Mock Data (Actual)

```
mockData.ts → dictionaryService → ApiProvider → Componentes
```

Los datos están simulados en `src/data/mockData.ts` y son servidos por `dictionaryService.ts`.

### 2. API Real (Futuro)

Para conectar con un backend real:

1. **Configurar variable de entorno**:
   ```bash
   # .env
   VITE_API_URL=http://tu-backend.com/api
   ```

2. **Descomentar llamadas en dictionaryService.ts**:
   ```typescript
   // De esto:
   return Promise.resolve(mockWords)
   
   // A esto:
   return apiClient.get('/words').then(res => res.data)
   ```

## 📦 Modelos de Datos

### Word (Palabra)

```typescript
interface Word {
  id: string                 // ID único
  word: string              // La palabra ("Buenos días")
  description: string       // Descripción breve
  steps: WordStep[]         // Pasos para realizar la seña
  videoUrl?: string         // URL del video (opcional)
  category?: string         // Categoría (opcional)
  createdAt: string         // Fecha de creación
  updatedAt: string         // Última actualización
}
```

### WordStep (Paso)

```typescript
interface WordStep {
  stepNumber: number        // Número del paso (1, 2, 3...)
  imageUrl: string         // URL de la imagen del paso
  instruction: string      // Instrucción textual
}
```

### AlphabetLetter

```typescript
interface AlphabetLetter {
  letter: string           // La letra (A, B, C...)
  imageUrl: string         // URL de la imagen
  videoUrl?: string        // URL del video (opcional)
}
```

## 🎯 Características de cada módulo

### 1. Search Module (Búsqueda)

**Ubicación**: `src/modules/search/SearchPage.tsx`

**Características**:
- Búsqueda en tiempo real
- Debounce de 300ms para optimizar
- Muestra resultados mientras escribes
- Navegación directa a palabra seleccionada

**Uso**:
```typescript
// El servicio de búsqueda filtra por coincidencia
const results = await dictionaryService.searchWords("hola")
```

### 2. Dictionary Module (Diccionario)

**Ubicación**: `src/modules/dictionary/WordViewPage.tsx`

**Características**:
- Muestra palabra con descripción completa
- Pasos numerados con imágenes
- Video demostrativo (si existe)
- Diseño estilo diccionario clásico

**Estructura visual**:
1. Título de la palabra
2. Descripción
3. Pasos paso a paso (con placeholders de imágenes)
4. Video demostrativo

### 3. Alphabet Module (Alfabeto)

**Ubicación**: `src/modules/alphabet/AlphabetPage.tsx`

**Características**:
- Grid responsive de letras
- 27 letras (A-Z + Ñ)
- Cada letra muestra su seña
- Diseño en tarjetas (Card)

### 4. Admin Module (Administración)

**Ubicación**: `src/modules/admin/pages/`

#### AdminDashboard
- Lista de todas las palabras
- Estadísticas (total, con video, categorías)
- Botones para editar/eliminar
- Navegación a crear nueva palabra

#### CreateWord
- Formulario completo para nueva palabra
- Agregar/quitar pasos dinámicamente
- Validación de campos requeridos
- Redirección al dashboard al guardar

#### EditWord
- Carga datos de palabra existente
- Misma funcionalidad que CreateWord
- Actualización de palabra

## 🛠️ Desarrollo

### Agregar un nuevo componente UI

```bash
# Los componentes shadcn/ui ya están configurados
# Solo copia desde https://ui.shadcn.com/docs/components
```

### Crear una nueva página

```tsx
// 1. Crear archivo en src/pages/
export default function MiPagina() {
  return <div>Mi contenido</div>
}

// 2. Agregar ruta en App.tsx
<Route path="/mi-ruta" element={<MiPagina />} />
```

### Agregar un nuevo servicio API

```typescript
// 1. Crear servicio en core-api/services/
// src/core-api/services/miServicio.ts
import apiClient from '../client'

export const miServicio = {
  async obtenerDatos() {
    return apiClient.get('/mi-endpoint')
  }
}

// 2. Exportar en core-api/index.ts
export { miServicio } from './services/miServicio'

// 3. Agregar al provider
// src/core-api/providers/ApiProvider.tsx
import { miServicio } from '../services/miServicio'

const value = {
  dictionaryService,
  miServicio // agregar aquí
}

// 4. Usar en componentes
import { useApi } from '@/core-api'

const { miServicio } = useApi()
const datos = await miServicio.obtenerDatos()
```

## 🐛 Debugging

### Ver datos mock actuales

Los datos están en `src/data/mockData.ts`. Puedes agregar más palabras directamente ahí:

```typescript
export const mockWords: Word[] = [
  {
    id: '5',
    word: 'Adiós',
    description: 'Despedida cordial',
    steps: [...],
    // ...
  },
  // ... más palabras
]
```

### Ver qué componentes se están usando

Revisa el navegador en: http://localhost:5173

- `/` - Ver página principal
- `/buscar` - Probar búsqueda
- `/palabra/hola` - Ver una palabra
- `/alfabeto` - Ver alfabeto
- `/admin` - Panel admin

## ✅ Checklist de Próximos Pasos

### Para un MVP funcional:

- [ ] Reemplazar placeholders de imágenes con imágenes reales
- [ ] Agregar más palabras al mockData
- [ ] Implementar carga de archivos (imágenes/videos)
- [ ] Conectar con backend real
- [ ] Agregar autenticación en admin
- [ ] Agregar búsqueda avanzada (por categoría)
- [ ] Implementar paginación
- [ ] Agregar animaciones y transiciones
- [ ] Testing (Jest + React Testing Library)
- [ ] Optimización de imágenes (lazy loading)

### Para producción:

- [ ] SEO (meta tags, sitemap)
- [ ] Analytics
- [ ] Error tracking (Sentry)
- [ ] CI/CD
- [ ] Hosting y dominio
- [ ] Certificado SSL
- [ ] CDN para assets
- [ ] Backup de datos

## 💡 Tips y Mejores Prácticas

1. **Mantén los componentes pequeños**: Un componente = una responsabilidad
2. **Usa TypeScript**: Aprovecha los tipos para evitar bugs
3. **Composition over inheritance**: Compone componentes pequeños
4. **Mantén los estilos consistentes**: Usa las clases de Tailwind
5. **Mock data primero**: Prueba la UI antes de conectar el backend

## 🔗 Enlaces Útiles

- [Documentación de React](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [TailwindCSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

---

**Estado del proyecto**: ✅ Listo para desarrollo y pruebas

**Última actualización**: Marzo 2026
