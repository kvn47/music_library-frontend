import { API } from 'boot/api'

export const prepare_albums_import = ({commit}, path) => {
  return API.query('albums_import/new', {path: path})
}

export const perform_albums_import = ({commit}, data) => {
  return API.post('albums_import', data)
    .then((result) => commit('success_message', {title: 'PERFORM ALBUMS IMPORT', content: result}))
}
