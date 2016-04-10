export module ArrayUtils {
    export function isNullOrEmpty<T>(a: T[]) {
        return !(a instanceof Array) || a.length === 0;
    }
}
