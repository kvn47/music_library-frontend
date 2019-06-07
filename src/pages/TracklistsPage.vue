<template>
<q-page padding>
  <q-list>
    <q-item v-for="tracklist in tracklists" :key="tracklist.id" :to="{name: 'tracklist', params: {id: tracklist.id}}">
    <!--<q-item v-for="tracklist in tracklists" :key="tracklist.id">-->
      <!--<q-item-main :label="tracklist.name" @click.native="edit_tracklist(tracklist)"/>-->
      <q-item-label>{{ tracklist.name }}</q-item-label>
      <q-item-section side right>
        <q-btn flat round dense icon="fas fa-ellipsis-v">
          <q-popover>
            <q-list>
              <q-item v-close-popup>
                <q-item-label>
                  <div @click="edit_tracklist(tracklist)">Edit</div>
                </q-item-label>
              </q-item>
              <q-separator/>
              <q-item v-close-popup>
                <q-item-label>
                  <div @click="delete_tracklist(tracklist)">Delete</div>
                </q-item-label>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-item-section>
    </q-item>
  </q-list>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="primary" icon="fas fa-plus" @click="add_tracklist"/>
  </q-page-sticky>

  <q-dialog v-model="is_modal_visible" maximized>
    <q-layout container>
      <q-toolbar slot="header">
        <q-btn flat round dense icon="fas fa-times" @click="close_form"/>
        <q-toolbar-title>New Tracklist</q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <tracklist-form :tracklist="active_tracklist" @submit_form="save_tracklist"/>
      </div>
    </q-layout>
  </q-dialog>
</q-page>
</template>

<script>
import TracklistForm from 'components/TracklistForm'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'TracklistsPage',

  data () {
    return {
      active_tracklist: {},
      is_modal_visible: false
    }
  },

  beforeMount () {
    this.fetch_tracklists()
  },

  computed: mapState({
    tracklists: state => state.tracklists.tracklists
  }),

  methods: {
    ...mapActions(['fetch_tracklists', 'create_tracklist', 'update_tracklist', 'delete_tracklist']),

    view_tracklist (tracklist) {
      this.active_tracklist = Object.assign({}, tracklist)
    },

    add_tracklist () {
      this.active_tracklist = {}
      this.show_form()
    },

    edit_tracklist (tracklist) {
      this.active_tracklist = Object.assign({}, tracklist)
      this.show_form()
    },

    save_tracklist (tracklist) {
      if (tracklist.id === undefined) {
        this.create_tracklist(tracklist)
      } else {
        this.update_tracklist(tracklist)
      }
      this.active_tracklist = {}
      this.close_form()
    },

    show_form () { this.is_modal_visible = true },

    close_form () { this.is_modal_visible = false }
  },

  components: {TracklistForm}
}
</script>

<style>
</style>
