import axios from 'axios'
import { Notify } from "quasar"


const the_axios = axios.create({
  baseURL: '/api',
  headers: {
    'Accept': 'application/json'
  }
})

const handle_error = (error) => {
  let error_details = ''

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    error_details = error.response.data.errors
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

const API = {
  query (resource, params) {
    return the_axios.get(resource, {params})
  },

  post (path, data) {
    return the_axios.post(path, data)
  },

  get (resource, id) {
    return the_axios.get(`${resource}/${id}`)
  },

  create (resource, data) {
    return the_axios.post(resource, data)
  },

  update (resource, data) {
    return the_axios.put(`${resource}/${data.id}`, data)
  },

  delete (resource, id) {
    return the_axios.delete(`${resource}/${id}`)
  }
}

the_axios.interceptors.response.use(response => {
  return response.data.data
}, error => {
  return Promise.reject(handle_error(error))
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = the_axios
}

export { API, the_axios }
