import API from './api'

export default {
  rescan () {
    return API.post('library')
  }
}
