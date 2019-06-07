export const set_export_lists = (state, export_lists) => {
  state.export_lists = export_lists
}

export const add_export_list = (state, export_list) => {
  state.export_lists.push(export_list)
}

export const replace_export_list = (state, export_list) => {
  state.export_lists = state.export_lists.map(t => {
    if (t.id === export_list.id) return export_list
    return t
  })
}

export const remove_export_list = (state, id) => {
  const index = state.export_lists.findIndex(t => t.id === id)
  state.export_lists.splice(index, 1)
}

export const set_current_export_list = (state, export_list) => {
  state.current = export_list
}

export const reset_current_export_list = (state) => {
  state.current = {}
}
