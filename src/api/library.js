import API from 'boot/api'

export default {
  rescan () {
    return API.post('library')
  }
}
