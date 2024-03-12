import { useRef, useEffect, useMemo } from 'react';
import { useVideoStore } from '/src/store/video.js'
import "./Player.scss"

export default function Player() {
  const audioRef = useRef(null);
  const store = useVideoStore()
  
  const currentSong = useMemo(() => {
    return store.playlist[store.currentIndex] || {};
  }, [store.playlist, store.currentIndex])

  const playIcon = useMemo(() => {
    return store.playing?  '/src/components/player/暂停.png' : '/src/components/player/开始.png';
  }, [store.playing])

  function goBack() {
    store.setFullScreen(false)
  }
  function togglePlay() {
    store.setPlayingState(!store.playing)
  }
  function pause() {
    store.setPlayingState(false)
  }

  useEffect(() => {
    if (!currentSong.id || !currentSong.aaaUrl) {
      return
    }
    const audioEl = audioRef.current
    audioEl.src = currentSong.aaaUrl
    console.log(currentSong.aaaUrl)
    audioEl.play()
    store.playing ? audioEl.play() : audioEl.pause()
  }, [currentSong, store.playing]);

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
          <div className="bottom">
            <div className="bottom__mode">
              <img src="/src/components/player/列表循环.png" className="w-5 h-5"/>
            </div>
            <div className="bottom__before">
              <img src="/src/components/player/下一首.png" className="w-6 h-6 -rotate-180" />
            </div>
            <div className="bottom__stop" onClick={togglePlay}>
              <img src={playIcon} className="w-14 h-14" />
            </div>
            <div className="bottom__next">
              <img src="/src/components/player/下一首.png" className="w-6 h-6" />
            </div>
            <div className="bottom__favour">
              <img src="/src/components/player/不喜欢.png" className="w-7 h-7"/>
            </div>
          </div>
        </div>
      }
      <audio
        ref = {audioRef}
        onPause = {pause}
      ></audio>
    </div>
  )
}