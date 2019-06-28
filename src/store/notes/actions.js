// import { API } from 'boot/api'
import { the_axios } from 'boot/api'

const resource = 'notes'

export const fetch_notes = ({ commit }, params) => {
  // return API.query(resource, params).then(notes => commit('set_notes', notes))
  return the_axios.get(resource, {params}).then(notes => commit('set_notes', build_notes(notes)))
}

export function fetch_note ({ commit }, id) {
  // return API.get(resource, id)
  return the_axios.get(`${resource}/${id}`)
}

export function create_note ({ commit }, note) {
  // return API.create(resource, {note}).then(note => commit('add_note', note))
  return the_axios.post(resource, note).then(note => commit('add_note', build_note(note)))
}

export function update_note ({ commit }, note) {
  // return API.update(resource, note).then(note => commit('replace_note', note))
  return the_axios.put(`${resource}/${note.id}`, note).then(note => commit('replace_note', build_note(note)))
}

export function advance_note ({commit, state}, note) {
  const new_kind = state.note_kinds[note.kind].next
  return the_axios.put(`${resource}/${note.id}`, {note: {kind: new_kind}}).then(() => commit('remove_note', note.id))
}

export function delete_note ({ commit }, note) {
  // return API.delete(resource, note.id).then(id => commit('remove_note', id))
  return the_axios.delete(`${resource}/${note.id}`).then(id => commit('remove_note', id))
}

function build_note (data) {
  if (data.release_date !== undefined) {
    data.release_date = new Date(data.release_date)
  }
  return data
}

function build_notes (collection) {
  const notes = []
  collection.forEach(data => notes.push(build_note(data)))
  return notes
}
