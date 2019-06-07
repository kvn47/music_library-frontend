import API from './api'

export default {
  query (params) {
    return API.query('export_lists', params)
  },

  get (id) {
    return API.get('export_lists', id)
  },

  create (params) {
    return API.post('export_lists', params)
  },

  update (params) {
    return API.patch(`export_lists/${params.id}`, params)
  },

  delete (id) {
    return API.delete(`export_lists/${id}`)
  },

  add_tracks (export_list_id, params) {
    return API.post(`export_lists/${export_list_id}/add`, params)
  },

  remove_track (export_list_id, track_id) {
    return API.patch(`export_lists/${export_list_id}/remove`, {track_id: track_id})
  },

  clear (export_list) {
    return API.patch(`export_lists/${export_list.id}/clear`)
  },

  export_tracks (export_list) {
    return API.post(`export_lists/${export_list.id}/export`, {destination_path: export_list.destination_path})
  }
}
