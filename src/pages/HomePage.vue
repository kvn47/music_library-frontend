<template>
  <q-page class="flex flex-center" padding>
    <q-btn
      :to="{name: 'library'}"
      icon="fas fa-music"
      label="Library"
      color="primary"
      size="xl"
      class="full-width"
      outline
    />

    <q-btn-group
      outline
      class="full-width"
    >
      <q-btn
        :to="{name: 'notes', params: {kind: 'await'}}"
        icon="fas fa-sticky-note"
        label="Notes"
        color="primary"
        size="xl"
        outline
        class="full-width"
      />

      <q-btn
        icon="fas fa-plus"
        color="primary"
        size="xl"
        outline
        class="full-width"
      />
    </q-btn-group>
  </q-page>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style>
</style>
