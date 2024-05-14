export default {
  namespaced: true,
  state: {
    user: null,
    loading: false,
    _emart_token: null,
    validationErrors: null,
  },

  mutations: {
    setUser(state, data) {
      state.user = data
    },
   
    login(state, { token, user }) {
      state._emart_token = token;
      state.user = user;
    },

    async LOGOUT(state) {
      state.user = null
      state._emart_token = null
      localStorage.clear()
    },

    RESET(state) {
      Object.keys(state).forEach((key) => {
        Object.assign(state[key], null)
      })
    }
  },

  actions: {
    logout({ commit }) {
      commit('LOGOUT')
    }
  },
  
  getters: {
    auth: (state) => state.auth,
    isLoading: (state) => state.loading,
    getUser: (state) => state.user,
    getAuthenticated: (state) => !!state._emart_token,
    getToken: (state) => state._emart_token
  }
}
