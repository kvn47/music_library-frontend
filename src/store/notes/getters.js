export const note_kinds = (state) => {
  return state.note_kinds
}

export const next_kind_for = (state) => (kind_name) => {
  const kind = state.note_kinds[kind_name]
  if (kind !== undefined) {
    return state.note_kinds[kind.next]
  } else {
    return {}
  }
}
