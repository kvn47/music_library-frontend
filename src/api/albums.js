import API from './api'

export default {
  query (params) {
    return API.query('albums', params)
  },

  get (id) {
    return API.get('albums', id)
  },

  create (params) {
    return API.post('albums', params)
  },

  update (id, params) {
    return API.patch(`albums/${id}`, params)
  },

  delete (id) {
    return API.delete(`albums/${id}`)
  }
}
