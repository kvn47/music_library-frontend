<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-dialog ref="note_form" @hide="cancel">
    <q-card class="q-dialog-plugin">
      <form @submit.prevent="submit_form">
        <q-card-section>
          <q-btn-toggle v-model="note.kind" :options="kind_options" flat/>

          <q-input
            v-model="note.artist"
            label="Artist"
            type="text"
            autofocus
            clearable
          />

          <q-input
            v-model="note.album"
            label="Album"
            type="text"
            clearable
          />

          <q-input
            v-if="is_download_url_visible"
            v-model="note.download_url"
            label="Download URL"
            type="url"
            clearable
          />

          <q-input
            v-if="is_download_path_visible"
            v-model="note.download_path"
            label="Download path"
            type="text"
            clearable
          />

          <q-field
            v-if="is_release_date_visible"
            label="Release date"
            stack-label
          >
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ release_date_preview }}</div>
            </template>

            <template v-slot:append>
              <q-icon name="fas fa-calendar" class="cursor-pointer">
                <q-popup-proxy ref="date_picker_popup">
                  <q-date
                    :value="release_date_for_picker"
                    @input="set_release_date"
                    :first-day-of-week="1"
                    label="Release date"
                    today-btn
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-field>

          <q-input
            v-model="note.details"
            label="Details"
            type="textarea"
            rows="3"
            clearable
          />
        </q-card-section>

        <q-separator/>

        <q-card-actions align="around">
          <q-btn @click="cancel" label="Cancel" class="col-5" />
          <q-btn type="submit" label="Save" color="primary" :loading="submitting" class="col-5">
            <template v-slot:loading>
              <q-spinner-bars/>
            </template>
          </q-btn>
        </q-card-actions>
      </form>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { date } from 'quasar'
// import API from 'api/artists'

export default {
  name: 'NoteForm',

  props: {
    note: {
      type: Object,
      default () { return {kind: 'listen', release_date: new Date()} }
    }
  },

  data () {
    return {
      submitting: false
    }
  },

  computed: {
    ...mapState(['note_kinds']),

    kind_options () {
      if (this.note_kinds) {
        return Object.entries(this.note_kinds).map((kind) => { return { icon: kind[1].icon, value: kind[0] } })
      } else {
        return []
      }
    },

    is_download_url_visible () {
      return this.note.kind === 'download'
    },

    is_download_path_visible () {
      return this.note.kind === 'download'
    },

    is_release_date_visible () {
      return this.note.kind === 'await'
    },

    release_date_preview () {
      if (this.note.release_date === undefined) {
        return null
      } else {
        return this.note.release_date.toLocaleDateString('ru-RU')
      }
    },

    release_date_for_picker () {
      return date.formatDate(this.note.release_date, 'YYYY/MM/DD')
    }
  },

  methods: {
    ...mapActions(['create_note', 'update_note']),

    show () {
      this.$refs.note_form.show()
    },

    hide () {
      this.$refs.note_form.hide()
    },

    // search_artist (terms, done) {
    //   API.query({ search: terms })
    //     .then(artists => {
    //       const result = artists.map(artist => {
    //         return { label: artist.name, value: artist.name }
    //       })
    //
    //       done(result)
    //     })
    // },

    set_release_date (value) {
      this.note.release_date = new Date(value)
      this.$refs.date_picker_popup.hide()
    },

    submit_form () {
      if (this.note.id === undefined) {
        this.create_note(this.note)
      } else {
        this.update_note(this.note)
        // this.update_note(Object.assign({id: this.note.id}, this.note))
      }
      this.$emit('ok')
      this.hide()
    },

    cancel () {
      this.hide()
    }
  }
}
</script>

<style>
</style>
