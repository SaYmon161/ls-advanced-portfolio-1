export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    }
  },
  getters: {
    userIsLogged: state => {
      const userObj = state.user;
      const userObjectIsEmpty = Object.keys(userObj).length === 0 && userObj.constructor === Object;
      return userObjectIsEmpty === false;
    }
  },
  actions: {
    async loginUser(store, user) {
      try {
        const response = await this.$axios.post('/login', user);
        return response
      } catch (e) {
        throw new Error(e.response.data.message);
      }
           
    }
  }
} 