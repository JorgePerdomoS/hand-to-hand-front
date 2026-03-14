# 🚀 Quick Start - A Una Seña de Distancia

## Inicio Rápido (5 minutos)

### 1. Verificar instalación

```bash
# El proyecto ya está instalado y corriendo en:
# http://localhost:5173
```

### 2. Explorar la aplicación

Abre tu navegador y visita:

#### Rutas Principales:
- **http://localhost:5173/** - Página de inicio
- **http://localhost:5173/buscar** - Buscar palabras
- **http://localhost:5173/palabra/hola** - Ver palabra "Hola"
- **http://localhost:5173/alfabeto** - Alfabeto completo
- **http://localhost:5173/admin** - Panel de administración

### 3. Probar funcionalidades

#### 🔍 Búsqueda
1. Ve a `/buscar`
2. Escribe "grac" en el buscador
3. Verás "Gracias" aparecer en tiempo real
4. Haz clic para ver los detalles

#### 📖 Ver una palabra
1. Ve a `/palabra/buenos días`
2. Verás:
   - Título y descripción
   - Pasos numerados (con placeholders)
   - Sección de video

#### 🔤 Alfabeto
1. Ve a `/alfabeto`
2. Verás todas las letras (A-Z + Ñ)
3. Cada una en su propia tarjeta

#### ⚙️ Panel Admin
1. Ve a `/admin`
2. Verás:
   - Estadísticas del diccionario
   - Lista de palabras
   - Botones para editar/eliminar
3. Haz clic en "Nueva palabra"
4. Llena el formulario y guarda

## 📝 Palabras de Prueba Disponibles

Actualmente hay 4 palabras de ejemplo:

1. **Buenos días** - 3 pasos
2. **Gracias** - 2 pasos
3. **Hola** - 2 pasos
4. **Por favor** - 2 pasos

Todas tienen categorías y descripciones completas.

## 🛠️ Comandos Útiles

```bash
# Detener el servidor
# Presiona Ctrl+C en la terminal

# Iniciar nuevamente
npm run dev

# Construir para producción
npm run build

# Ver la versión de producción
npm run preview
```

## ✏️ Modificar Mock Data

Para agregar más palabras de prueba:

1. Abre `src/data/mockData.ts`
2. Agrega una nueva palabra al array:

```typescript
{
  id: '5',
  word: 'Buenas tardes',
  description: 'Saludo para la tarde',
  steps: [
    {
      stepNumber: 1,
      imageUrl: '/mock/buenas-tardes-1.jpg',
      instruction: 'Coloca tu mano derecha frente al pecho',
    },
  ],
  category: 'Saludos',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
```

3. Guarda el archivo
4. El navegador se actualizará automáticamente

## 🎨 Personalizar estilos

Los estilos usan TailwindCSS. Para cambiar colores:

1. Abre `src/index.css`
2. Modifica las variables CSS en `:root`
3. Los cambios se aplican automáticamente

## 📱 Ver en dispositivos móviles

```bash
# Inicia el servidor con acceso de red:
npx vite --host

# Luego accede desde tu móvil usando la IP:
# http://192.168.x.x:5173
```

## 🐛 Solución de Problemas Comunes

### El servidor no inicia
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Errores de TypeScript
```bash
# Verificar que el tsconfig.json tenga la configuración correcta
# Ya está configurado, pero si hay problemas:
npx tsc --noEmit
```

### Cambios no se reflejan
```bash
# Limpiar caché de Vite
rm -rf node_modules/.vite
npm run dev
```

## 📚 Próximos Pasos Sugeridos

1. **Explorar el código**:
   - Lee `src/App.tsx` para ver las rutas
   - Revisa `src/modules/*/` para ver cada módulo
   - Mira `src/components/ui/` para ver los componentes

2. **Agregar más palabras**:
   - Edita `src/data/mockData.ts`
   - Agrega al menos 10 palabras más

3. **Personalizar el diseño**:
   - Modifica `src/components/Layout.tsx`
   - Cambia colores en `src/index.css`

4. **Preparar para imágenes reales**:
   - Crea carpeta `public/images/`
   - Actualiza las URLs en mockData

5. **Leer la guía completa**:
   - Abre `GUIA_DESARROLLO.md`
   - Revisa la arquitectura completa
   - Entiende el flujo de datos

## ✅ Checklist de Verificación

- [ ] El servidor corre en http://localhost:5173
- [ ] Puedo navegar entre páginas
- [ ] La búsqueda funciona
- [ ] Puedo ver palabras individuales
- [ ] El alfabeto se muestra correctamente
- [ ] El panel admin carga correctamente
- [ ] Puedo crear una nueva palabra (en el formulario)

## 🆘 Ayuda

Si algo no funciona:

1. Verifica que todas las dependencias estén instaladas: `npm install`
2. Asegúrate de estar en la carpeta del proyecto
3. Revisa la consola del navegador (F12) para errores
4. Revisa la terminal para errores del servidor

---

**¡Listo!** Tu diccionario de lengua de señas está funcionando. 🎉

Ahora puedes:
- Explorar el código
- Agregar más contenido
- Personalizar el diseño
- Preparar para conectar con un backend real
