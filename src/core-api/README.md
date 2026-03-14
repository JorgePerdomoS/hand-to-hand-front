# Core API - Capa de Datos y Servicios

Esta carpeta contiene toda la lógica relacionada con la comunicación con el backend y la gestión de datos.

## 📁 Estructura

```
core-api/
├── client.ts                 # Cliente HTTP (Axios) configurado
├── services/                 # Servicios por dominio
│   └── dictionaryService.ts  # Servicio del diccionario
├── providers/                # React Context Providers
│   └── ApiProvider.tsx       # Provider global de servicios
└── index.ts                  # Exportaciones centralizadas
```

## 🔌 Uso

### Importar en componentes

```tsx
import { useApi } from '@/core-api'

function MiComponente() {
  const { dictionaryService } = useApi()
  
  const palabras = await dictionaryService.getAllWords()
}
```

### Importar en App.tsx

```tsx
import { ApiProvider } from '@/core-api'

function App() {
  return (
    <ApiProvider>
      {/* tu app */}
    </ApiProvider>
  )
}
```

## 📦 Componentes

### 1. client.ts
Cliente HTTP configurado con Axios:
- Base URL configurable por variable de entorno
- Interceptores de request (para tokens de auth)
- Interceptores de response (para manejo de errores)

### 2. services/dictionaryService.ts
Servicio para gestionar palabras del diccionario:

**Métodos disponibles:**
- `getAllWords()` - Obtener todas las palabras
- `getWord(word)` - Obtener palabra específica
- `searchWords(query)` - Buscar palabras
- `createWord(data)` - Crear nueva palabra (admin)
- `updateWord(id, data)` - Actualizar palabra (admin)
- `deleteWord(id)` - Eliminar palabra (admin)

**Estado actual:** Usa mock data desde `@/data/mockData`
**Para conectar con backend real:** Descomentar las llamadas a `apiClient`

### 3. providers/ApiProvider.tsx
Provider de React Context que:
- Expone todos los servicios globalmente
- Permite usar el hook `useApi()` en cualquier componente
- Centraliza la lógica de servicios

### 4. index.ts
Archivo de barril (barrel) que exporta todo:
- Simplifica imports
- Punto único de acceso a la API
- Facilita refactoring

## 🔄 Migrar de Mock Data a API Real

Cuando el backend esté listo:

### Paso 1: Configurar variable de entorno
```env
# .env
VITE_API_URL=https://tu-backend.com/api
```

### Paso 2: Descomentar llamadas en dictionaryService.ts
```typescript
// De esto:
return Promise.resolve(mockWords)

// A esto:
return apiClient.get('/words').then(res => res.data)
```

### Paso 3: Quitar import de mockData
Ya no necesitarás `import { mockWords } from '@/data/mockData'`

## ➕ Agregar un Nuevo Servicio

### 1. Crear el servicio
```typescript
// core-api/services/userService.ts
import apiClient from '../client'

export const userService = {
  async getProfile() {
    return apiClient.get('/users/me').then(res => res.data)
  }
}
```

### 2. Exportar en index.ts
```typescript
export { userService } from './services/userService'
```

### 3. Agregar al provider
```typescript
// core-api/providers/ApiProvider.tsx
import { userService } from '../services/userService'

const value = {
  dictionaryService,
  userService, // ← agregar aquí
}
```

### 4. Usar en componentes
```tsx
const { userService } = useApi()
const profile = await userService.getProfile()
```

## 🛡️ Seguridad

### Tokens de autenticación
El cliente está configurado para agregar automáticamente tokens:

```typescript
// El token se guarda en localStorage
localStorage.setItem('auth_token', 'tu-token-jwt')

// Se agrega automáticamente a todas las llamadas
headers: { Authorization: 'Bearer tu-token-jwt' }
```

### Manejo de errores 401
Si el backend retorna 401 (no autorizado):
- El token se elimina automáticamente
- El usuario debería ser redirigido al login

## 📊 Endpoints Esperados del Backend

```
GET    /api/words           # Todas las palabras
GET    /api/words/:word     # Palabra específica  
GET    /api/words/search    # Buscar (query param: ?q=...)
POST   /api/words           # Crear palabra
PUT    /api/words/:id       # Actualizar palabra
DELETE /api/words/:id       # Eliminar palabra
```

## 💡 Mejores Prácticas

1. **Un servicio por dominio**: Separa por entidad (users, words, etc.)
2. **Tipado completo**: Usa TypeScript types para requests/responses
3. **Manejo de errores**: Usa try/catch en componentes
4. **Loading states**: Maneja estados de carga en UI
5. **Caché opcional**: Considera usar React Query o SWR para caché

## 🔗 Referencias

- Cliente HTTP: Axios
- Estado actual: Mock data
- Listo para: Integración con backend real
