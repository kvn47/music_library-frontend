export default {
  notes: [],

  note_kinds: {
    await: {title: 'Await', color: 'cyan', icon: 'fas fa-calendar-alt', next: 'listen'},
    listen: {title: 'Listen', color: 'indigo', icon: 'fas fa-headphones', next: 'download'},
    download: {title: 'Download', color: 'purple', icon: 'fas fa-download', next: 'keep'},
    keep: {title: 'Keep', color: 'deep-purple', icon: 'fas fa-hdd', next: 'archive'},
    archive: {title: 'Archive', color: 'grey', icon: 'fas fa-archive'}
  }
}
