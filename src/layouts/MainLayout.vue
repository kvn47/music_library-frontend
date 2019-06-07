<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn to="/" icon="fas fa-columns" flat/>
        <q-btn :to="{name: 'library'}" icon="fas fa-music" flat/>
        <q-btn :to="{name: 'notes'}" icon="fas fa-sticky-note" flat/>

        <q-btn flat round dense icon="fas fa-ellipsis-v">
          <q-menu auto-close>
            <q-list>
              <q-item :to="{name: 'tracklists'}">
                <q-item-section avatar><q-icon name="fas fa-list-alt"/></q-item-section>
                <q-item-section>Tracklists</q-item-section>
              </q-item>
              <q-item :to="{name: 'export-lists'}">
                <!--<q-item-side icon="fas fa-file-export"/>-->
                <q-item-section avatar><q-icon name="fas fa-clipboard-list"/></q-item-section>
                <q-item-section>Export Lists</q-item-section>
              </q-item>
              <!--<q-item :to="{name: 'artists'}">-->
              <!--<q-item-side icon="fas fa-user-circle"/>-->
              <!--<q-item-main label="Artists"/>-->
              <!--</q-item>-->
              <!--<q-item :to="{name: 'albums'}">-->
              <!--<q-item-side icon="fas fa-compact-disc" />-->
              <!--<q-item-main label="Albums"/>-->
              <!--</q-item>-->

              <q-item :to="{name: 'import'}">
                <q-item-section avatar><q-icon name="fas fa-download"/></q-item-section>
                <q-item-section>Import</q-item-section>
              </q-item>
              <q-separator/>
              <q-item :to="{name: 'settings'}">
                <q-item-section avatar><q-icon name="fas fa-cogs"></q-icon></q-item-section>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-separator/>
              <q-item :to="{name: 'organizer'}">
                <q-item-section avatar><q-icon name="fas fa-align-justify"></q-icon></q-item-section>
                <!--<q-item-side icon="fas fa-broom"/>-->
                <q-item-section>Organizer</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-toolbar-title>
          <span class="text-h6 capitalize">{{ title }}</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="is_drawer_open" side="right" content-class="bg-grey-2" overlay>
      <current-export-list/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
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
  import ExportLists from 'components/ExportLists'
  import CurrentExportList from 'components/CurrentExportList'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'MainLayout',
    components: {ExportLists, CurrentExportList},

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

      title () { return this.$route.name }
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
