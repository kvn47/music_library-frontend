<template>
  <q-page class="flex flex-center" padding>
    <q-btn-group
      outline
      class="full-width"
    >
      <q-btn
        :to="{name: 'notes'}"
        icon="fas fa-sticky-note"
        label="Notes"
        color="primary"
        size="xl"
        outline
        class="full-width"
      />

      <q-btn
        @click="new_note"
        icon="fas fa-plus"
        color="primary"
        size="xl"
        outline
        class="full-width"
      />
    </q-btn-group>

    <q-btn
      v-for="button in buttons"
      :key="button['route']"
      :to="{name: button['route']}"
      :label="button['label']"
      :icon="button['icon']"
      color="primary"
      size="xl"
      class="full-width"
      no-caps
      outline
    />
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
</style>
