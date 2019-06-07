<template>
  <q-card flat>
    <q-card-section>
      <q-card-section>
        {{ export_list.name }}
        <span slot="subtitle">{{ export_list.destination_path }}</span>
        <span slot="right">{{ export_list.capacity }}</span>
      </q-card-section>
      <dl class="horizontal">
        <dt>Size</dt>
        <dd>{{ export_list.size }}</dd>
      </dl>
    </q-card-section>

    <q-card-actions align="around">
      <q-btn icon="fas fa-trash" label="Clear" color="negative" outline @click="clear_export_list"/>
      <q-btn icon="fas fa-upload" label="Export" color="primary" @click="perform_export" :loading="is_exporting">
        <span slot="loading">
          <q-spinner/>
          Exporting...
        </span>
      </q-btn>
    </q-card-actions>
    <q-separator/>

    <q-list>
      <q-item v-for="track in export_list.tracks" :key="track.id">
        <q-item-label>
          <q-item-label header>{{ track.title }}</q-item-label>
          <q-item-label caption>{{ track.artist_name }}</q-item-label>
        </q-item-label>
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
