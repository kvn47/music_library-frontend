<template>
<span>
  <q-btn flat round dense @click="showing_menu = !showing_menu" icon="fas fa-ellipsis-v"/>
  <span>
    <q-menu v-model="showing_menu">
      <q-list>
        <q-item @click.native="show_tracklists">Move to Tracklist...</q-item>
        <q-item v-close-popup @click.native="add_item_to_current_export_list">Export</q-item>
      </q-list>
    </q-menu>
    <q-menu v-model="choosing_tracklist">
      <q-list>
        <q-item
          v-for="tracklist in tracklists"
          :key="tracklist.id"
          @click.native="add_item_to_tracklist(tracklist)"
          v-close-popup
        >
          {{ tracklist.name }}
        </q-item>
      </q-list>
    </q-menu>
  </span>
</span>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'LibraryItemActions',

  props: ['item'],

  data () {
    return {
      choosing_tracklist: false,
      showing_menu: false
    }
  },

  computed: {
    ...mapState({
      tracklists: state => state.tracklists.tracklists
    })
  },

  methods: {
    add_item_to_current_export_list () {
      this.$emit('add_item_to_current_export_list', this.item)
    },

    add_item_to_tracklist (tracklist) {
      this.$emit('add_item_to_tracklist', this.item, tracklist)
      this.choosing_tracklist = false
    },

    show_tracklists () {
      this.choosing_tracklist = true
      this.showing_menu = false
    }
  }
}
</script>

<style scoped>

</style>
