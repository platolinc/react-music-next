import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Discover from '/src/views/Discover';
import Podcast from '/src/views/Podcast';
import My from '/src/views/My';
import Follow from '/src/views/Follow';
import Community from '/src/views/Community';
import Docker from "./components/docker/Docker.jsx"
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <div>
          <Docker />
          <Routes>
            <Route path="/" element={<Navigate to="/discover" />} />
            <Route exact path="/discover" element={<Discover />} />
            <Route exact path="/podcast" element={<Podcast />} />
            <Route exact path="/my" element={<My />} />
            <Route exact path="/follow" element={<Follow />} />
            <Route exact path="/community" element={<Community />} />
          </Routes>
        </div>
      </HashRouter>
    </QueryClientProvider>
    
  )
}

export default App
