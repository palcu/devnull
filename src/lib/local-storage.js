module.exports = {
  isKeySaved: function(map, key) {
    /**
     * Map should be already saved.
     */
    return this.getLocalStorageKey(map, key) !== null;
  },

  getLocalStorageKey: function(bigMap, key) {
    return JSON.parse(window.localStorage.getItem(bigMap + ':' + key));
  },

  setLocalStorageKeys: function(bigMap, dict) {
    for (var key in dict) {
      window.localStorage.setItem(bigMap + ':' + key,
                                  JSON.stringify(dict[key]));
    }
  }
};
