export class ArrayExt<T> extends Array<T> {
    constructor(...items: T[]) {
        super();
        this.push(...items);
    }

    firstOrDefault(condition: (item: T) => boolean) {
        for (let i = 0; i < this.length; i++) {
            if (condition(this[i])) {
                return this[i];
            }
        }

        return null;
    }

    removeWhere(condition: (item: T) => boolean) {
        for (let i = 0; i < this.length; i++) {
            if (condition(this[i]) === true) {
                this.splice(i, 1);
                i--;
            }
        }
    }
}
