<template>
  <q-page class="flex flex-center" padding>
<!--    <q-btn-->
<!--      :to="{name: 'library'}"-->
<!--      icon="fas fa-music"-->
<!--      label="Library"-->
<!--      color="primary"-->
<!--      size="xl"-->
<!--      class="full-width"-->
<!--      outline-->
<!--    />-->

    <q-btn-group
      outline
      class="full-width"
    >
      <q-btn
        :to="{name: 'notes'}"
        icon="fas fa-sticky-note"
        label="Notes"
        color="primary"
        size="xl"
        outline
        class="full-width"
      />

      <q-btn
        @click="new_note"
        icon="fas fa-plus"
        color="primary"
        size="xl"
        outline
        class="full-width"
      />
    </q-btn-group>

    <q-btn
      :to="{name: 'organizer'}"
      icon="fas fa-align-justify"
      label="Organizer"
      color="primary"
      size="xl"
      outline
      class="full-width"
    />
  </q-page>
</template>

<script>
import NoteForm from 'components/NoteForm'

export default {
  name: 'HomePage',

  methods: {
    new_note () {
      this.$q.dialog({
        component: NoteForm,
        root: this.$root
      }).onOk(() => {
        console.log('OK')
      })
    }
  }
}
</script>

<style>
</style>
