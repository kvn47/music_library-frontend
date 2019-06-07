export const set_tracklists = (state, tracklists) => {
  state.tracklists = tracklists
}

export const add_tracklist = (state, tracklist) => {
  state.tracklists.push(tracklist)
}

export const replace_tracklist = (state, tracklist) => {
  state.tracklists = state.tracklists.map(t => {
    if (t.id === tracklist.id) return tracklist
    return t
  })
}

export const remove_tracklist = (state, id) => {
  const index = state.tracklists.findIndex(t => t.id === id)
  state.tracklists.splice(index, 1)
}
