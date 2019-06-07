<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-icon name="fas fa-chevron-right" slot="separator" slot-scope="props" size="1rem"/>
      <q-breadcrumbs-el><q-btn flat icon="fas fa-music" @click="go_home"></q-btn></q-breadcrumbs-el>
      <q-breadcrumbs-el v-if="is_artist_selected">
        <q-btn
          @click="select_artist(current_artist)"
          :label="current_artist.name"
          icon="fas fa-user-circle"
          flat
          no-caps
        />
      </q-breadcrumbs-el>
      <q-breadcrumbs-el v-if="is_album_selected">
        <q-btn icon="fas fa-dot-circle" :label="current_album.title" flat no-caps/>
      </q-breadcrumbs-el>
    </q-breadcrumbs>

    <q-list separator>
      <template v-if="is_album_selected">
        <q-item v-for="track in current_album.tracks" :key="track.id">
          <q-item-section side>{{ track.number }}</q-item-section>
          <q-item-label @click.native="select_track(track)" class="library-item-main clickable">
            {{ track.title }}
          </q-item-label>
          <q-item-section side right>
            <library-item-actions
              :item="track"
              @add_item_to_current_export_list="add_track_to_current_export_list"
              @add_item_to_tracklist="add_track_to_tracklist"
            />
          </q-item-section>
        </q-item>
      </template>

      <template v-else-if="is_artist_selected">
        <q-item v-for="album in current_artist.albums" :key="album.id">
          <q-item-section avatar>
            <q-avatar><img :src="album.cover_thumb_url" alt="album cover"></q-avatar>
          </q-item-section>
          <q-item-label @click.native="select_album(album)" class="library-item-main clickable">
            {{ album | album_label }}
          </q-item-label>
          <q-item-section side right>
            <library-item-actions
              :item="album"
              @add_item_to_current_export_list="add_album_to_current_export_list"
              @add_item_to_tracklist="add_album_to_tracklist"
            />
          </q-item-section>
        </q-item>
      </template>

      <template v-else>
        <q-item v-for="artist in artists" :key="artist.id">
          <q-item-section avatar>
            <q-avatar><img :src="artist.image_thumb_url" alt="artist image"></q-avatar>
          </q-item-section>
          <q-item-label @click.native="select_artist(artist)" class="library-item-main clickable">
            {{ artist.name }}
          </q-item-label>
          <q-item-section side right>
            <library-item-actions
              :item="artist"
              @add_item_to_current_export_list="add_artist_to_current_export_list"
              @add_item_to_tracklist="add_artist_to_tracklist"
            />
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-page>
</template>

<script>
import LibraryItemActions from 'components/LibraryItemActions'
import {mapActions, mapState} from 'vuex'
import {Notify} from 'quasar'

export default {
  name: 'LibraryPage',
  components: {LibraryItemActions},

  data () {
    return {
      artists: [],
      current_artist: null,
      current_album: null
    }
  },

  computed: {
    ...mapState({
      tracklists: state => state.tracklists.tracklists,
      export_lists: state => state.export_lists.export_lists,
      current_export_list: state => state.export_lists.current
    }),

    is_artist_selected () {
      return this.current_artist !== null
    },

    is_album_selected () {
      return this.current_album !== null
    }
  },

  methods: {
    ...mapActions(['fetch_artists', 'fetch_albums', 'fetch_tracks', 'fetch_export_lists', 'fetch_tracklists', 'add_tracks_to_export_list', 'add_tracks_to_tracklist']),

    go_home () {
      this.current_artist = null
      this.current_album = null
    },

    select_artist (artist) {
      this.fetch_albums({artist_id: artist.id})
        .then(albums => {
          this.current_artist = artist
          this.current_artist.albums = albums
          this.current_album = null
        })
    },

    select_album (album) {
      this.fetch_tracks({album_id: album.id})
        .then(tracks => {
          this.current_album = album
          this.current_album.tracks = tracks
        })
    },

    select_track (track) {
      console.log(`Track ${track} selected`)
    },

    add_to_current_export_list (params) {
      if (this.current_export_list.id) {
        this.add_tracks_to_export_list(params)
      } else {
        Notify.create({
          message: 'Export List not selected!',
          type: 'warning',
          timeout: 3000
        })
      }
    },

    add_artist_to_current_export_list (artist) { this.add_to_current_export_list({artist_id: artist.id}) },
    add_album_to_current_export_list (album) { this.add_to_current_export_list({album_id: album.id}) },
    add_track_to_current_export_list (track) { this.add_to_current_export_list({track_id: track.id}) },

    add_artist_to_tracklist (artist, tracklist) {
      this.add_tracks_to_tracklist({tracklist_id: tracklist.id, artist_id: artist.id})
    },

    add_album_to_tracklist (album, tracklist) {
      this.add_tracks_to_tracklist({tracklist_id: tracklist.id, album_id: album.id})
    },

    add_track_to_tracklist (track, tracklist) {
      this.add_tracks_to_tracklist({tracklist_id: tracklist.id, track_id: track.id})
    }
  },

  filters: {
    album_label (album) {
      if (album.year) {
        return [album.year, album.title].join(' - ')
      } else {
        return album.title
      }
    }
  },

  created () {
    this.fetch_artists()
      .then(artists => { this.artists = artists })

    this.fetch_tracklists()
    this.fetch_export_lists()
  }
}
</script>

<style>
  .library-item-main {
    line-height: 38px;
  }

  .clickable {
    cursor: pointer;
  }

  .clickable:hover {
    background: rgba(189,189,189,0.5);
  }
</style>
