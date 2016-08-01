export class ArrayUtils {
    private constructor() {
    }

    static isNullOrEmpty<T>(a: (T[] | undefined)): a is undefined {
        return !(a instanceof Array) || a.length === 0;
    }

    static firstOrDefault<T>(a: T[], isMatch: (item: T) => boolean) {
        for (let i = 0; i < a.length; i++) {
            if (isMatch(a[i])) {
                return a[i];
            }
        }

        return null;
    }

    static getUniqueItems<T>(a: T[]) {
        return a.filter((item, index) => a.indexOf(item) === index);
    }
}
