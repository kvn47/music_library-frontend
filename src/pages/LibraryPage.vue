<template>
  <q-page padding>
    <q-list separator>
      <q-item v-for="artist in artists" :key="artist.id" :to="{name: 'artist', params: {id: artist.id}}" clickable>
        <q-item-section avatar>
          <q-img :src="artist.image_thumb_url || 'statics/images/default_artist_thumb.png'" :alt="artist.name[0]">
            <div v-if="artist.image_thumb_url === null" class="absolute-center text-center text-h4">{{ artist.name[0] }}</div>
          </q-img>
<!--          <q-avatar square><img :src="artist.image_thumb_url" :alt="artist.name[0]"></q-avatar>-->
        </q-item-section>
        <q-item-section>
          <q-item-label header class="text-black">{{ artist.name }}</q-item-label>
        </q-item-section>
        <q-item-section side right>
          <library-item-actions
            :item="artist"
            @add_item_to_current_export_list="add_artist_to_current_export_list(artist)"
            @add_item_to_tracklist="add_artist_to_tracklist(artist)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import LibraryItemActions from 'components/LibraryItemActions'
import {mapActions} from 'vuex'
import {Notify} from 'quasar'

export default {
  name: 'LibraryPage',
  components: {LibraryItemActions},
  props: ['id'],

  data () {
    return {
      artists: []
    }
  },

  created () {
    this.$api.query('artists')
      .then(artists => { this.artists = artists })
  },

  methods: {
    ...mapActions(['add_tracks_to_export_list', 'add_tracks_to_tracklist']),

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

    add_artist_to_tracklist (artist, tracklist) {
      this.add_tracks_to_tracklist({tracklist_id: tracklist.id, artist_id: artist.id})
    },
  }
}
</script>

<style>
</style>
