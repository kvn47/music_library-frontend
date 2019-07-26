<template>
  <q-layout view="hHh lpr fFf">
    <q-header
      v-if="show_header"
      elevated
      reveal
    >
      <q-toolbar>
        <q-toolbar-title>
          <home-button/>
          <span class="text-h6 capitalize">{{ page_title }}</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import HomeButton from 'components/HomeButton'

  export default {
    components: {HomeButton},

    data () {
      return {
      }
    },

    computed: {
      page_title () {
        return {
          'settings': 'Settings',
          'import': 'Import',
          'export_lists': 'Export Lists',
          'tracklists': 'Tracklists',
          'organizer': 'Organizer'
        }[this.$route.name]
      },

      show_header () {
        return this.$route.name !== 'home'
      }
    }
  }
</script>
