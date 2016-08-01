export class StringHashSet {
    private readonly obj: { [uniqueID: string]: boolean; } = {};

    add(key: string) {
        this.obj[key] = true;
    }

    contains(key: string) {
        return this.obj[key] === true;
    }
}
