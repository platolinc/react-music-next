import { useVideoStore } from '/src/store/video.js'
import { useMemo } from 'react'
import { PLAY_MODE } from '/src/assets/js/constant'

export default function useMode() {
  const store = useVideoStore()

  const modeIcon = useMemo(() => {
    const playModeVal = store.playMode
    return playModeVal === PLAY_MODE.sequence
      ? '/src/components/player/列表循环.png'
      : playModeVal === PLAY_MODE.random
        ? '/src/components/player/随机播放.png'
        : '/src/components/player/单曲循环.png'
  }, [store.playMode])

  // const modeText = useMemo(() => {
  //   const playModeVal = store.playMode
  //   return playModeVal === PLAY_MODE.sequence
  //     ? '顺序播放'
  //     : playModeVal === PLAY_MODE.random
  //       ? '随机播放'
  //       : '单曲循环'
  // }, [store.playMode])

  function changeMode() {
    const mode = (store.playMode + 1) % 3
    store.changeMode(mode)
  }

  return {
    modeIcon,
    changeMode
  }
}
