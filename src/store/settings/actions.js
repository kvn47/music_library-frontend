import SettingsAPI from 'api/settings'

export const fetch_settings = ({commit}) => {
  return SettingsAPI.get()
    .then(settings => commit('set_settings', settings))
}
