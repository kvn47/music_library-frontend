import API from './api'

export default {
  query (params) {
    return API.query('artists', params)
  },

  get (id) {
    return API.get('artists', id)
  },

  create (data) {
    return API.post('artists', data)
  },

  update (params) {
    return API.patch(`artists/${params.id}`, params)
  },

  delete (id) {
    return API.delete(`artists/${id}`)
  }
}

// const artists = [
//   {
//     id: '1',
//     name: 'Artist 1',
//     image: 'statics/icons/icon-128x128.png',
//     albums: [
//       {
//         id: '1',
//         year: '2018',
//         title: 'Album 1',
//         cover: 'statics/icons/icon-128x128.png',
//         tracks: [
//           {
//             id: '1',
//             title: 'Track 1',
//             number: '1'
//           }
//         ]
//       }
//     ]
//   }
// ]
