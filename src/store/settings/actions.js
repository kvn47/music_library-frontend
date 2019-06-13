import { API } from 'boot/api'

const resource = 'settings'

export const fetch_settings = ({commit}) => {
  return API.query(resource).then(settings => commit('set_settings', settings))
}
