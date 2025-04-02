import { Routes , Route } from 'react-router-dom';
import Feed from './components/Feed.jsx'
import TopUsers from './components/TopUsers.jsx'
import TrendingPosts from './components/TrendingPosts.jsx'
import Navigation from './components/Navigation.jsx'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    {/* Navigation Component */}
    <Navigation />

    {/* Main Content */}
    <main>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/top-users" element={<TopUsers />} />
        <Route path="/trending" element={<TrendingPosts />} />
      </Routes>
    </main>
  </div>
  )
}

export default App
