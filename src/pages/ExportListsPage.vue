<template>
  <q-page padding>
    <q-list>
      <q-item
        v-for="export_list in export_lists"
        :key="export_list.id"
        :to="{name: 'export_list', params: {id: export_list.id}}"
        clickable
      >
        <q-item-section>
          <q-item-label>{{ export_list.name }}</q-item-label>
        </q-item-section>
        <q-item-section side right>
          <q-btn icon="fas fa-ellipsis-v" flat round dense>
            <q-menu>
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-label @click.native="edit_export_list(export_list)">Edit</q-item-label>
                </q-item>
                <q-separator/>
                <q-item v-close-popup>
                  <q-item-label @click.native="delete_export_list(export_list)">Delete</q-item-label>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="fas fa-plus" @click="add_export_list"/>
    </q-page-sticky>

    <q-dialog v-model="is_modal_visible" maximized>
      <q-layout container>
        <q-toolbar slot="header">
          <q-btn flat round dense icon="fas fa-times" @click="close_form"/>
          <q-toolbar-title>New Export list</q-toolbar-title>
        </q-toolbar>
        <div class="layout-padding">
          <export-list-form :export_list="active_export_list" @submit_form="save_export_list"/>
        </div>
      </q-layout>
    </q-dialog>
  </q-page>
</template>

<script>
import ExportListForm from 'components/ExportListForm'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'ExportListsPage',
  components: {ExportListForm},

  data () {
    return {
      active_export_list: {},
      is_modal_visible: false
    }
  },

  computed: mapState({
    export_lists: state => state.export_lists.export_lists
  }),

  methods: {
    ...mapActions(['fetch_export_lists', 'create_export_list', 'update_export_list', 'delete_export_list']),

    add_export_list () {
      this.active_export_list = {}
      this.show_form()
    },

    edit_export_list (export_list) {
      this.active_export_list = Object.assign({}, export_list)
      this.show_form()
    },

    save_export_list (export_list) {
      if (export_list.id === undefined) {
        this.create_export_list(export_list)
      } else {
        this.update_export_list(export_list)
      }
      this.active_export_list = {}
      this.close_form()
    },

    show_form () { this.is_modal_visible = true },

    close_form () { this.is_modal_visible = false }
  },

  beforeMount () {
    this.fetch_export_lists()
  }
}
</script>

<style>
</style>
