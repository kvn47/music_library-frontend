import API from 'api/artists'

export const fetch_artists = () => {
  return API.query()
}

export const fetch_artist = (_, id) => {
  return API.get(id)
}

export const create_artist = (_, params) => {
  return API.create(params)
}

export const update_artist = (_, params) => {
  return API.update(params)
}

export const delete_artist = (_, id) => {
  return API.delete(id)
}
