import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    assets: [],
  },
  mutations: {
    setAssets(state, assets) {
      state.assets = assets;
    }
  },
  actions: {
    async getAllAssets(context) {
         await axios.get('http://localhost:3000/api/amanah')
        .then(response => {
            context.commit('setAssets', response.data.data)
        })
        .catch(error => {
            console.log('ini error', error)
        })
    },
    async createAsset(context, payload) {
        await axios.post('http://localhost:3000/api/amanah', payload)
        .then(response => {
          console.log('ini create data ', response)
        })
        .catch(error => {
            console.log('ini error', error)
        })
    },
    async updateAsset(context, payload) {
        await axios.put(`http://localhost:3000/api/amanah/${payload.id}`, payload)
        .then(response => {
          console.log('ini update data ', response)
        })
        .catch(error => {
            console.log('ini error', error)
        })
    },
    async deleteAsset (context, payload) {
        await axios.delete(`http://localhost:3000/api/amanah/${payload}`)
        .then(response => {
          console.log('ini delete data ', response)
        })
        .catch(error => {
            console.log('ini error', error)
        })
    }
  },
  getters: {
    getAssets(state) {
      return state.assets;
    }
  },
  modules: {},
});
