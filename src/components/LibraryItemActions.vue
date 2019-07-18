<template>
<span>
  <q-btn @click.stop.prevent="showing_menu = !showing_menu" icon="fas fa-ellipsis-v" flat/>
  <span>
    <q-menu v-model="showing_menu">
      <q-list separator>
        <q-item @click.native="show_tracklists" clickable>Add to tracklist ></q-item>
        <q-item @click.native="add_item_to_current_export_list" clickable v-close-popup>Add to current export list</q-item>
        <q-item @click.native="show_export_lists" clickable v-close-popup>Add to export list ></q-item>
      </q-list>
    </q-menu>
    <q-menu v-model="choosing_tracklist">
      <q-list separator>
        <q-item
          v-for="tracklist in tracklists"
          :key="tracklist.id"
          @click.native="add_item_to_tracklist(tracklist)"
          clickable
          v-close-popup
        >
          <q-item-section no-wrap>{{ tracklist.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <q-menu v-model="choosing_export_list">
      <q-list separator>
        <q-item
          v-for="export_list in export_lists"
          :key="export_list.id"
          @click.native="add_item_to_export_list(export_list)"
          clickable
          v-close-popup
        >
          <q-item-section no-wrap>{{ export_list.name }}</q-item-section>
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
      showing_menu: false,
      choosing_tracklist: false,
      choosing_export_list: false
    }
  },

  computed: {
    ...mapState({
      tracklists: state => state.tracklists.tracklists,
      export_lists: state => state.export_lists.export_lists
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

    add_item_to_export_list (export_list) {
      this.$emit('add_item_to_export_list', this.item, export_list)
      this.choosing_export_list = false
    },

    show_tracklists () {
      this.choosing_tracklist = true
      this.showing_menu = false
    },

    show_export_lists () {
      this.choosing_export_list = true
      this.showing_menu = false
    }
  }
}
</script>

<style scoped>

</style>
