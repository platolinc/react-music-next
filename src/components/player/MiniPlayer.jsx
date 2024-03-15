import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useVideoStore } from '/src/store/video.js'
import useCd from './use-cd';
import { CSSTransition } from 'react-transition-group';
import './MiniPlayer.scss'

export default function MiniPlayer({togglePlay}) {
  const location = useLocation()
  
  const showMiniPlayerAboveDocker = useMemo(() => {
    return (location.pathname === '/discover' 
      || location.pathname === '/podcast' 
      || location.pathname === '/my' 
      || location.pathname === '/follow' 
      || location.pathname === '/community' ) ? "above-mini-player" : "mini-player"
  }, [location.pathname])

  const store = useVideoStore();
  const currentSong = useMemo(() => {
    return store.playlist[store.currentIndex] || {};
  }, [store.playlist, store.currentIndex])

  const { cdCls, cdRef, cdImageRef } = useCd();

  const playIcon = useMemo(() => {
    return store.playing?  '/src/components/player/暂停.png' : '/src/components/player/开始.png';
  }, [store.playing])

  function showNormalPlayer() {
    store.setFullScreen(true)
  }

  return (
    <>
      <CSSTransition
        in={!store.fullScreen}
        classNames="mini"
        timeout={600}
        unmountOnExit={true}
      >
        <div
          className={ showMiniPlayerAboveDocker }
          onClick={showNormalPlayer}
        >
          <div className="cd-wrapper">
            <div
              ref={cdRef}
              className="cd"
            >
              <img
                ref={cdImageRef}
                width="40"
                height="40"
                src={currentSong.al.picUrl}
                className={cdCls}              
                />
            </div>
          </div>
          <div className="slider-wrapper">
            <h2 className="name">{currentSong.name}</h2>
            <h2 className="desc">- {currentSong?.ar?.[0]?.name}</h2>
          </div>
          <div className="control">
            <img
              className="icon-mini"
              src={playIcon}
              onClick={togglePlay}
            />
          </div>
          <div className="control">
            <img src="/src/assets/fonts/菜单.png" className="icon-playlist" />
          </div>
        </div>
      </CSSTransition>
    </> 
  )
}
