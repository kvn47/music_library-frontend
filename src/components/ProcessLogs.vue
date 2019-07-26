<template>
  <q-dialog
    ref="logs"
    @hide="hide"
    position="bottom"
    seamless
    full-width
  >
    <q-card>
      <q-linear-progress :value="logs_progress"/>
      <q-card-section style="max-height: 20vh;">
<!--        <div class="column fit q-px-sm">-->
          <q-scroll-area ref="logs_area" style="min-height: 5rem;">
            <p v-for="log in logs">{{ log }}</p>
          </q-scroll-area>
<!--        </div>-->
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn @click="clear" label="Clear" flat/>
        <q-btn @click="hide" label="Hide" flat/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ProcessLogs',

  data () {
    return {
      logs_connected: false,
      logs: [],
      logs_progress: 0,
      logs_subscription: null
    }
  },

  created () {
    this.logs_subscription = this.$cable.subscriptions.create('LogsChannel', {
      connected: () => {
        this.logs = []
        this.progress = 0
        this.logs_connected = true
      },

      received: (data) => {
        if (data['string']) {
          this.logs.push(data['string'])
          this.$refs.logs_area.setScrollPosition(this.$refs.logs_area.scrollSize - this.$refs.logs_area.containerHeight)
          this.logs_progress = 0
        } else if (data['progress']) {
          this.logs_progress = Number(data['progress']) / 100
        }
      }
    })
  },

  beforeDestroy () {
    if (this.logs_subscription) {
      this.logs_subscription.unsubscribe()
    }
  },

  methods: {
    show () {
      this.$refs.logs.show()
    },

    hide () {
      this.$refs.logs.hide()
    },

    clear () {
      this.logs = []
      this.logs_progress = 0
    }
  }
}
</script>

<style>
</style>