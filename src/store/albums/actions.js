import API from 'api/albums'

export const fetch_albums = (_, params) => {
  return API.query(params)
}
