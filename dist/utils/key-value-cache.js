var KeyValueCache = (function () {
    function KeyValueCache() {
        this.cacheItems = [];
    }
    KeyValueCache.prototype.get = function (key) {
        for (var _i = 0, _a = this.cacheItems; _i < _a.length; _i++) {
            var cacheItem = _a[_i];
            if (cacheItem.key === key) {
                console.log('FOUND');
                return cacheItem.value;
            }
        }
        return null;
    };
    KeyValueCache.prototype.add = function (key, value) {
        this.cacheItems.push({ key: key, value: value });
    };
    return KeyValueCache;
})();
exports.KeyValueCache = KeyValueCache;
