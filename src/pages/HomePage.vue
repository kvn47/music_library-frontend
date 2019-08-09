<template>
  <q-page class="flex flex-center">
    <div class="row full-width bg-blue-grey-2" style="height: 100vh">
      <div class="col-6 section">
        <q-btn
          :to="{name: 'notes'}"
          icon="fas fa-sticky-note"
          label="Notes"
          color="primary"
          size="xl"
          class="fit"
          flat
          :stack="is_vertical"
        />
      </div>
      <div class="col-6 section">
        <q-btn
          @click="new_note"
          icon="fas fa-plus"
          label="New Note"
          color="primary"
          size="xl"
          class="fit"
          flat
          :stack="is_vertical"
        />
      </div>
      <div class="col-6 section" v-for="button in buttons" :key="button['route']">
        <q-btn
          :to="{name: button['route']}"
          :label="button['label']"
          :icon="button['icon']"
          color="primary"
          size="xl"
          class="fit"
          flat
          :stack="is_vertical"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import NoteForm from 'components/NoteForm'

export default {
  name: 'HomePage',

  data () {
    return {
      buttons: [
        {route: 'library', label: 'Library', icon: 'fas fa-music'},
        // {route: 'tracklists', label: 'Tracklists', icon: 'fas fa-list-alt'},
        {route: 'import', label: 'Import', icon: 'fas fa-download'},
        {route: 'export_lists', label: 'Export Lists', icon: 'fas fa-file-export'},
        {route: 'organizer', label: 'Organizer', icon: 'fas fa-compact-disc'},
        {route: 'settings', label: 'Settings', icon: 'fas fa-cogs'},
      ]
    }
  },

  computed: {
    is_vertical () {
      return this.$q.screen.width < this.$q.screen.height
    }
  },

  methods: {
    new_note () {
      this.$q.dialog({
        component: NoteForm,
        root: this.$root
      }).onOk(() => {
        console.log('OK')
      })
    }
  }
}
</script>

<style>
  .section {
    border: thin outset;
  }
</style>
