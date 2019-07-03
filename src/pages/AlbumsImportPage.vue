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
          <q-btn label="Prepare" color="primary" @click="prepare" class="float-right q-mb-lg"/>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Importation"
      >
        <template v-for="(import_source, import_index) in import_sources">
          <q-list :key="`source-${import_index}`" dense>
            <q-item>
              <q-item-label>{{ import_source.file }}</q-item-label>
            </q-item>
            <template v-for="(album, index) in import_source.albums">
              <album-form
                :album="album"
                @split-album="split_album(album, import_source)"
                :key="`album-${index}`"
              />

              <!--<q-card :key="`album-${index}`">-->
                <!--<q-card-main>-->
                  <!--<q-field><q-input float-label="Album Artist" v-model="album.album_artist"/></q-field>-->
                  <!--<template v-if="album.mb_artists">-->
                    <!--<q-btn-->
                      <!--:label="album.mb_artists"-->
                      <!--@click="album.album_artist = album.mb_artists"-->
                      <!--icon="fas fa-check"-->
                      <!--color="tertiary"-->
                      <!--size="form"-->
                      <!--no-caps-->
                      <!--flat-->
                    <!--/>-->
                  <!--</template>-->

                  <!--<q-field><q-input float-label="Artist" v-model="album.artist"/></q-field>-->
                  <!--<template v-if="album.mb_composer">-->
                    <!--<q-btn-->
                      <!--@click="album.artist = album.mb_composer"-->
                      <!--:label="album.mb_composer"-->
                      <!--icon="fas fa-check"-->
                      <!--color="tertiary"-->
                      <!--size="form"-->
                      <!--no-caps-->
                      <!--flat-->
                    <!--/>-->
                    <!--<a :href="album.mb_composer_url" target="_blank" class="q-ml-sm">-->
                      <!--<q-icon name="fas fa-external-link-alt"/>-->
                    <!--</a>-->
                  <!--</template>-->

                  <!--<q-field><q-input float-label="Title" v-model="album.title"/></q-field>-->
                  <!--<template v-if="album.mb_title">-->
                    <!--<q-btn-->
                      <!--@click="album.title = album.mb_title"-->
                      <!--:label="album.mb_title"-->
                      <!--icon="fas fa-check"-->
                      <!--color="tertiary"-->
                      <!--size="form"-->
                      <!--no-caps-->
                      <!--flat-->
                    <!--/>-->
                    <!--<a :href="album.mb_url" target="_blank" class="q-ml-sm">-->
                      <!--<q-icon name="fas fa-external-link-alt"/>-->
                    <!--</a>-->
                  <!--</template>-->

                  <!--<q-field><q-input float-label="Year" v-model="album.year"/></q-field>-->
                  <!--<template v-if="album.mb_date">-->
                    <!--<q-btn-->
                      <!--:label="album.mb_date"-->
                      <!--@click="album.year = album.mb_date"-->
                      <!--icon="fas fa-check"-->
                      <!--color="tertiary"-->
                      <!--size="form"-->
                      <!--no-caps-->
                      <!--flat-->
                    <!--/>-->
                  <!--</template>-->

                  <!--<q-field><q-input float-label="Cover" v-model="album.cover"/></q-field>-->
                <!--</q-card-main>-->

                <!--<q-collapsible label="Tracks">-->
                  <!--<q-list no-border separator>-->
                    <!--<template v-for="(track, index) in album.tracks">-->
                      <!--<q-item :key="`track-${index}`">-->
                        <!--<q-item-side><q-checkbox v-model="track.checked"/></q-item-side>-->

                        <!--<q-item-main>-->
                          <!--<q-item-tile label class="row gutter-xs">-->
                            <!--<q-field class="col-1"><q-input v-model="track.number" type="number" min="1"/></q-field>-->
                            <!--<q-field class="col"><q-input v-model="track.title"/></q-field>-->
                          <!--</q-item-tile>-->

                          <!--<q-item-tile sublabel>-->
                            <!--<q-btn-->
                              <!--@click="track.title = track.mb_title"-->
                              <!--:label="track.mb_title"-->
                              <!--icon="fas fa-check"-->
                              <!--color="tertiary"-->
                              <!--size="form"-->
                              <!--no-caps-->
                              <!--flat-->
                            <!--/>-->
                            <!--<a :href="track.mb_url" target="_blank" class="q-ml-sm">-->
                              <!--<q-icon name="fas fa-external-link-alt"/>-->
                            <!--</a>-->
                          <!--</q-item-tile>-->
                        <!--</q-item-main>-->

                        <!--<q-item-side right>-->
                          <!--<q-btn flat color="negative" icon="fas fa-minus" @click="remove_track(track)"/>-->
                        <!--</q-item-side>-->
                      <!--</q-item>-->
                    <!--</template>-->
                  <!--</q-list>-->
                <!--</q-collapsible>-->

                <!--<q-card-separator/>-->
                <!--<q-card-actions align="around">-->
                  <!--<q-btn label="Split" color="secondary" flat @click="split_album(album, import_source)"></q-btn>-->
                  <!--<q-btn label="Remove" color="negative" flat/>-->
                <!--</q-card-actions>-->
              <!--</q-card>-->

            </template>
          </q-list>
        </template>

        <q-stepper-navigation>
          <div class="float-right q-mb-lg">
            <q-btn label="Back" @click="step_back" flat class="on-left"/>
            <q-btn label="Import" color="primary" @click="perform"/>
          </div>
        </q-stepper-navigation>
      </q-step>

      <q-inner-loading :visible="processing"></q-inner-loading>
    </q-stepper>

  </q-page>
</template>

<script>
import {mapState} from 'vuex'
import {fetch_subdirectories} from 'lib/file_system'
import AlbumForm from 'components/AlbumForm'

export default {
  name: 'AlbumsImportPage',

  components: {AlbumForm},

  data () {
    return {
      step: 1,
      source: '',
      source_error: null,
      import_sources: [],
      processing: false
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

    split_album (album, import_source) {
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

      const new_album = Object.assign({}, album, {tracks: checked_tracks})
      import_source.albums.push(new_album)
    },

    prepare () {
      this.processing = true
      this.$api.query('collect_info', {path: this.source})
        .then(import_sources => {
          import_sources.forEach(import_source => {
            import_source.albums.forEach(album => {
              album.tracks.forEach(track => {
                track.checked = false
              })
            })
          })

          this.import_sources = import_sources
          this.step_forward()
        })
        .finally(() => {
          this.processing = false
        })
    },

    perform () {
      this.processing = true

      this.$api.post('import', {path: this.source, import_sources: this.import_sources})
        .then(result => {
          console.log(result)
          this.step_forward()
          this.import_sources = []
        })
        .finally(() => {
          this.processing = false
        })
    }
  }
}
</script>

<style>
</style>
