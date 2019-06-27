<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-input
          v-model="source_path"
          label="Source path"
          :error="source_error"
          clearable
        />

        <q-input
          v-model="artist"
          label="Artist"
          clearable
        />

        <q-input
          v-model="album"
          label="Album"
          clearable
        />

        <q-input
          v-model="dst_path"
          label="Destination path"
          clearable
        />

        <br>
        <q-toggle
          v-model="collect_mb_info"
          label="Collect MusicBrainz info"
          class="q-mt-md"
        />

        <br>
        <q-toggle
          v-model="copy_files"
          label="Copy files"
          class="q-mt-md"
        />
      </q-card-section>

      <q-separator/>

      <q-card-actions align="around">
        <q-btn
          @click="collect_info"
          :disable="source_path === ''"
          :loading="collecting_info"
          label="Collect info"
          color="secondary"
        />

        <q-btn
          @click="organize"
          :disable="source_infos.length === 0"
          :loading="organizing"
          label="Organize"
          color="primary"
        />

        <q-btn
          @click="reset"
          label="Reset"
          color="warning"
        />
      </q-card-actions>
    </q-card>

    <template v-for="(source_info, source_index) in source_infos">
      <q-card color="light" class="q-mt-md" :key="`source-${source_index}`">
        <q-card-section>
          {{ `${source_index + 1}. ${source_info.file || ''}` }}

          <template v-if="source_info.mb_release">
            <span slot="subtitle">
              <a :href="source_info.mb_release_url" target="_blank" class="q-ml-sm">
                {{ source_info.mb_release }}
                <q-icon name="fas fa-external-link-alt" size="14px"/>
              </a>
            </span>
          </template>
        </q-card-section>

        <template v-for="(album, album_index) in source_info.albums">
          <album-form
            :album="album"
            :images="source_info.images"
            @split-album="split_album(album, source_info)"
            :key="`album-${album_index}`"
          />
        </template>
      </q-card>
    </template>
  </q-page>
</template>

<script>

import AlbumForm from 'components/AlbumForm'

export default {
  name: 'AlbumOrganizerPage',

  components: {AlbumForm},

  data () {
    return {
      source_path: '',
      source_error: null,
      source_infos: [],
      artist: null,
      album: null,
      dst_path: '',
      collect_mb_info: false,
      copy_files: false,
      collecting_info: false,
      organizing: false
    }
  },

  methods: {
    collect_info () {
      if (this.organizing) { return }

      this.collecting_info = true

      this.$api.query('music_info', {path: this.source_path, artist: this.artist, album: this.album, collect_mb_info: this.collect_mb_info})
        .then((source_infos) => {
          source_infos.forEach(source_info => {
            source_info.albums.forEach(album => {
              album.tracks.forEach(track => {
                track.checked = false
              })
            })
          })

          this.source_infos = source_infos
        })
        .finally(() => {
          this.collecting_info = false
        })
    },

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

      const new_album = Object.assign({}, album, {tracks: checked_tracks})
      source_info.albums.push(new_album)
    },

    organize () {
      if (this.collecting_info) { return }

      this.organizing = true

      this.$api.query('organize_files', {path: this.source_path, source_infos: this.source_infos, dst_path: this.dst_path, copy_files: this.copy_files})
        .finally(() => {
          this.organizing = false
        })
    },

    reset () {
      this.source_infos = []
    }
  }
}
</script>
