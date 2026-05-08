import { Outlet, Link } from 'react-router-dom'
import { Search, Grid3x3, Settings } from 'lucide-react'
import logo from '@/assets/connect.png'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-xl font-semibold hover:opacity-80 transition-opacity">
              <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
              <span>A Una Seña de Distancia</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <Link to="/buscar" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Search className="h-5 w-5" />
                <span>Buscar</span>
              </Link>
              <Link to="/alfabeto" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Grid3x3 className="h-5 w-5" />
                <span>Alfabeto</span>
              </Link>
              <Link to="/admin" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Settings className="h-5 w-5" />
                <span>Admin</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 A Una Seña de Distancia - Diccionario de Lengua de Señas
          </p>
        </div>
      </footer>
    </div>
  )
}
