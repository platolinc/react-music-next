import { useRef, useEffect, useMemo, useState } from 'react';
import { useVideoStore } from '/src/store/video.js'
import useMode from "./use-mode"
import "./Player.scss"

export default function Player() {

  const { modeIcon, changeMode } = useMode();
  const audioRef = useRef(null);
  const [songReady, setSongReady] = useState(false);
  const store = useVideoStore()
  
  const currentSong = useMemo(() => {
    return store.playlist[store.currentIndex] || {};
  }, [store.playlist, store.currentIndex])

  const playIcon = useMemo(() => {
    return store.playing?  '/src/components/player/暂停.png' : '/src/components/player/开始.png';
  }, [store.playing])

  const disableCls = useMemo(() => {
    return songReady ? '' : 'disable'
  }, [songReady])

  function goBack() {
    store.setFullScreen(false)
  }
  function togglePlay() {
    if (!songReady) {
      return
    }
    store.setPlayingState(!store.playing)
  }
  function pause() {
    store.setPlayingState(false)
  }
  function prev() {
    const list = store.playlist

    if (!songReady || !list.length) {
      return
    }

    if (list.length === 1) {
      loop()
    } else {
      let index = store.currentIndex - 1
      if (index === -1) {
        index = list.length - 1
      }
      store.setCurrentIndex(index)
      if (!store.playing) {
        store.setPlayingState(true)
      }
    }
  }
  function next() {
    const list = store.playlist

    if (!songReady || !list.length) {
      return
    }

    if (list.length === 1) {
      loop()
    } else {
      let index = store.currentIndex + 1
      if (index === list.length) {
        index = 0
      }
      store.setCurrentIndex(index)
      if (!store.playing) {
        store.setPlayingState(true)
      }
    }
  }
  function loop () {
    const audioEl = audioRef.current
    audioEl.currentTime = 0
    audioEl.play()
  }
  function ready () {
    if (songReady) {
      return
    }
    setSongReady(true)
  }
  function error () {
    setSongReady(true)
  }

  useEffect(() => {
    if (!currentSong.id || !currentSong.aaaUrl) {
      return
    }
    setSongReady(false)
    const audioEl = audioRef.current
    audioEl.src = currentSong.aaaUrl
    console.log(currentSong.aaaUrl)
    audioEl.play()
  }, [currentSong]);

  useEffect(() => {
    if (!songReady) {
      return
    }
    const audioEl = audioRef.current
    store.playing ? audioEl.play() : audioEl.pause()
  }, [store.playing, songReady]);


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
              <img src={modeIcon} onClick={changeMode} />
            </div>
            <div className="bottom__before">
              <img src="/src/components/player/下一首.png" onClick={prev} className={disableCls}/>
            </div>
            <div className="bottom__stop" onClick={togglePlay}>
              <img src={playIcon} className={disableCls} />
            </div>
            <div className="bottom__next">
              <img src="/src/components/player/下一首.png" onClick={next} className={disableCls}/>
            </div>
            <div className="bottom__favour">
              <img src="/src/components/player/不喜欢.png" />
            </div>
          </div>
        </div>
      }
      <audio
        ref = {audioRef}
        onPause = {pause}
        onCanPlay={ready}
        onError={error}
      ></audio>
    </div>
  )
}