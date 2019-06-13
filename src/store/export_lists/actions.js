import { API, the_axios } from 'boot/api'

const resource = 'export_lists'

export const fetch_export_lists = ({commit}) => {
  return API.query(resource)
    .then(export_lists => commit('set_export_lists', export_lists))
}

export const fetch_export_list = (_, id) => {
  return API.get(resource, id)
}

export const create_export_list = ({commit}, data) => {
  return API.create(resource, data)
    .then(export_list => commit('add_export_list', export_list))
}

export const update_export_list = ({commit}, data) => {
  return API.update(resource, data)
    .then(export_list => commit('replace_export_list', export_list))
}

export const delete_export_list = ({commit}, id) => {
  return API.delete(resource, id)
    .then(id => commit('remove_export_list', id))
}

export const add_tracks_to_export_list = ({state, commit}, data) => {
  return the_axios.post(`export_lists/${state.current.id}/add`, data)
    .then(export_list => {
      commit('set_current_export_list', export_list)
      commit('success_message', `Tracks added to Export List "${export_list.name}"`)
    })
}

export const remove_track_from_export_list = ({state, commit}, track_id) => {
  return the_axios.patch(`export_lists/${state.current.id}/remove`, {track_id: track_id})
    .then(export_list => commit('set_current_export_list', export_list))
}

export const clear_export_list = ({state, commit}) => {
  return the_axios.patch(`export_lists/${state.current.id}/clear`)
    .then(export_list => commit('set_current_export_list', export_list))
}

export const export_tracks = ({state, commit}) => {
  return the_axios.post(`export_lists/${state.current.id}/export`, {destination_path: state.current.destination_path})
    .then(response => commit('success_message', response.message))
}
