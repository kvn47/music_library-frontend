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
        <q-space/>

<!--        <q-input-->
<!--          v-model="search_query"-->
<!--          input-class="text-right"-->
<!--          dark-->
<!--          borderless-->
<!--        >-->
<!--          <template v-slot:append>-->
<!--            <q-icon v-if="search_query === ''" name="search"/>-->
<!--            <q-icon v-else @click="search_query = ''" name="clear" class="cursor-pointer"/>-->
<!--          </template>-->
<!--        </q-input>-->
<!--        <q-btn-->
<!--          @click="search"-->
<!--          icon="fas fa-search on-left"-->
<!--          flat-->
<!--          round-->
<!--          dense-->
<!--        />-->
        <q-btn
          @click="new_note"
          icon="fas fa-plus"
          flat
          round
          dense
        />
      </q-toolbar>

<!--      <q-input-->
<!--        v-if="searching"-->
<!--        v-model="search_query"-->
<!--        clearable-->
<!--      >-->

<!--      </q-input>-->

      <q-tabs
        indicator-color="white"
        :active-color="current_kind_color"
        align="justify"
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
  </q-layout>
</template>

<script>
  import NoteForm from 'components/NoteForm'

  export default {
    name: 'NotesLayout',

    data () {
      return {
        // searching: false,
        // search_query: ''
      }
    },

    computed: {
      note_kinds () {
        return this.$store.state.notes.note_kinds
      },

      current_kind_color () {
        return this.note_kinds[this.$route.params.kind].color
      }
    },

    methods: {
      // search () {
      //   this.searching = !this.searching
      // },

      new_note () {
        this.$q.dialog({
          component: NoteForm,
          root: this.$root
        }).onOk(() => {
          console.log('New note OK')
        })
      }
    }
  }
</script>

<style>
</style>
