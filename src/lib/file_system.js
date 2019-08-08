import axios from 'axios'

const http = axios.create({
  headers: {
    'Accept': 'application/json'
  }
})

export const fetch_subdirectories = (path) => {
  return new Promise((resolve, reject) => {
    http.get(path)
      .then(({data}) => {
        const subdirectories = data.filter(child => child.type === 'directory')
        resolve(subdirectories)
      })
      .catch(error => {
        let message
        if (error.response === undefined) {
          message = error.message
        } else {
          message = `${error.response.status} (${error.response.statusText})`
        }
        reject(new Error(message))
      })
  })
}
