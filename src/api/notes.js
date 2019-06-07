import API from './api'

export default {
  query (params) {
    return API.query('notes', params)
  },

  get (id) {
    return API.get('notes', id)
  },

  create (params) {
    return API.post('notes', params)
  },

  update (params) {
    return API.put(`notes/${params.id}`, params)
  },

  delete (id) {
    return API.delete(`notes/${id}`)
  }
}
