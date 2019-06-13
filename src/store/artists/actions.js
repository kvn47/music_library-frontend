import { API } from 'boot/api'

const resource = 'artists'

export const fetch_artists = () => {
  return API.query(resource)
}

export const fetch_artist = (_, id) => {
  return API.get(resource, id)
}

export const create_artist = (_, data) => {
  return API.create(resource, data)
}

export const update_artist = (_, data) => {
  return API.update(resource, data)
}

export const delete_artist = (_, id) => {
  return API.delete(id)
}
