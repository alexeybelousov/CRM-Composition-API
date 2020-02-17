import firebase from 'firebase/app';

export default {
  state: {
    categories: [],
  },
  actions: {
    async fetchCategories({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};

        commit('setCategories', Object.keys(categories).map((key) => ({ ...categories[key], id: key })));
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch('getUid');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit });

        commit('addCategory', { title, limit, id: category.key });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateCategory({ dispatch, commit }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit });

        commit('updateCategory', { title, limit, id });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    addCategory(state, category) {
      state.categories = [
        ...state.categories,
        category,
      ];
    },
    updateCategory(state, category) {
      state.categories = state.categories.map((cat) => {
        if (cat.id === category.id) {
          return category;
        }

        return cat;
      });
    },
    clearCategories(state) {
      state.categories = null;
    },
  },
  getters: {
    categories: (s) => s.categories,
  },
};
