export default [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {name: 'home', path: '', component: () => import('pages/HomePage.vue')},
      {name: 'settings', path: 'settings', component: () => import('pages/SettingsPage.vue')},
      {name: 'artists', path: 'artists', component: () => import('pages/ArtistsPage.vue')},
      {name: 'import', path: 'import', component: () => import('pages/AlbumsImportPage.vue')},
      {name: 'export_lists', path: 'export_lists', component: () => import('pages/ExportListsPage.vue')},
      {name: 'tracklists', path: 'tracklists', component: () => import('pages/TracklistsPage.vue')},
      {name: 'tracklist', path: 'tracklists/:id', component: () => import('pages/TracklistPage.vue'), props: true},
      {name: 'organizer', path: 'organizer', component: () => import('pages/AlbumOrganizerPage.vue')}
    ]
  },

  // {
  //   path: '/library',
  //   component: () => import('layouts/LibraryLayout.vue'),
  //   children: [
  //     {name: 'library', path: '', component: () => import('pages/LibraryPage.vue')}
  //   ]
  // },

  {
    path: '/notes',
    component: () => import('layouts/NotesLayout.vue'),
    children: [
      {name: 'notes', path: '', component: () => import('pages/NotesPage.vue'), props: {kind: 'released'}},
      {name: 'notes_kind', path: ':kind', component: () => import('pages/NotesPage.vue'), props: true}
    ]
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]
