<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h6 cursor-pointer">
          {{ name }}
          <q-popup-edit v-model="name" buttons>
            <q-input v-model="name" dense autofocus/>
          </q-popup-edit>
        </div>

        <div class="text-subtitle1 cursor-pointer">
          {{ size }}
          <q-popup-edit v-model="size" buttons>
            <q-input v-model="size" dense autofocus/>
          </q-popup-edit>
        </div>
      </q-card-section>
      <q-card-actions align="around"></q-card-actions>
      <q-separator/>

      <q-list separator>
        <q-item
          v-for="track in tracks"
          :key="track.id"
        ></q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'ExportListPage',
  props: ['id'],

  data () {
    return {
      name: null,
      size: null,
      path: null,
      tracks: []
    }
  },

  created () {
    this.$api.query(`export_lists/${this.id}`)
      .then(export_list => {
        this.name = export_list.name
        this.size = export_list.size
        this.path = export_list.path
        this.tracks = export_list.tracks
      })
  }
}
</script>

<style>
</style>
