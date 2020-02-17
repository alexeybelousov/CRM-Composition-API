import firebase from 'firebase/app';

export default {
  actions: {
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
};
