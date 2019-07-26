<template>
  <q-page padding>
    <q-stepper
      v-model="step"
      ref="stepper"
    >
      <q-step
        :name="1"
        :done="step > 1"
        title="Preparation"
      >
        <q-input
          v-model="source"
          label="Source path"
          :error="source_error"
          clearable
        />
        <q-tree
          :nodes="source_nodes"
          node-key="full_path"
          @lazy-load="on_sources_load"
          :selected.sync="source"
        />

        <q-stepper-navigation>
          <q-btn label="Prepare" color="primary" @click="prepare" :loading="preparing" class="float-right q-mb-lg"/>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Importation"
      >
        <template v-for="(source_info, import_index) in source_infos">
          <q-list :key="`source-${import_index}`" dense>
            <q-item>
              <q-item-label>{{ source_info.file }}</q-item-label>
            </q-item>
            <template v-for="(album, index) in source_info.albums">
              <album-form
                :album="album"
                :images="source_info.images"
                @split-album="split_album(album, source_info)"
                :key="`album-${index}`"
              />
            </template>
          </q-list>
        </template>

        <q-stepper-navigation>
          <div class="float-right q-mb-lg">
            <q-btn label="Back" @click="step_back" flat class="on-left"/>
            <q-btn
              @click="perform"
              label="Import"
              :disable="source_infos.length < 1"
              :loading="importing"
              color="primary"
            />
          </div>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>

  </q-page>
</template>

<script>
import {mapState} from 'vuex'
import {fetch_subdirectories} from 'lib/file_system'
import AlbumForm from 'components/AlbumForm'
import ProcessLogs from 'components/ProcessLogs'

export default {
  name: 'MusicImportPage',

  components: {AlbumForm, ProcessLogs},

  data: function(){
    return {
      step: 1,
      source: '/Users/vova/Music/Epica - Retrospect CD/CD1',
      source_error: null,
      source_infos: [],
      preparing: false,
      importing: false
    }
  },

  computed: {
    ...mapState({
      source_nodes (state) {
        return state.settings.import_sources.map(source => {
          return {
            label: source,
            full_path: source,
            lazy: true
          }
        })
      }
    })
  },

  methods: {
    on_sources_load ({node, key, done, fail}) {
      fetch_subdirectories(node.full_path)
        .then(subdirectories => {
          const children = subdirectories.map(dir => {
            const full_path = `${node.full_path}/${dir.name}`
            return {label: dir.name, lazy: true, full_path: full_path}
          })

          done(children)
        })
        .catch(error => {
          fail(console.log(error))
        })
    },

    step_back () { this.$refs.stepper.previous() },

    step_forward () { this.$refs.stepper.next() },

    remove_track (track) {},

    split_album (album, source_info) {
      const initial_tracks = album.tracks
      const checked_tracks = []
      album.tracks = []

      initial_tracks.forEach(track => {
        if (track.checked) {
          track.checked = false
          track.number = checked_tracks.length + 1
          checked_tracks.push(track)
        } else {
          album.tracks.push(track)
        }
      })

      const new_album = JSON.parse(JSON.stringify(Object.assign({}, album, {tracks: checked_tracks})))
      source_info.albums.push(new_album)
    },

    prepare () {
      this.preparing = true
      this.$api.query('collect_info', {path: this.source})
        .then(source_infos => {
          source_infos.forEach(source_info => {
            source_info.albums.forEach(album => {
              album.artist = {name: album.artist, id: null, mb_id: null}
              album.tracks.forEach(track => {
                track.checked = false
              })
            })
          })

          this.source_infos = source_infos
          this.step_forward()
        })
        .finally(() => {
          this.preparing = false
        })
    },

    perform () {
      this.importing = true
      this.$q.dialog({component: ProcessLogs})

      this.$api.post('import', {path: this.source, source_infos: this.source_infos})
        .then(result => {
          this.$store.commit('success_message', result.result)
          this.step_forward()
          this.source_infos = []
        })
        .finally(() => {
          this.importing = false
        })
    }
  }
}
</script>

<style>
</style>
