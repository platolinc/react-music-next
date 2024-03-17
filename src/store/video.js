import {create} from 'zustand'
import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'

export const useVideoStore = create((set) => ({
  sequenceList: [],
  playlist: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  // favoriteList: load(FAVORITE_KEY),
  playHistory: [],

  currentSong: (state) => state.playlist[state.currentIndex],

  setPlayingState: (newVal) => {
    set(() => ({playing: newVal}))
  },
  setSequenceList: (newVal) => {
    set(() => ({sequenceList: newVal}))
  },
  setPlaylist: (newVal) => {
    set(() => ({playlist: newVal}))
  },
  setPlayMode: (newVal) => {
    set(() => ({playMode: newVal}))
  },
  setCurrentIndex: (newVal) => {
    set(() => ({currentIndex: newVal}))
  },
  setFullScreen: (newVal) => {
    set(() => ({fullScreen: newVal}))
  },
  // setFavoriteList: (newVal) => {
  //   set(() => ({favoriteList: newVal}))
  // },
  // addSongLyric: (newVal) => {
  //   set(() => ({playing: newVal}))
  // },
  // setSearchHistory: (newVal) => {
  //   set(() => ({playing: newVal}))
  // },
  // setPlayHistory: (newVal) => {
  //   set(() => ({playing: newVal}))
  // },



  // addSongLyric: (song, lyric) =>
  //   set((state) => ({
  //     sequenceList: state.sequenceList.map((item) =>
  //       item.id === song.id ? { ...item, lyric } : item
  //     )
  //   })),

  // setSearchHistory: (searches) =>
  //   set((state) => ({
  //     searchHistory: searches
  //   })),

  // setPlayHistory: (songs) =>
  //   set((state) => ({
  //     playHistory: songs
  //   })),

  selectPlay: (list, index) =>
    set(() => ({
      playMode: PLAY_MODE.sequence,
      sequenceList: list,
      playing: true,
      fullScreen: true,
      playlist: list,
      currentIndex: index
    })),

  randomPlay: (list) =>
    set(() => ({
      playMode: PLAY_MODE.random,
      sequenceList: list,
      playing: true,
      fullScreen: true,
      playlist: shuffle(list),
      currentIndex: 0
    })),

  changeMode: (mode) =>
    set((state) => {
      const currentId = state.playlist[state.currentIndex].id
      let playlist = state.sequenceList
      if (mode === PLAY_MODE.random) {
        playlist = shuffle(state.sequenceList)
      }
      const index = playlist.findIndex((song) => song.id === currentId)
      return {
        playlist,
        currentIndex: index,
        playMode: mode
      }
    })
}))
