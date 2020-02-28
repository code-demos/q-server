import Vue from "vue";
import Vuex from "vuex";
import request from "@req";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {},
    files: [],
    searchText: ""
  },
  mutations: {
    updateFileList(state, files) {
      window.f = state.files = files;
    },
    updateSearchText(state, searchText) {
      state.searchText = searchText;
    },
    updateConfig(state, config) {
      state.config = config;
    }
  },
  actions: {
    async fetchFiles({ commit }, dir) {
      let files;
      try {
        files = (await request("/api/files", { dir })) || [];
        files.forEach(file => (file.selected = false));
      } catch (err) {
        files = [];
      }
      commit("updateFileList", files);
    },
    // 设置 list 中元素的 selected 字段
    setSelectFiles({ state: { files } }, [selected, list = [], byIndex]) {
      files.forEach((file, index) => (file.selected = list.includes(byIndex ? index : file) ? selected : !selected));
    }
  },
  getters: {
    filteredFiles: ({ files, searchText }) => files.filter(file => file.basename.includes(searchText)),
    selectedFiles: (state, { filteredFiles }) => filteredFiles.filter(file => file.selected)
  },
  modules: {}
});
