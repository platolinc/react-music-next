import { useLocation } from 'react-router-dom';
import { getPlaylist } from '../api/getDiscovery';
import { processSongs } from '../api/getSong';
import { useQuery } from "react-query";
import MusicList from '../components/musicList/MusicList'
import { useState, useEffect } from 'react';

export default function Album() {
  const location = useLocation();
  const album = location.state.album;

  const [modifiedList, setModifiedList] = useState({ songs: [] , isLoading: true, error: null });

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      try {
        const res = await getPlaylist(album.id);

        const processedList = await processSongs(res.songs);
        setModifiedList({ songs: processedList, isLoading: false, error: null });
      } catch (error) {
        console.error(error);
        setModifiedList({ songs: [] , isLoading: false, error: error.message });
      }
    };
    fetchDataAndProcess();
  }, []);

  if (modifiedList.isLoading) return (
    <div style={{height: '100%', padding:'40px 18px'}}>
      <div style={{display: 'inline-block', width: '100px', height: '100px', left:'0', marginTop: '26px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{display: 'inline-block'}}>
        <div style={{width: '140px', height: '12px', marginLeft:'18px', marginBottom:'25px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
        <div style={{width: '200px', height: '12px', marginLeft:'18px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      </div>
      <div style={{width: '80%', height: '12px', left:'5px', marginTop: '110px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '80%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '80%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '80%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
    </div>
  )
  if (modifiedList.error) return <div>Error: {modifiedList.error}</div>;

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
        songs={modifiedList.songs}
        title={album.name}
        pic={album.picUrl}
        trackCount={album.trackCount}
      />
    </div>
  )
}