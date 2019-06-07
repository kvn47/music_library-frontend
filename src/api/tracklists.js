import API from './api'

export default {
  query (params) {
    return API.query('tracklists', params)
  },

  get (id) {
    return API.get('tracklists', id)
  },

  create (params) {
    return API.post('tracklists', params)
  },

  update (params) {
    return API.patch(`tracklists/${params.id}`, params)
  },

  delete (id) {
    return API.delete(`tracklists/${id}`)
  },

  add_tracks (params) {
    return API.post(`tracklists/${params.tracklist_id}/add_tracks`, params)
  },

  remove_track ({tracklist_id, track_id}) {
    return API.delete(`tracklists/${tracklist_id}/remove_track`, {track_id})
  },

  clear (id) {
    return API.delete(`tracklists/${id}/clear`)
  }
}
