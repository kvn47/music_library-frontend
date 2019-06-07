<template>
  <q-list>
    <template v-for="note in notes">
      <q-expansion-item
        :key="note.id"
        group="notes"
        :label="label(note)"
        :caption="caption(note)"
        expand-icon="fas fa-angle-down"
        popup
      >
        <note-card :note="note"/>
      </q-expansion-item>
    </template>
  </q-list>
</template>

<script>
import NoteCard from 'components/NoteCard'
import { note_label } from 'lib/note'

export default {
  name: 'NotesList',
  components: { NoteCard },

  props: {
    notes: { type: Array }
  },

  data () {
    return {}
  },

  methods: {
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
