import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Guardian from './pages/Guardian'
import Impact from './pages/Impact'
import Blog from './pages/Blog'
import Incidents from './pages/Incidents'
import IncidentDetail from './pages/IncidentDetail'
import About from './pages/About'
import ArticleDetail from './pages/ArticleDetail'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import ProtectedRoute from './routes/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Posts from './pages/Posts'
import OAuth2RedirectHandler from './components/auth/OAuth2RedirectHandler'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/guardian" element={<Guardian />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/incidents/:id" element={<IncidentDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/new" element={<CreatePost />} />
              </Route>
              <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App