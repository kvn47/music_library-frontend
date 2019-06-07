import API from './api'

export default {
  prepare (path) {
    return API.query('albums_import/new', {path: path})
  },

  perform (params) {
    return API.post('albums_import', params)
  }
}
