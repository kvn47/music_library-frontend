<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page padding>
    <dl>
      <dt>Library path</dt>
      <dd>{{ get_library_path }}</dd>
    </dl>

    <q-btn @click="scan_library" :loading="scanning_library" color="primary">
      Scan Library
      <template v-slot:loading>
        <q-spinner-pie class="on-left"/>
        Scanning Library...
      </template>
    </q-btn>

    <q-btn-group class="q-ml-xl" outline>
      <q-btn @click="purge_library" :loading="purging_library" color="negative" outline>
        Purge Library
        <template v-slot:loading>
          <q-spinner-pie class="on-left"/>
          Purging Library...
        </template>
      </q-btn>

      <q-btn @click="purge_library({with_files: true})" :loading="purging_library" color="negative" outline>
        With files
        <template v-slot:loading>
          <q-spinner-pie class="on-left"/>
          Purging Library...
        </template>
      </q-btn>
    </q-btn-group>
  </q-page>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'SettingsPage',

  data () {
    return {
      scanning_library: false,
      purging_library: false
    }
  },

  computed: mapGetters(['get_library_path']),

  methods: {
    scan_library () {
      this.scanning_library = true

      this.$axios.post('library/scan')
        .then((result) => {
          this.$store.commit('success_message', result.message)
        })
        .finally(() => {
          this.scanning_library = false
        })
    },

    purge_library (options = {}) {
      this.purging_library = true

      this.$axios.delete('library', {params: options})
        .finally(() => {
          this.purging_library = false
        })
    }
  }
}
</script>

<style>
</style>
