import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CompareDevelopers from './pages/CompareDevelopers.jsx'
import CompareRepositories from './pages/CompareRepositories.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard/:username" element={<Dashboard />} />
        <Route path="compare/developers" element={<CompareDevelopers />} />
        <Route path="compare/repositories" element={<CompareRepositories />} />
      </Route>
    </Routes>
  )
}
