import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Discover from '@/views/Discover';
import Album from '@/views/Album.jsx'
import Comment from './components/player/Comment.jsx';
import Podcast from '@/views/Podcast';
import My from '@/views/My';
import Follow from '@/views/Follow';
import Community from '@/views/Community';
import Docker from "@/components/docker/Docker.jsx"
import Player from '@/components/player/Player.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/discover" />} />
            <Route exact path="/discover" element={<Discover />} />
            <Route exact path="/discover/:id" element={<Album />} />
            <Route exact path="/discover/:songid/comment" element={<Comment />} />
            <Route exact path="/podcast" element={<Podcast />} />
            <Route exact path="/my" element={<My />} />
            <Route exact path="/follow" element={<Follow />} />
            <Route exact path="/community" element={<Community />} />
          </Routes>
          <Docker />
          <Player />
        </div>
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
