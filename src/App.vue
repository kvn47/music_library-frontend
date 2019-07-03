<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  preFetch ({store}) {
    store.dispatch('fetch_settings')
  }
}
</script>

<style>
</style>
