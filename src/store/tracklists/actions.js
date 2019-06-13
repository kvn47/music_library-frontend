import { API, the_axios } from 'boot/api'

const resource = 'tracklists'

export const fetch_tracklists = ({commit}) => {
  return API.query(resource)
    .then(tracklists => commit('set_tracklists', tracklists))
}

export const fetch_tracklist = ({commit}, id) => {
  return API.get(resource, id)
}

export const create_tracklist = ({commit}, data) => {
  return API.create(resource, data)
    .then(tracklist => commit('add_tracklist', tracklist))
}

export const update_tracklist = ({commit}, data) => {
  return API.update(resource, data)
    .then(tracklist => commit('replace_tracklist', tracklist))
}

export const delete_tracklist = ({commit}, id) => {
  return API.delete(resource, id)
    .then(id => commit('remove_tracklist', id))
}

export const add_tracks_to_tracklist = ({commit}, data) => {
  return the_axios.post(`${resource}/${data.tracklist_id}/add_tracks`, data)
    .then(tracklist => commit('success_message', `Tracks added to Tracklist "${tracklist.name}"`))
}

export const remove_track_from_tracklist = ({commit}, {tracklist_id, track_id}) => {
  return the_axios.delete(`${resource}/${tracklist_id}/remove_track`, {track_id})
}

export const clear_tracklist = ({commit}, id) => {
  return the_axios.delete(`${resource}/${id}/clear`)
}
