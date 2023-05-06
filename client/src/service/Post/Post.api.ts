import ky from 'ky'

const PREFIX_API = '/api'

export const publishPost = () => {
  try {
    const response = ky.post(`${PREFIX_API}/post`)
  } catch (e) {}
}
