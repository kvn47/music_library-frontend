import { API } from 'boot/api'

const resource = 'tracks'

export const fetch_tracks = (_, params) => {
  return API.query(resource, params)
}
