import Vue from 'vue'
import Vuex from 'vuex'
import http from '../plugins/http'
import formDataBuilder from "../plugins/formDataBuilder";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: "",
    user: {},
    stands: [],
    laboratories: [],
    details: []
  },
  getters: {
    getStandsId(state) {
      return state.stands.map(item => item.id);
    },
    getLaboratoriesId(state) {
      return state.laboratories.map(item => item.id);
    },
    getStandDetails: (state) => (stand_id) => {
      console.log("stand_id");
      console.log(state.details.filter(item => true));
      return state.details.filter(item => item.stand_id == stand_id);
    },
    getStand: (state) => (stand_id) =>  {
      return state.stands.find(item => item.id == stand_id);
    },
  },
  mutations: {
    setToken(state, access_token) {
      state.access_token = access_token;
    },
    mutate(state, payload) {
      state[payload.key] = payload.value;
    },
    setLaboratories(state, laboratories) {
      state.laboratories = laboratories;
    },
    setStands(state, stands) {
      state.stands = stands;
    },
    setDetails(state, details) {
      console.log("asda");

      state.details = details;
    }
  },
  actions: {
    async loginUser({ commit }, user) {
      await http.post('/user/login', formDataBuilder(user))
        .then((response) => {
          if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token)
            commit('setToken', response.data.access_token)
            http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
            console.log(http.defaults.headers.common['Authorization']);
          }
        })
    },
    async getUser({ commit }) {
      await http.get('/user')
        .then((response) => {
          console.log(response.data);
        })
      await http.get('/laboratories')
        .then((response) => {
          commit("setLaboratories", response.data);
        })
      await http.get('/stands')
        .then((response) => {
          commit("setStands", response.data)
        })
      await http.get('/details')
        .then((response) => {
          commit("setDetails", response.data)
        })
    },
    async createNewUser({ }, user) {
      await http.post('/user/create_user', formDataBuilder(user))
        .then((response) => {
          console.log(response.data);
        })
    },
    async createLaboratory({ commit }, name) {
      await http.post('/create/laboratory', formDataBuilder({ name }))
        .then((response) => {
          commit("setLaboratories", response.data);
        })
    },
    async deleteLaboratory({ commit }, id) {
      await http.delete('/delete/laboratory', { params: { id } })
        .then((response) => {
          commit("setLaboratories", response.data);
        })
    },
    async createStand({ commit }, name) {
      await http.post('/create/stand', formDataBuilder({ name }))
        .then((response) => {
          commit("setStands", response.data);
        })
    },
    async deleteStand({ commit }, id) {
      await http.delete('/delete/stand', { params: { id } })
        .then((response) => {
          commit("setStands", response.data)
        })
    },
    async createDetail({ commit }, detail) {
      console.log(detail);
      console.log(formDataBuilder(detail));
      await http.post('/create/detail', formDataBuilder(detail))
        .then((response) => {
          commit("setDetails", response.data);
        })
    },
    async deleteDetail({ commit }, id) {
      await http.delete('/delete/detail', { params: { id } })
        .then((response) => {
          commit("setDetails", response.data);
        })
    },
    async saveLink({ commit }, stand) {
      await http.put(`/update/stand_link`, null, { params: stand })
        .then((response) => {
          commit("setStands", response.data);
        })
    },
  }
})
