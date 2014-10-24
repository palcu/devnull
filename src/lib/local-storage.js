module.exports = {
  isMapSaved: function(bigMap) {
    /**
     * Map should be already saved.
     */
    return this.getLocalStorageKey(bigMap, 'bigMap') !== null;
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
