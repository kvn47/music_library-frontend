<template>
  <q-page>
    <q-card flat square>
      <div class="row justify-center static">
        <q-img v-if="cover_url" :src="cover_url" style="max-width: 256px;" class=""/>
      </div>
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
        <div class="text-subtitle1">
          <q-btn :to="{name: 'artist', params: {id: artist_id}}" :label="artist_name" flat dense no-caps/>
        </div>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn @click="edit" label="Edit" flat></q-btn>
      </q-card-actions>
      <q-separator/>
      <q-list separator>
        <q-item v-for="track in tracks" :key="track.id" @click.native="select_track(track)" clickable>
          <q-item-section side>{{ track.number }}</q-item-section>
          <q-item-section>
            <q-item-label header class="text-black">{{ track.title }}</q-item-label>
            <q-item-label overline>length: {{ track.length }}, size: {{ track.size }}</q-item-label>
          </q-item-section>
          <q-item-section side right>
            <library-item-actions
              :item="track"
              @add_item_to_current_export_list="add_track_to_current_export_list"
              @add_item_to_tracklist="add_track_to_tracklist"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import LibraryItemActions from 'components/LibraryItemActions'
import {mapActions, mapState} from 'vuex'
import {Notify} from 'quasar'

export default {
  name: 'AlbumPage',
  components: {LibraryItemActions},
  props: ['id'],

  data () {
    return {
      title: null,
      cover_url: null,
      mb_id: null,
      artist_id: null,
      artist_name: null,
      tracks: [],
    }
  },

  created () {
    this.$api.query(`albums/${this.id}`)
      .then(album => {
        this.title = album.title
        this.cover_url = album.cover_url
        this.mb_id = album.mb_id
        this.artist_id = album.artist_id
        this.artist_name = album.artist_name
        this.tracks = album.tracks
      })
  },

  methods: {
    ...mapActions(['add_tracks_to_export_list', 'add_tracks_to_tracklist']),

    edit () {},

    select_track () {},

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

    add_track_to_current_export_list (track) { this.add_to_current_export_list({track_id: track.id}) },

    add_track_to_tracklist (track, tracklist) {
      this.add_tracks_to_tracklist({tracklist_id: tracklist.id, track_id: track.id})
    }
  }
}
</script>

<style>
</style>
