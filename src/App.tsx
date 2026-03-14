import { Routes, Route } from 'react-router-dom'
import { ApiProvider } from './core-api'
import Layout from './components/Layout'

// Pages
import HomePage from './pages/HomePage'
import SearchPage from './modules/search/SearchPage'
import WordViewPage from './modules/dictionary/WordViewPage'
import AlphabetPage from './modules/alphabet/AlphabetPage'
import AdminDashboard from './modules/admin/pages/AdminDashboard'
import CreateWord from './modules/admin/pages/CreateWord'
import EditWord from './modules/admin/pages/EditWord'

function App() {
  return (
    <ApiProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="buscar" element={<SearchPage />} />
          <Route path="palabra/:word" element={<WordViewPage />} />
          <Route path="alfabeto" element={<AlphabetPage />} />
          
          {/* Admin routes */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/nueva-palabra" element={<CreateWord />} />
          <Route path="admin/editar/:id" element={<EditWord />} />
        </Route>
      </Routes>
    </ApiProvider>
  )
}

export default App
