import API from './api'

export default {
  query (params) {
    return API.query('tracks', params)
  },

  get (id) {
    return API.get('tracks', id)
  },

  create (params) {
    return API.post('tracks', params)
  },

  update (params) {
    return API.patch(`tracks/${params.id}`, params)
  },

  delete (id) {
    return API.delete(`tracks/${id}`)
  }
}
