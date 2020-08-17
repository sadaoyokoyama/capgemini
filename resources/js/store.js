import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentAction: {
      action: null,
      started: false,
      finished: false,
    },
    previousAction: {
      action: null,
      started: false,
      finished: false,
    },
    amount: null,
    accountData: null
  },
  getters: {
    started: state => state.currentAction.started,
    finished: state => state.currentAction.finished,
    action: state => state.currentAction.action,
    accountData: state => state.accountData,
    amount: state => state.amount
  },
  mutations: {
    startAction (state) {
      state.currentAction = { ...state.currentAction, started: true };
    },
    changeAction (state, { action }) {
      state.previousAction = { ...state.currentAction };
      state.currentAction = { action, started: false, finished: false };
    },
    finishAction (state) {
      state.currentAction = { ...state.currentAction, finished: true };
    },
    restartAction (state) {
      state.currentAction = { ...state.currentAction, started: true, finished: false };
    },
    setAccountData (state, payload) {
      state.accountData = payload;
    },
    resetAccountData (state) {
      state.accountData = null;
    },
    setAmount (state, payload) {
      state.amount = payload;
    },
    resetAmount (state) {
      state.amount = null;
    }
  },
  actions: {
    async setAccountData ({ commit }, payload) {
      try {
        const { data } = await axios.get(`/api/accounts/${payload}`);
      } catch (err) {
        console.log(err);
      }
    }
  }
});

export default store;