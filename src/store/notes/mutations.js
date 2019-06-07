export const set_notes = (state, notes) => {
  state.notes = notes
}

export const add_note = (state, note) => {
  state.notes.push(note)
}

export const replace_note = (state, note) => {
  state.notes = state.notes.map(n => {
    if (n.id === note.id) return note
    return n
  })
}

export const remove_note = (state, id) => {
  const index = state.notes.findIndex(n => n.id === id)
  state.notes.splice(index, 1)
}
