<template>
  <q-page padding>
    <q-list>
      <q-item-label header>
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Tracklists" :to="{name: 'tracklists'}"/>
          <q-breadcrumbs-el :label="name" :to="{name: 'tracklists'}"/>
        </q-breadcrumbs>
      </q-item-label>

      <q-item v-for="track in tracks" :key="track.id">
        <q-item-label header>{{ track.title }}</q-item-label>
        <q-item-label caption>{{ track.artist_name }}</q-item-label>
        <q-item-section side right>
          <q-btn icon="fas fa-minus" color="negative" flat dense round @click="remove_track(track)"></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'TracklistPage',
  props: ['id'],

  data () {
    return {
      name: null,
      tracks: []
    }
  },

  beforeMount () {
    this.fetch_tracklist(this.id)
      .then(tracklist => {
        this.name = tracklist.name
        this.tracks = tracklist.tracks
      })
  },

  methods: {
    ...mapActions(['fetch_tracklist', 'remove_track_from_tracklist', 'clear_tracklist']),

    remove_track (track) {
      this.remove_track_from_tracklist({tracklist_id: this.id, track_id: track.id})
        .then(tracklist => {
          this.tracks = tracklist.tracks
        })
    },

    remove_all_tracks () {
      this.clear_tracklist(this.id)
        .then(() => {
          this.tracks = []
        })
    }
  }
}
</script>

<style>
</style>
