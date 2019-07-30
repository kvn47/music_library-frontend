<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6">{{ export_list.name }}</div>
      <div class="text-subtitle1">{{ export_list.size }} / {{ export_list.capacity }}</div>
      <div class="text-subtitle2">{{ export_list.destination_path }}</div>
    </q-card-section>

    <q-card-actions align="around">
      <q-btn @click="clear_export_list" label="Clear" icon="fas fa-trash" color="negative" outline/>
      <q-btn @click="perform_export" label="Export" icon="fas fa-upload" color="primary" :loading="is_exporting">
        <span slot="loading">
          <q-spinner/>
          Exporting...
        </span>
      </q-btn>
    </q-card-actions>
    <q-separator/>

    <q-list>
      <q-item v-for="track in export_list.tracks" :key="track.id">
        <q-item-section>
          <q-item-label>{{ track.title }}</q-item-label>
          <q-item-label caption>{{ track.artist_name }}</q-item-label>
        </q-item-section>
        <q-item-section side right>
          <q-btn icon="fas fa-minus" color="negative" flat dense @click="remove_track(track)"/>
          <q-item-label stamp>{{ track.size }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'CurrentExportList',

  data () {
    return {
      is_exporting: false
    }
  },

  computed: mapState({
    export_list: state => state.export_lists.current
  }),

  methods: {
    ...mapActions(['remove_track_from_export_list', 'clear_export_list', 'export_tracks']),

    async perform_export () {
      this.is_exporting = true
      await this.export_tracks()
      this.is_exporting = false
    }
  }
}
</script>

<style>
</style>
