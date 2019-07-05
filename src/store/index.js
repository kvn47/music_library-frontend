import Vue from 'vue'
import Vuex from 'vuex'
import {Notify} from 'quasar'

import settings from './settings'
import library from './library'
import notes from './notes'
import tracklists from './tracklists'
import export_lists from './export_lists'
import artists from './artists'
import albums from './albums'
import tracks from './tracks'

Vue.use(Vuex)

export default new Vuex.Store({

  mutations: {
    success_message(state, message) {
      Notify.create({
        message: message,
        type: 'positive',
        timeout: 3000,
        actions: [{icon: 'fas fa-times'}]
      })
    },

    error_message (state, message) {
      Notify.create({
        message: message,
        type: 'negative',
        timeout: 0,
        actions: [{icon: 'fas fa-times'}]
      })
    },

    add_success_message (state, message) {
      state.success_messages.push(message)
    },

    add_error_message (state, message) {
      state.error_messages.push(message)
    }
  },

  modules: {
    settings,
    notes,
    library,
    tracklists,
    export_lists,
    artists,
    albums,
    tracks
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})
