import { useRef, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useVideoStore } from '@/store/video.js'
import useMode from "./use-mode"
import useCd from './use-cd';
import { formatTime } from '@/assets/js/util.js'
import ProgressBar from './ProgressBar';
import { PLAY_MODE } from '@/assets/js/constant'
import MiniPlayer from './MiniPlayer'
import { CSSTransition } from 'react-transition-group';
import "./Player.scss"

import dislikePng from '@/components/player/不喜欢.png'
import commentPng from "@/components/player/线条评论.png"
import stopPng from '@/components/player/暂停.png'
import playPng from '@/components/player/开始.png'
import listPng from "@/assets/fonts/菜单.png"
import storePng from "@/components/musicList/收藏.png"
import sharePng from "@/components/player/分享.png"
import nextPng from "@/components/player/下一首.png"

export default function Player() {

  const audioRef = useRef(null);
  const [songReady, setSongReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progressChanging, setProgressChanging] = useState(false);
  
  // zustand
  const store = useVideoStore() 
  const currentSong = useMemo(() => {
    return store.playlist[store.currentIndex] || {};
  }, [store.playlist, store.currentIndex])

  // hooks
  const { modeIcon, changeMode } = useMode();
  const { cdCls, cdRef, cdImageRef } = useCd();
  const navigate = useNavigate()

  // 计算
  const playIcon = useMemo(() => {
    return store.playing?  stopPng : playPng
  }, [store.playing])

  const disableCls = useMemo(() => {
    return songReady ? '' : 'disable'
  }, [songReady])

  const progress = useMemo(() => {
    return currentTime / (currentSong.dt/1000)
  }, [currentTime, currentSong])

  

  function goBack() {
    store.setFullScreen(false)
  }

  function togglePlay(event) {
    if (!songReady) {
      return
    }
    event.stopPropagation();
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
    store.setPlayingState(true)
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

  function updataTime (e) {
    if(!progressChanging) {
      setCurrentTime(e.target.currentTime)
    }
  }

  function handleProgressChanging (progress) {
    setProgressChanging(true)
    setCurrentTime(currentSong.dt / 1000 * progress)
  }
  
  function handleProgressChanged (progress) {
    setProgressChanging(false)
    setCurrentTime(currentSong.dt / 1000 * progress)
    audioRef.current.currentTime = currentSong.dt / 1000 * progress
    if (!store.playing) {
      store.setPlayingState(true)
    }
  }

  function end () {
    setCurrentTime(0)
    if (store.playMode === PLAY_MODE.loop) {
      loop()
    } else {
      next()
    }
  }
  
  function showComment (currentSong) {
    navigate(`/discover/${currentSong.id}/comment`, { state: { currentSong } });
  }

  useEffect(() => {
    if (!currentSong.id || !currentSong.aaaUrl) {
      return
    }
    setCurrentTime(0)
    setSongReady(false)
    const audioEl = audioRef.current
    audioEl.src = currentSong.aaaUrl
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
    <>
      { store.playlist?.length > 0 && (
        <div className="player">
          <CSSTransition
            in={store.fullScreen}
            classNames="normal"
            timeout={500}
            unmountOnExit={true}
          >
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
                <img src={sharePng} className="share" />
              </div>
              <div className="middle">
                <div className="middle-l">
                  <div className="cd-wrapper">
                    <div ref={cdRef} className="cd">
                      <img ref={cdImageRef} className={cdCls} src={currentSong.al.picUrl} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="extra">
                  <div className="extra__favour">
                    <img src={dislikePng} />
                  </div>
                  <div className="extra__comment">
                    <img src={commentPng} onClick={() => showComment(currentSong)}/>
                  </div>
                  <div className="extra__store">
                    <img src={storePng} />
                  </div>
                  <div className="extra__list">
                    <img src={listPng} />
                  </div>
                
                </div>
                <div className="progress-wrapper">
                  <span className="time time-l">{formatTime(currentTime)}</span>
                  <div className="progress-bar-wrapper">
                    <ProgressBar
                      progress={progress}
                      onProgressChanging={handleProgressChanging}
                      onProgressChanged={handleProgressChanged}
                    ></ProgressBar>
                  </div>
                  <span className="time time-r">{formatTime(currentSong.dt/1000)}</span>
                </div>
                <div className="operate">
                  <div className="operate__mode">
                    <img src={modeIcon} onClick={changeMode} />
                  </div>
                  <div className="operate__before">
                    <img src={nextPng} onClick={prev} className={disableCls}/>
                  </div>
                  <div className="operate__stop" onClick={togglePlay}>
                    <img src={playIcon} className={disableCls} />
                  </div>
                  <div className="operate__next">
                    <img src={nextPng} onClick={next} className={disableCls}/>
                  </div>
                  <div className="operate__favour">
                    <img src={dislikePng} />
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
          <MiniPlayer
            togglePlay={togglePlay}
          ></MiniPlayer>
          <audio
            ref = {audioRef}
            onPause = {pause}
            onCanPlay={ready}
            onError={error}
            onTimeUpdate={updataTime}
            onEnded={end}
          ></audio>
        </div>)
      }
    </>
  )
}