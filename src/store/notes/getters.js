export const note_kinds = (state) => {
  return state.note_kinds
}

export const note_kinds_array = (state) => {
  return Object.entries(state.note_kinds).map((kind) => Object.assign(kind[1], { name: kind[0] }))
}

export const notes_of_kind = (state) => (kind) => {
  let notes = state.notes.filter(note => note.kind === kind)
  if (kind === 'await') { notes = notes.sort((n1, n2) => n1.release_date - n2.release_date) }
  return notes
}

export const search_notes = (state) => (str) => {
  if (str != null) {
    return state.notes.filter(note => {
      return note.artist.toLowerCase().includes(str.toLowerCase()) ||
        note.album.toLowerCase().includes(str.toLowerCase())
    })
  } else {
    return state.notes
  }
}

export const next_kind_for = (state) => (kind_name) => {
  const kind = state.note_kinds[kind_name]
  if (kind !== undefined) {
    return state.note_kinds[kind.next]
  } else {
    return {}
  }
}
