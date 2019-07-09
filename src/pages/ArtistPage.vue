<template>
  <q-page>
    <q-card flat square>
      <div class="row justify-center">
        <q-img v-if="image_url" :src="image_url" style="max-width: 256px;"/>
      </div>
      <q-card-section>
        <div class="text-h6">{{ name }}</div>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn @click="edit" label="Edit" flat/>
      </q-card-actions>
      <q-separator/>
      <q-list separator>
        <q-item v-for="album in albums" :key="album.id" :to="{name: 'album', params: {id: album.id}}" clickable>
          <q-item-section avatar>
            <q-img :src="album.cover_thumb_url || 'statics/images/default_album_thumb.png'" alt="cover"/>
<!--            <q-avatar square><img :src="album.cover_thumb_url" alt="album cover"></q-avatar>-->
          </q-item-section>
          <q-item-section>
            <q-item-label header class="text-black">{{ album | album_label }}</q-item-label>
          </q-item-section>
          <q-item-section side right>
            <library-item-actions
              :item="album"
              @add_item_to_current_export_list="add_album_to_current_export_list"
              @add_item_to_tracklist="add_album_to_tracklist"
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
  name: 'ArtistPage',
  components: {LibraryItemActions},
  props: ['id'],

  data () {
    return {
      name: null,
      image_url: null,
      mb_id: null,
      albums: []
    }
  },

  created () {
    this.$api.query(`artists/${this.id}`)
      .then(artist => {
        this.name = artist.name
        this.image_url = artist.image_url
        this.mb_id = artist.mb_id
        this.albums = artist.albums
      })
  },

  methods: {
    ...mapActions(['add_tracks_to_export_list', 'add_tracks_to_tracklist']),

    edit () {},

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

    add_album_to_current_export_list (album) { this.add_to_current_export_list({album_id: album.id}) },

    add_album_to_tracklist (album, tracklist) {
      this.add_tracks_to_tracklist({tracklist_id: tracklist.id, album_id: album.id})
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
  }
}
</script>

<style>
</style>
