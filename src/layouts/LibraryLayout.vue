<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated reveal>
      <q-toolbar>
        <home-button/>
        <q-btn :to="{name: 'library'}" size="lg" flat no-caps dense>Library</q-btn>
        <q-space/>
        <q-btn flat round dense icon="search"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="is_drawer_open" side="right" content-class="bg-grey-2" overlay>
      <current-export-list/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated reveal>
      <q-toolbar>
        <q-btn flat icon="fas fa-caret-up">
          <q-menu>
            <q-list>
              <q-item @click.native="unset_export_list" v-close-popup>-</q-item>
              <q-item
                v-for="export_list in export_lists"
                :key="export_list.id"
                @click.native="select_export_list(export_list)"
                v-close-popup
              >
                <q-item-label header>{{ export_list.name }}</q-item-label>
                <q-item-label caption>{{ `${export_list.size} / ${export_list.capacity}` }}</q-item-label>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <template v-if="current_export_list.name">
          <q-toolbar-title>
            <span>{{ current_export_list.name }}</span>
            <q-linear-progress :percentage="current_export_list.fullness"/>
          </q-toolbar-title>
          <q-btn icon="fas fa-bars" flat @click="toggle_export_list"/>
        </template>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
  import HomeButton from 'components/HomeButton'
  import ExportLists from 'components/ExportLists'
  import CurrentExportList from 'components/CurrentExportList'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'LibraryLayout',
    components: {HomeButton, ExportLists, CurrentExportList},

    data () {
      return {
        is_drawer_open: this.$q.platform.is.desktop
      }
    },

    computed: {
      ...mapState({
        export_lists: state => state.export_lists.export_lists,
        current_export_list: state => state.export_lists.current
      }),
    },

    methods: {
      ...mapActions(['fetch_export_list']),
      ...mapMutations(['set_current_export_list', 'reset_current_export_list']),

      select_export_list (export_list) {
        this.fetch_export_list(export_list.id)
          .then(current_export_list => this.set_current_export_list(current_export_list))
      },

      toggle_export_list () { this.is_drawer_open = !this.is_drawer_open },

      unset_export_list () {
        this.reset_current_export_list()
        this.is_drawer_open = false
      }
    }
  }
</script>

<style>
</style>
