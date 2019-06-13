<template>
  <q-page padding>
    <q-list>
      <q-expansion-item
        v-for="note in notes"
        :key="note.id"
        group="notes"
        :label="label(notes)"
        :caption="caption(note)"
        expand-icon="fas fa-angle-down"
        popup
      >
        <note-card :note="note"/>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script>
  import { mapActions } from 'vuex'
  import { note_label } from 'lib/note'

  export default {
    name: 'NotesPage',
    props: ['kind'],

    data () {
      return {
        notes: []
      }
    },

    created () {
      this.fetch_notes({kind: this.kind})
        .then(notes => this.notes = notes)
    },

    methods: {
      ...mapActions(['fetch_notes']),

      label (note) { return note_label(note) },

      caption (note) {
        if (note.kind === 'await') {
          return note.release_date.toLocaleDateString('ru-RU')
        } else {
          return ''
        }
      }
    }
  }
</script>

<style>
</style>
