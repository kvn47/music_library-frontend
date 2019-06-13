import { API } from 'boot/api'

const resource = 'notes'

export const fetch_notes = ({ commit }, params) => {
  return API.query(resource, params)

  // return notes_collection.onSnapshot(res => {
  //   const notes = []
  //
  //   res.forEach(doc => {
  //     const note = build_note(doc)
  //     notes.push(note)
  //   })
  //
  //   commit('set_notes', notes)
  // })
}

export function fetch_note ({ commit }, id) {
  return API.get(resource, id)
    // .then(note => build_note(note))
}

export function create_note ({ commit }, data) {
  return API.create(resource, data).then(note => commit('add_note', note))

  // return notes_collection.add(data)

  // return notes_collection.add(data).then(ref => {
  //   ref.get().then(doc => {
  //     const note = build_note(doc)
  //     commit('add_note', note)
  //   })
  // })
}

export function update_note ({ commit }, note) {
  return API.update(resource, note).then(note => commit('replace_note', note))
}

export function delete_note ({ commit }, note) {
  return API.delete(resource, note.id).then(id => commit('remove_note', id))
}

// function build_note (doc) {
//   const note = doc.data()
//   note.id = doc.id
//   if (note.release_date !== undefined) {
//     note.release_date = note.release_date.toDate()
//   }
//   return note
// }
