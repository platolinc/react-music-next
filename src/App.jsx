import { HashRouter, Route, Routes } from 'react-router-dom';
import Discover from '/src/views/Discover';
import Podcast from '/src/views/Podcast';
import My from '/src/views/My';
import Follow from '/src/views/Follow';
import Community from '/src/views/Community';
import Docker from "./components/docker/Docker.jsx"

function App() {
  return (
    <HashRouter>
      <div>
        <Docker />
        <Routes>
          <Route exact path="/discover" element={<Discover />} />
          <Route exact path="/podcast" element={<Podcast />} />
          <Route exact path="/my" element={<My />} />
          <Route exact path="/follow" element={<Follow />} />
          <Route exact path="/community" element={<Community />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
