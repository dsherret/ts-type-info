interface KeyValueCacheItem<T, U> {
    key: T;
    value: U;
}

export class KeyValueCache<T, U> {
    private readonly cacheItems: KeyValueCacheItem<T, U>[] = [];

    getOrCreate(key: T, createFunc: () => U) {
        let item = this.get(key);

        if (item == null) {
            item = createFunc();
            this.add(key, item);
        }

        return item;
    }

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
