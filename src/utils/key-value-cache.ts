interface KeyValueCacheItem<T, U> {
    key: T;
    value: U;
}

export class KeyValueCache<T, U> {
    private cacheItems: KeyValueCacheItem<T, U>[] = [];

    get(key: T) {
        for (let cacheItem of this.cacheItems) {
            if (cacheItem.key === key) {
                return cacheItem.value;
            }
        }

        return null;
    }

    add(key: T, value: U) {
        this.cacheItems.push({ key: key, value: value });
    }
}
