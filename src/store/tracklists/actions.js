import API from 'api/tracklists'

export const fetch_tracklists = ({commit}) => {
  return API.query()
    .then(tracklists => commit('set_tracklists', tracklists))
}

export const fetch_tracklist = ({commit}, id) => {
  return API.get(id)
}

export const create_tracklist = ({commit}, params) => {
  return API.create(params)
    .then(tracklist => commit('add_tracklist', tracklist))
}

export const update_tracklist = ({commit}, params) => {
  return API.update(params)
    .then(tracklist => commit('replace_tracklist', tracklist))
}

export const delete_tracklist = ({commit}, id) => {
  return API.delete(id)
    .then(id => commit('remove_tracklist', id))
}

export const add_tracks_to_tracklist = ({commit}, params) => {
  return API.add_tracks(params)
    .then(tracklist => commit('success_message', `Tracks added to Tracklist "${tracklist.name}"`))
}

export const remove_track_from_tracklist = ({commit}, {tracklist_id, track_id}) => {
  return API.remove_track({tracklist_id, track_id})
}

export const clear_tracklist = ({commit}, id) => {
  return API.clear(id)
}
