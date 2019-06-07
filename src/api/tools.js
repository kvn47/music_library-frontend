import API from './api'

export default {
  collect_info (params) {
    return API.query('collect_info', params)
  },

  find_work_info (params) {
    return API.query('find_work_info', params)
  },

  search_artist (params) {
    return API.query('search_artist', params)
  },

  organize_files (params) {
    return API.post('organize_files', params)
  }
}
