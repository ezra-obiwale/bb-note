import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import localforage from 'localforage'

Vue.use(Vuex)

const persistedStorage = new VuexPersist({
  key: 'notes',
  storage: localforage
})

export default new Vuex.Store({
  plugins: [persistedStorage.plugin],
  state: {
    notes: []
  },
  mutations: {
    DELETE_NOTE (state, note) {
      const index = state.notes.findIndex(_note => _note.id === note.id)
      if (index > -1) {
        state.notes.splice(index, 1)
      }
    },
    SAVE_NOTE (state, note) {
      // editing
      if (note.id) {
        const index = state.notes.findIndex(_note => _note.id === note.id)
        if (index > -1) {
          state.notes.splice(index, 1, note)
        }
        return
      }

      // new

      const lastId = state.notes.length ? state.notes[0].id : 0
      note.id = lastId + 1
      state.notes.unshift(note)
    }
  },
  actions: {
    deleteNote ({
      commit
    }, note) {
      // delete on server, then
      commit('DELETE_NOTE', note)
    },
    saveNote ({
      commit
    }, note) {
      // save to server, then
      commit('SAVE_NOTE', note)
    }
  }
})
