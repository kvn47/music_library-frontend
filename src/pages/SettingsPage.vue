<template>
  <q-page padding>
    <dl>
      <dt>Library path</dt>
      <dd>{{ get_library_path }}</dd>
    </dl>

    <q-btn color="primary" :loading="scanning_library" @click="rescan_library">
      Rescan Library
      <span slot="loading">
        <q-spinner-pie class="on-left"/>
        Scanning Library...
      </span>
    </q-btn>
  </q-page>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'SettingsPage',

  data () {
    return {
      scanning_library: false
    }
  },

  computed: mapGetters(['get_library_path']),

  methods: {
    rescan_library () {
      this.scanning_library = true
      this.$store.dispatch('rescan_library').then(() => {
        this.scanning_library = false
      })
    }
  }
}
</script>

<style>
</style>
