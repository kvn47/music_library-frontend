<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

<q-card color="white" text-color="black" class="q-mb-sm">
  <q-card-section>
    <q-select
      label="Artist"
      :value="album.artist"
      :options="artist_options"
      @input="select_artist"
      @filter="search_artist"
      :loading="searching_artist"
      option-label="name"
      input-debounce="1000"
      use-input
      bottom-slots
    >
      <template v-slot:option="scope">
        <q-item
          v-bind="scope.itemProps"
          v-on="scope.itemEvents"
        >
          <q-item-section>
            <q-item-label>{{ scope.opt.value }}</q-item-label>
            <q-item-label overline>{{ scope.opt.label }}</q-item-label>
            <q-item-label caption>{{ scope.opt.details }}</q-item-label>
          </q-item-section>
          <q-item-section side>{{ scope.opt.score }}</q-item-section>
        </q-item>
      </template>

      <template v-slot:append="scope">
        <q-icon
          v-if="album.artist !== null"
          name="clear"
          @click.stop="clear_artist"
          class="cursor-pointer"
        />
      </template>

      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No result
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:hint>
        <div>
          {{ `id: ${album.artist.id}, mb_id: ${album.artist.mb_id}` }}
          <template v-if="album.mb_composer">
            <q-btn
              @click="set_mb_composer"
              :label="album.mb_composer"
              color="secondary"
              size="form"
              no-caps
              flat
            />
            <a
              :href="album.mb_composer_url"
              target="_blank"
              class="on-right"
            >
              <q-icon name="fas fa-external-link-alt"/>
            </a>
          </template>
        </div>
      </template>

      <template v-slot:before>
        <q-btn icon="fas fa-edit" color="grey-7" flat>
          <q-popup-edit v-model="album.artist.name" buttons>
            <q-input v-model="album.artist.name" dense autofocus/>
          </q-popup-edit>
        </q-btn>
      </template>
    </q-select>

    <q-input
      v-model="album.album_artist"
      label="Album Artist"
    >
      <template v-slot:before>
        <q-btn @click="fill_album_artist" icon="far fa-hand-point-right" color="grey-7" flat/>
      </template>
    </q-input>

    <template v-if="album.mb_artists">
      <q-btn
        :label="album.mb_artists"
        @click="set_mb_artists"
        color="secondary"
        size="form"
        no-caps
        flat
      />
    </template>

    <q-input
      v-model="album.title"
      label="Title"
    />

    <template v-if="album.mb_title">
      <q-btn
        @click="set_mb_title"
        :label="album.mb_title"
        color="secondary"
        size="form"
        no-caps
        flat
      />
      <a
        :href="album.mb_url"
        target="_blank"
        class="on-right"
      >
        <q-icon name="fas fa-external-link-alt"/>
      </a>
    </template>

    <q-input
      v-model="album.genre"
      label="Genre"
    />

    <q-input
      v-model="album.year"
      label="Year"
    />

    <template v-if="album.mb_date">
      <q-btn
        :label="album.mb_date"
        @click="set_mb_year"
        color="secondary"
        size="form"
        no-caps
        flat
      />
    </template>

    <q-select
      v-model="album.cover"
      :options="images"
      label="Cover"
      emit-value
    />
  </q-card-section>

  <q-expansion-item label="Tracks" switch-toggle-side>
    <q-list separator>
      <template v-for="(track, index) in album.tracks">
        <q-item :key="`track-${index}`">
          <q-item-section side><q-checkbox v-model="track.checked"/></q-item-section>

          <q-item-section>
            <div class="row gutter-xs">
              <q-input
                v-model="track.number"
                type="number"
                min="1"
                class="col-1"
              />

              <q-input
                v-model="track.title"
                class="col"
              />
            </div>

            <template v-if="track.mb_title">
              <div>
                <q-btn
                  @click="set_mb_track_title(track)"
                  :label="track.mb_title"
                  color="secondary"
                  size="form"
                  no-caps
                  flat
                />
                <a
                  :href="track.mb_url"
                  target="_blank"
                  class="on-right"
                >
                  <q-icon name="fas fa-external-link-alt"/>
                </a>
              </div>
            </template>
          </q-item-section>

          <q-item-section side right>
            <q-btn @click="remove_track(track)" icon="fas fa-minus" color="negative" flat />
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-expansion-item>

  <q-separator/>

  <q-card-actions align="around">
    <q-btn
      @click="find_work_info"
      :loading="searching_work"
      label="Find work info"
      color="info"
      flat
    />

    <!--<q-btn-->
      <!--@click="find_release_info"-->
      <!--:loading="searching_release"-->
      <!--label="Find release info"-->
      <!--color="info"-->
      <!--flat-->
    <!--/>-->

    <q-btn
      @click="$emit('split-album')"
      label="Split"
      color="secondary"
      flat
    />
  </q-card-actions>
</q-card>

</template>

<script>
export default {
  name: 'AlbumForm',

  props: {
    album: {
      type: Object,
      required: true
    },
    images: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      searching_work: false,
      searching_artist: false,
      artist_options: []
    }
  },

  // computed: {
  //   cover_options () {
  //     // return this.images.map(image => { return {label: image, value: image} })
  //     return this.images
  //   }
  // },

  methods: {
    find_work_info () {
      this.searching_work = true

      this.$api.query('work_info', {title: this.album.title, artist: this.album.artist.name, artist_mb_id: this.album.artist.mb_id})
        .then(work_info => {
          console.log(this.album)
          // this.album.mb_artists = work_info.artists
          this.album.mb_composer = work_info.composer
          this.album.mb_composer_url = work_info.composer_url
          this.album.mb_title = work_info.title
          this.album.mb_url = work_info.url
          this.album.mb_date = work_info.date

          work_info.parts.forEach(part => {
            this.album.tracks.forEach(track => {
              if (track.number === part.number) {
                track.mb_title = part.title
                track.mb_url = part.url
              }
            })
          })
        })
        .finally(() => {
          this.searching_work = false
        })
    },

    search_artist (name, update, abort) {
      if (name.length < 2) {
        if (this.album.artist.name.length < 2) {
          abort()
          this.searching_artist = false
          return
        } else {
          name = this.album.artist.name
        }
      }

      this.searching_artist = true

      this.$api.query('artists', {name: name})
        .then(artists => {
          if (artists.length > 0) {
            update(() => {
              this.artist_options = artists.map(artist => {
                return {
                  value: artist.name,
                  label: artist.name,
                  id: artist.id,
                  mb_id: artist.mb_id
                }
              })
            })
          } else {
            this.$api.query('mb_artists', {name: name})
              .then(artists => {
                update(() => {
                  this.artist_options = artists.map(artist => {
                    return {
                      value: artist.name,
                      label: artist.sort_name,
                      details: `[${artist.life_span.begin} - ${artist.life_span.end}]. Country: ${artist.country}`,
                      score: artist.score,
                      mb_id: artist.id
                    }
                  })
                })
              })
              .catch(() => abort())
          }
        })
        .catch(() => abort())
        .finally(() => { this.searching_artist = false })

    },

    select_artist (artist) {
      this.album.artist.name = artist.label
      this.album.artist.id = artist.id
      this.album.artist.mb_id = artist.mb_id
      this.album.mb_composer = artist.label
      this.album.mb_composer_url = `https://musicbrainz.org/artist/${artist.mb_id}`
    },

    clear_artist () {
      this.album.artist.id = null
      this.album.artist.name = null
      this.album.artist.mb_id = null
      this.album.mb_composer = null
      this.album.mb_composer_url = null
    },

    fill_album_artist () {
      this.album.album_artist = this.album.artist.name
    },

    set_mb_artists () {
      this.album.album_artist = this.album.mb_artists
    },

    set_mb_composer () {
      this.album.artist = this.album.mb_composer
    },

    set_mb_title () {
      this.album.title = this.album.mb_title
    },

    set_mb_year () {
      this.album.year = this.album.mb_date.split('-')[0]
    },

    set_mb_track_title (track) {
      track.title = track.mb_title
    },

    remove_track (track) {}
  }
}

</script>
