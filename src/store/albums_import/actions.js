import API from 'api/albums_import'

export const prepare_albums_import = ({commit}, path) => {
  return API.prepare(path)
}

export const perform_albums_import = ({commit}, params) => {
  return API.perform(params)
    .then((result) => commit('success_message', {title: 'PERFORM ALBUMS IMPORT', content: result}))
}
