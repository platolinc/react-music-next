import axios from 'axios'


const instance = axios.create({
  baseURL: 'https://vercel.com/lchs-projects-f6561f32/netease-cloud-music-api',
  timeout: 10000
})

export async function processSongs(songs) {
  // if(!songs.length) {
  //   return Promise.resolve(songs)
  // }
  const processedSongs = await Promise.all(songs.map( async (song) => {
    const Url = await instance.get(`/song/url/v1?id=${song.id}&level=jymaster&realIP=61.190.213.226`)
    return {
      ...song,
      aaaUrl: Url.data.data?.[0].url
    }
  }))
  return processedSongs
}

export async function getComment(id) {
  const res = await instance.get(`/comment/music?id=${id}&realIP=61.190.213.226`)
  return res.data
}

