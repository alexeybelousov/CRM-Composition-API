import firebase from 'firebase/app';

export default {
  state: {
    records: [],
  },
  actions: {
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};

        commit('setRecords', Object.keys(records).map((key) => ({ ...records[key], id: key })));
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async createRecord({ dispatch, commit, getters }, record) {
      try {
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/records`).push(record);

        const bill = record.type === 'income'
          ? getters.info.bill + record.amount
          : getters.info.bill - record.amount;

        dispatch('updateUserInfo', { bill });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
  mutations: {
    setRecords(state, records) {
      state.records = records;
    },
  },
  getters: {
    records: (s) => s.records,
  },
};
