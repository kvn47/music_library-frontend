export default {
  notes: [],

  note_kinds: {
    await: {title: 'Await', color: 'cyan-4', icon: 'fas fa-calendar-alt', next: 'listen'},
    listen: {title: 'Listen', color: 'indigo-4', icon: 'fas fa-headphones', next: 'download'},
    download: {title: 'Download', color: 'purple-4', icon: 'fas fa-cloud-download-alt', next: 'keep'},
    keep: {title: 'Keep', color: 'deep-purple-4', icon: 'fas fa-hdd', next: 'archive'},
    archive: {title: 'Archive', color: 'grey-4', icon: 'fas fa-archive'}
  }
}
