import firebase from 'firebase/app';

export default {
  state: {
    info: {},
  },
  actions: {
    async updateUserInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid');
        const updateData = { ...getters.info, ...toUpdate };
        await firebase.database().ref(`/users/${uid}/info`).update(updateData);

        commit('setUserInfo', updateData);
      // eslint-disable-next-line no-empty
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchUserInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();

        commit('setUserInfo', info);
      // eslint-disable-next-line no-empty
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
  mutations: {
    setUserInfo(state, info) {
      state.info = info;
    },
    clearUserInfo(state) {
      state.info = null;
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
