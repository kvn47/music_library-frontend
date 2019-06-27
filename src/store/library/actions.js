import {API} from 'boot/api'

export const rescan_library = () => {
  return API.post('library')
}
