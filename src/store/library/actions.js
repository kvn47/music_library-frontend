import LibraryAPI from 'api/library'

export const rescan_library = () => {
  return LibraryAPI.rescan()
}
