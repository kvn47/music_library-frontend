<template>
  <q-card flat>
    <q-card-section v-if="note.details">
      {{ note.details }}
    </q-card-section>
    <q-separator/>
    <q-card-actions align="around">
      <q-btn-dropdown icon="fas fa-search" color="info" auto-close flat>
        <q-list>
          <template v-for="source in Object.keys(search_sources)">
            <q-item @click="search_album(source)" clickable :key="source">
              <q-item-section>
                <q-item-label>{{ source }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-btn-dropdown>
      <q-btn @click="copy_label()" icon="far fa-copy" color="secondary" flat/>
      <q-btn @click="edit_note(note)" icon="fas fa-edit" color="secondary" flat/>
      <q-btn @click="advance_note(note)" :icon="next_kind.icon" :color="next_kind.color" flat/>
      <q-btn @click="delete_note(note)" icon="fas fa-trash" color="negative" flat/>
    </q-card-actions>
  </q-card>
</template>

<script>
import NoteForm from 'components/NoteForm'
import { mapGetters, mapActions } from 'vuex'
import { note_label } from 'lib/note'

export default {
  name: 'NoteCard',

  props: {
    note: {
      type: Object,
      default () { return {} }
    }
  },

  data () {
    return {
      search_sources: {
        'Deezer': 'https://www.deezer.com/search/',
        'Youtube Music': 'https://music.youtube.com/search?q=',
        'Youtube': 'https://www.youtube.com/results?search_query=',
        'Google': 'https://www.google.com/search?q=',
        'Google Play': 'https://play.google.com/store/search?c=music&q=',
        'RuTracker': 'https://rutracker.org/forum/tracker.php?nm=',
        'RuTor': 'http://rutor.info/search//0/2/000/0/',
        'Yandex': 'https://yandex.ru/search/?text='
      }
    }
  },

  computed: {
    next_kind () {
      return this.$store.getters.next_kind_for(this.note.kind)
    }
  },

  methods: {
    ...mapActions(['update_note', 'advance_note', 'delete_note']),

    copy_label () {
      navigator.clipboard.writeText(note_label(this.note))
        .then(() => {
          this.$q.notify({
            message: 'Copied',
            color: 'positive',
            timeout: 1000
          })
        })
    },

    search_album (source) {
      const query = [this.note.artist, this.note.album].join(' ')
      const uri = encodeURI(this.search_sources[source] + query)
      window.open(uri)
    },

    edit_note () {
      this.$q.dialog({
        component: NoteForm,
        root: this.$root,
        note: Object.assign({}, this.note)
      })
    }
  }
}
</script>

<style>
</style>
