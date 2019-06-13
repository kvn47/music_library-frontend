<template>
  <q-layout view="hHh lpr lFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn
            :to="{name: 'home'}"
            icon="fas fa-arrow-left"
            flat
          />
          Notes
        </q-toolbar-title>
        <q-btn
          @click="new_note"
          icon="fas fa-plus"
          color="positive"
          flat
          round
          dense
        />
      </q-toolbar>

      <q-tabs
        indicator-color="accent"
        align="justify"
        active-color="accent"
      >
        <template v-for="(kind, name) in note_kinds">
          <q-route-tab
            :key="name"
            :name="name"
            :icon="kind.icon"
            :color="kind.color"
            :to="name"
          />
        </template>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

<!--    <q-dialog v-model="is_modal_visible" style="width: 700px; max-width: 80vw;" persistent>-->
<!--      <q-card>-->
<!--        <q-toolbar :class="`bg-${form_color} text-white`">-->
<!--          <q-btn @click="close_form" flat round dense icon="fas fa-times"/>-->
<!--          <q-toolbar-title>{{ form_title }}</q-toolbar-title>-->
<!--        </q-toolbar>-->
<!--        <div class="layout-padding">-->
<!--          <note-form :note="active_note" @submit-form="save_note"/>-->
<!--        </div>-->
<!--      </q-card>-->
<!--    </q-dialog>-->
  </q-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'NotesLayout',

    computed: {
      ...mapGetters(['note_kinds'])
    },

    methods: {
      new_note () {
        // TODO Show dialog with new note form
      }
    }
  }
</script>

<style>
</style>
