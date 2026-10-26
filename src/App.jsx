import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Browse from './pages/Browse.jsx'
import Search from './pages/Search.jsx'
import MovieDetail from './pages/MovieDetail.jsx'
import Watchlist from './pages/Watchlist.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="browse" element={<Browse />} />
        <Route path="search" element={<Search />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}