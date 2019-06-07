<template>
  <q-card>
    <q-card-section>
      <q-input
        v-model="export_list.name"
        label="Name"
        type="text"
        clearable
        autofocus
      />

      <q-input
        v-model="export_list.capacity"
        label="Capacity"
        type="number"
        suffix="GB"
      />

      <q-input
        v-model="export_list.destination_path"
        label="Destination path"
        type="text"
        clearable
      />
    </q-card-section>
    <q-separator/>
    <q-card-actions align="end">
      <q-btn label="Save" type="submit" color="primary" :loading="is_saving" @click="submit_form"/>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'ExportListForm',

  props: {
    export_list: {
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
      this.$emit('submit_form', this.export_list)
    }
  }
}
</script>

<style>
</style>
