<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page padding>
    <q-table
      title="Artists"
      :data="artists"
      :columns="columns"
      :filter="filter"
      row-key="name"
      hide-header
    >
      <template slot="top-right" slot-scope="props">
        <q-search hide-underline color="secondary" v-model="filter"/>
        <q-input v-model="filter" debounce="1000">
          <template v-slot:append>
            <q-icon name="fas fa-search"/>
          </template>
        </q-input>
      </template>
      <q-td slot="body-cell-actions" slot-scope="props" :props="props">
        <q-btn icon="fas fa-edit" color="secondary" flat @click="edit_artist(props.value)"/>
        <q-btn icon="fas fa-trash" color="negative" flat @click="delete_artist(props.value)"/>
      </q-td>
    </q-table>
  </q-page>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'ArtistsPage',

  data () {
    return {
      artists: [],

      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'actions',
          align: 'right',
          field: 'id'
        }
      ],

      filter: ''
    }
  },

  beforeMount () {
    this.fetch_artists().then(artists => {
      this.artists = artists
    })
  },

  methods: {
    ...mapActions(['fetch_artists', 'delete_artist']),

    edit_artist (id) {}
  }
}
</script>

<style>
</style>
