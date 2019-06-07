<template>
  <form @submit.prevent="submit_form">
    <q-card>
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
        <q-btn label="Cancel" v-close-popup class="col-5" />
        <q-btn @click="submit_form" label="Save" type="submit" color="primary" :loading="submitting" class="col-5">
          <template v-slot:loading>
            <q-spinner-bars/>
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { date } from 'quasar'
// import API from 'api/artists'

export default {
  name: 'NoteForm',

  props: {
    note: {
      type: Object,
      default () { return {} }
    }
  },

  data () {
    return {
      submitting: false
    }
  },

  computed: {
    ...mapGetters(['note_kinds_array']),

    kind_options () {
      if (this.note_kinds_array) {
        return this.note_kinds_array.map(kind => { return { label: kind.title, value: kind.name } })
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
      return this.note.release_date.toLocaleDateString('ru-RU')
    },

    release_date_for_picker () {
      return date.formatDate(this.note.release_date, 'YYYY/MM/DD')
    }
  },

  methods: {
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
      this.$emit('submit-form', this.note)
    }
  }
}
</script>

<style>
</style>
