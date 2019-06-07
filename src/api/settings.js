import API from './api'

export default {
  get () {
    return API.query('settings')
  }
}
