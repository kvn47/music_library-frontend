import API from 'api/export_lists'

export const fetch_export_lists = ({commit}) => {
  return API.query()
    .then(export_lists => commit('set_export_lists', export_lists))
}

export const fetch_export_list = (_, id) => {
  return API.get(id)
}

export const create_export_list = ({commit}, params) => {
  return API.create(params)
    .then(export_list => commit('add_export_list', export_list))
}

export const update_export_list = ({commit}, params) => {
  return API.update(params)
    .then(export_list => commit('replace_export_list', export_list))
}

export const delete_export_list = ({commit}, id) => {
  return API.delete(id)
    .then(id => commit('remove_export_list', id))
}

export const add_tracks_to_export_list = ({state, commit}, params) => {
  return API.add_tracks(state.current.id, params)
    .then(export_list => {
      commit('set_current_export_list', export_list)
      commit('success_message', `Tracks added to Export List "${export_list.name}"`)
    })
}

export const remove_track_from_export_list = ({state, commit}, track_id) => {
  return API.remove_track(state.current.id, track_id)
    .then(export_list => commit('set_current_export_list', export_list))
}

export const clear_export_list = ({state, commit}) => {
  return API.clear(state.current)
    .then(export_list => commit('set_current_export_list', export_list))
}

export const export_tracks = ({state, commit}) => {
  return API.export_tracks(state.current)
    .then(response => commit('success_message', response.message))
}
