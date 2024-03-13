import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

export async function getBanner() {
  const res = await instance.get('/banner')
  return res.data
}

export async function getIcon() {
  const res = await instance.get('/homepage/block/page')
  return res.data
}

export async function getAlbum() {
  const res = await instance.get('/personalized?limit=7')
  return res.data
}

export async function getSongs() {
  const res = await instance.get('/top/song?type=7')
  return res.data
}

export async function getPlaylist(id) {
  const res = await instance.get(`/playlist/track/all?id=${id}&limit=20`)
  return res.data
}