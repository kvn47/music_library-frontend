<template>
  <q-page class="q-pb-xl" padding>
    <q-list class="q-mb-xl">
      <q-expansion-item
        v-for="note in notes"
        :key="note.id"
        group="notes"
        :label="label(note)"
        :caption="caption(note)"
        expand-icon="fas fa-angle-down"
        popup
      >
        <note-card :note="note"/>
      </q-expansion-item>
    </q-list>

    <q-page-sticky :offset="[18, 18]">
      <q-btn
        @click="new_note"
        icon="fas fa-plus"
        color="primary"
        fab
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
  import NoteCard from 'components/NoteCard'
  import NoteForm from 'components/NoteForm'
  import { note_label } from 'lib/note'

  export default {
    name: 'NotesPage',
    props: ['kind'],
    components: { NoteCard },

    created () {
      this.fetch_notes()
    },

    watch: {
      '$route': 'fetch_notes'
    },

    computed: {
      notes () {
        return this.$store.state.notes.notes
      }
    },

    methods: {
      fetch_notes () {
        this.$store.dispatch('fetch_notes', {kind: this.kind})
      },

      new_note () {
        this.$q.dialog({
          component: NoteForm,
          root: this.$root,
        }).onOk(() => {
          console.log('New note OK')
        })
      },

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
