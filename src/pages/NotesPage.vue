<template>
  <q-page>
    <q-input
      v-model="search"
      debounce="500"
      type="search"
      placeholder="Search"
      class="q-mx-lg q-mt-md"
      clearable
      clear-icon="fas fa-times"
      rounded
      standout
      dense
    />

    <template v-if="is_searching">
      <notes-list :notes="found_notes"/>
    </template>

    <template v-else>
      <q-tabs
        v-model="active_tab"
        align="justify"
        :active-color="active_color"
        indicator-color="primary"
        narrow-indicator
        shrink
      >
        <template v-for="kind in note_kinds_array">
          <q-tab
            :name="kind.name"
            :key="kind.name"
            :icon="kind.icon"
            :color="kind.color"
          />
        </template>
      </q-tabs>

      <q-tab-panels v-model="active_tab" animated>
        <template v-for="kind in note_kinds_array">
          <q-tab-panel :name="kind.name" :key="kind.name">
            <notes-list :notes="notes_of_kind(kind.name)" @edit-note="edit_note"/>
          </q-tab-panel>
        </template>
      </q-tab-panels>
    </template>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="fas fa-plus"
        active-icon="fas fa-times"
        color="positive"
        direction="up"
      >
        <template v-for="(kind, kind_name) in note_kinds">
          <q-fab-action @click="add_note(kind_name)" :icon="kind.icon" :color="kind.color" :key="kind_name"/>
        </template>
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="is_modal_visible" style="width: 700px; max-width: 80vw;" persistent>
      <q-card>
        <q-toolbar :class="`bg-${form_color} text-white`">
          <q-btn @click="close_form" flat round dense icon="fas fa-times"/>
          <q-toolbar-title>{{ form_title }}</q-toolbar-title>
        </q-toolbar>
        <div class="layout-padding">
          <note-form :note="active_note" @submit-form="save_note"/>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  import NotesList from 'components/NotesList'
  import NoteForm from 'components/NoteForm'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'NotesPage',
    components: { NotesList, NoteForm },

    data () {
      return {
        active_tab: null,
        active_note: {},
        is_modal_visible: false,
        search: null
      }
    },

    provide () {
      return {
        edit_note: this.edit_note
      }
    },

    created () {
      this.fetch_notes()
      this.active_tab = this.note_kinds_array[0].name
    },

    computed: {
      ...mapGetters(['notes_of_kind', 'search_notes', 'note_kinds', 'note_kinds_array']),

      active_color () {
        return this.note_kinds[this.active_tab].color
      },

      is_searching () {
        return this.search !== null
      },

      found_notes () {
        if (this.is_searching) {
          return this.search_notes(this.search)
        } else {
          return []
        }
      },

      form_title () {
        let title = this.active_note.kind
        if (!title) return ''
        title = title.toString()
        return title.charAt(0).toUpperCase() + title.slice(1)
      },

      form_color () {
        const kind = this.active_note.kind
        if (!kind) {
          return 'primary'
        } else {
          return this.note_kinds[kind].color
        }
      }
    },

    methods: {
      ...mapActions(['fetch_notes', 'create_note', 'update_note']),

      add_note (kind) {
        this.active_note = { kind: kind, artist: '', album: '' }
        if (kind === 'await') { this.active_note.release_date = new Date() }
        this.show_form()
      },

      edit_note (note) {
        this.active_note = Object.assign({}, note)
        this.show_form()
      },

      save_note (note) {
        if (note.id === undefined) {
          this.create_note(note)
        } else {
          this.update_note(note)
        }
        this.active_note = {}
        this.close_form()
      },

      show_form () { this.is_modal_visible = true },

      close_form () { this.is_modal_visible = false }
    }
  }
</script>

<style>
  .q-layout-page {
    padding-bottom: 4rem;
  }
</style>
