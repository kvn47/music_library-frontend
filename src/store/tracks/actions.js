import API from 'api/tracks'

export const fetch_tracks = (_, params) => {
  return API.query(params)
}
