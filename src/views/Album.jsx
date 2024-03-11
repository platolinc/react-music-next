import { useLocation } from 'react-router-dom';
import { getPlaylist } from '../api/getDiscovery';
import { useQuery } from "react-query";
import MusicList from '../components/musicList/MusicList'

export default function Album() {
  const location = useLocation();
  const album = location.state.album;

  const { data, isLoading, error } = useQuery('playlistData', () => getPlaylist(album.id));
  if (isLoading || !data) return (
    <div style={{height: '100%', padding:'40px 30px'}}>
      <div style={{width: '80%', height: '12px', left:'5px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '80%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '80%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '80%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
    </div>
  )
  if (error) return <div>Error: {error.message}</div>;

  const playlist = data.songs
  
  return (
    <div style={{
        position: 'absolute',
        zIndex: '10',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        overflowY: scroll,
      }}
    >
      <MusicList
        songs={playlist}
        title={album.name}
        pic={album.picUrl}
        trackCount={album.trackCount}
      />
    </div>
  )
}