import { API } from 'boot/api'

const resource = 'albums'

export const fetch_albums = (_, params) => {
  return API.query(resource, params)
}
