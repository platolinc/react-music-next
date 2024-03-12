import { useRef, useEffect, useMemo } from 'react';
import { useVideoStore } from '/src/store/video.js'
import "./Player.scss"

export default function Player() {
  const audioRef = useRef(null);
  const store = useVideoStore()
  
  const currentSong = useMemo(() => {
    return store.playlist[store.currentIndex] || {};
  }, [store.playlist, store.currentIndex])


  function goBack() {
    store.setFullScreen(false)
  }

  useEffect(() => {
    if (!currentSong.id || !currentSong.aaaUrl) {
      return
    }
    const audioEl = audioRef.current
    audioEl.src = currentSong.aaaUrl
    console.log(currentSong.aaaUrl)
    audioEl.play()
  }, [currentSong]);

  return (
    <div className="player">
      {store.fullScreen && 
        <div className="normal-player">
          <div className="background">
            <img src={currentSong.al.picUrl}/>
          </div>
          <div className="top">
            <div
              className="back"
              onClick={goBack}
            >
            <div> {'<'} </div>
            </div>
            <h1 className="title">{currentSong.name}</h1>
            <h2 className="subtitle">{currentSong?.ar?.[0]?.name}</h2>
            <img src="/src/components/player/分享.png" className="share" />
          </div>
        </div>
      }
      <audio
        ref = {audioRef}
      ></audio>
    </div>
  )
}