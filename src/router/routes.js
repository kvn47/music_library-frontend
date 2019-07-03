export default [
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {name: 'home', path: '', component: () => import('pages/HomePage.vue')},
      {name: 'settings', path: 'settings', component: () => import('pages/SettingsPage.vue')},
      {name: 'artists', path: 'artists', component: () => import('pages/ArtistsPage.vue')},
      {name: 'import', path: 'import', component: () => import('pages/AlbumsImportPage.vue')},
      {name: 'export_lists', path: 'export_lists', component: () => import('pages/ExportListsPage.vue')},
      {name: 'tracklists', path: 'tracklists', component: () => import('pages/TracklistsPage.vue')},
      {name: 'tracklist', path: 'tracklists/:id', props: true, component: () => import('pages/TracklistPage.vue')},
      {name: 'organizer', path: 'organizer', component: () => import('pages/AlbumOrganizerPage.vue')}
    ]
  },

  {
    path: '/library',
    component: () => import('layouts/LibraryLayout.vue'),
    children: [
      {name: 'library', path: '', component: () => import('pages/LibraryPage.vue')}
    ]
  },

  {
    path: '/notes',
    component: () => import('layouts/NotesLayout.vue'),
    children: [
      {
        name: 'notes',
        path: ':kind?',
        props: true,
        component: () => import('pages/NotesPage.vue')
      },
    ]
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]
