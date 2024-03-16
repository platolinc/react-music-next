import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

export async function processSongs(songs) {
  // if(!songs.length) {
  //   return Promise.resolve(songs)
  // }
  const processedSongs = await Promise.all(songs.map( async (song) => {
    const Url = await instance.get(`/song/url/v1?id=${song.id}&level=jymaster`)
    return {
      ...song,
      aaaUrl: Url.data.data?.[0].url
    }
  }))
  return processedSongs
}

export async function getComment(id) {
  const res = await instance.get(`/comment/music?id=${id}`)
  return res.data
}

