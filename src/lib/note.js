export function note_label (note) {
  if (note.album) {
    return [note.artist, note.album].join(' - ')
  } else {
    return note.artist
  }
}
