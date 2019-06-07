<template>
  <div v-if="false">
    <q-card flat>

      <q-card-section>
        <q-btn flat dense icon="fas fa-chevron-left" @click="close_export_list"/>
        <span>{{ current_export_list.name }}</span>
        <small class="float-right">{{ current_export_list.size }} / {{ current_export_list.capacity }}</small>
        <span slot="subtitle">{{ current_export_list.destination_path }}</span>
      </q-card-section>

      <q-card-section>
        <q-linear-progress :percentage="current_export_list.fullness"/>
      </q-card-section>

      <!--<q-card-separator/>-->
      <q-card-actions align="end">
        <q-btn label="Clear" color="negative" flat @click="clear_export_list"/>
        <q-btn label="Export" color="primary" @click="export_tracks"/>
      </q-card-actions>

      <q-separator/>
      <q-list>
        <q-item v-for="track in current_export_list.tracks" :key="track.id">
          <q-item-label>
            <q-item-label header>{{ track.title }}</q-item-label>
            <q-item-label caption>{{ track.artist }}</q-item-label>
          </q-item-label>
          <q-item-section side right>
            <q-btn icon="fas fa-minus" color="negative" flat dense round @click="remove_track(track)"/>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>

  <q-list v-else inset-delimiter>
    <q-item v-for="export_list in export_lists" :key="export_list.id" @click.native="select_export_list(export_list)">
      <q-item-label>{{ export_list.name }}</q-item-label>
    </q-item>
  </q-list>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  name: 'ExportLists',

  data () {
    return {}
  },

  computed: mapState({
    export_lists: state => state.export_lists.export_lists,
    current_export_list: state => state.export_lists.current
  }),

  methods: {
    ...mapActions(['fetch_export_list', 'remove_track_from_export_list', 'clear_export_list', 'export_tracks']),
    ...mapMutations(['set_current_export_list', 'reset_current_export_list']),

    select_export_list (export_list) {
      this.fetch_export_list(export_list.id)
        .then(current_export_list => this.set_current_export_list(current_export_list))
    },

    close_export_list () {
      this.reset_current_export_list()
    },

    remove_track (track) {
      this.remove_track_from_export_list(track.id)
    }
  }
}
</script>

<style>
</style>
