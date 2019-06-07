import axios from 'axios'
// import Auth from 'lib/auth'
import { Notify } from 'quasar'

// axios.defaults.baseURL = '/api'
// axios.defaults.headers.common['Authorization'] = Auth.get_token()

const the_axios = axios.create({
  baseURL: '/api'
})

const handle_error = (error) => {
  let error_details = ''

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    error_details = error.response.data.message
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }

  // return new Error(`[API] ${error.request.method} ${error.request.url} => ${error.response.data}`)
  const req = `${error.config.method} ${error.config.url.replace(error.config.baseURL, '')}`
  const resp = `${error.response.status} (${error.response.statusText})`
  const error_message = `[API] ${req} => ${resp}`

  Notify.create({
    message: error_message,
    detail: error_details,
    color: 'negative',
    textColor: 'white',
    timeout: 0,
    actions: [{ icon: 'fas fa-times' }]
  })

  return error_message
}

the_axios.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(handle_error(error))
})

export default {
  query (resource, params) {
    return the_axios.get(resource, { params })
  },

  get (resource, id = '') {
    return the_axios.get(`${resource}/${id}`)
  },

  post (resource, params) {
    return the_axios.post(resource, params)
  },

  put (resource, params) {
    return the_axios.put(resource, params)
  },

  patch (resource, params) {
    return the_axios.patch(resource, params)
  },

  delete (resource) {
    return the_axios.delete(resource)
  }
}
