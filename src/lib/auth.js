const AUTH_TOKEN_KEY = 'auth_token'

export default {
  get_token () {
    return window.localStorage.getItem(AUTH_TOKEN_KEY)
  },

  save_token (token) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token)
  },

  delete_token () {
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
  }
}
