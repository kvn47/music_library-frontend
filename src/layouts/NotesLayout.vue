<template>
  <q-layout view="hHh lpr lFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <home-button/>
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
            :to="{name: 'notes', params: {kind: name}}"
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
  import HomeButton from 'components/HomeButton'

  export default {
    name: 'NotesLayout',
    components: {HomeButton},

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

      current_kind () {
        return this.$route.params.kind
      },

      current_kind_color () {
        if (this.current_kind === undefined) {
          return 'accent'
        } else {
          return this.note_kinds[this.current_kind].color
        }
      }
    }
  }
</script>

<style>
</style>
