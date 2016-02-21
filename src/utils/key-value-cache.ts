interface KeyValueCacheItem<T, U> {
    key: T;
    value: U;
}

export class KeyValueCache<T, U> {
    private cacheItems: KeyValueCacheItem<T, U>[] = [];

    getOrCreate(key: T, createFunc: () => U, onAfterAdd: (item: U) => void = () => {}) {
        let item = this.get(key);

        if (item == null) {
            item = createFunc();
            this.add(key, item);
            onAfterAdd(item);
        }

        return item;
    }

    // TODO-CHANGE: Make this private
    get(key: T) {
        for (let cacheItem of this.cacheItems) {
            if (cacheItem.key === key) {
                return cacheItem.value;
            }
        }

        return null;
    }

    getKeyFromValue(value: U) {
        for (let cacheItem of this.cacheItems) {
            if (cacheItem.value === value) {
                return cacheItem.key;
            }
        }

        return null;
    }

    getAll() {
        return this.cacheItems.map(c => c.value);
    }

    add(key: T, value: U) {
        this.cacheItems.push({ key: key, value: value });
    }
}
