<template>
<q-card>
  <q-card-section>
    <q-input
      v-model="tracklist.name"
      label="Name"
      type="text"
      autofocus
      clearable
    />
  </q-card-section>
  <q-separator/>
  <q-card-actions align="end">
    <q-btn
      @click="submit_form"
      label="Save"
      type="submit"
      color="primary"
      :loading="is_saving"
    />
  </q-card-actions>
</q-card>
</template>

<script>
export default {
  name: 'TracklistForm',

  props: {
    tracklist: {
      type: Object,
      default () { return {} }
    }
  },

  data () {
    return {
      is_saving: false
    }
  },

  methods: {
    submit_form () {
      this.$emit('submit_form', this.tracklist)
    }
  }
}
</script>

<style scoped>

</style>
