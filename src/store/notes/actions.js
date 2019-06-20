import { API } from 'boot/api'

const resource = 'notes'

export const fetch_notes = ({ commit }, params) => {
  return API.query(resource, params).then(notes => commit('set_notes', notes))
}

export function fetch_note ({ commit }, id) {
  return API.get(resource, id)
}

export function create_note ({ commit }, data) {
  return API.create(resource, {note: data}).then(note => commit('add_note', note))
}

export function update_note ({ commit }, note) {
  return API.update(resource, note).then(note => commit('replace_note', note))
}

export function delete_note ({ commit }, note) {
  return API.delete(resource, note.id).then(id => commit('remove_note', id))
}
