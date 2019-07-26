import ActionCable from 'actioncable'

const cable = ActionCable.createConsumer(process.env.WS)

export default async ({ Vue }) => {
  Vue.prototype.$cable = cable
}
