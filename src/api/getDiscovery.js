import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

export async function getBanner() {
  const banner = await instance.get('/banner')
  return banner.data
}

export async function getIcon() {
  const banner = await instance.get('/homepage/block/page')
  return banner.data
}