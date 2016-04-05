export function objectAssign<T, U>(target: T, source: U): T & U {
    let newObj: T & U = target as T & U;

    Object.keys(source).forEach(key => {
        (newObj as any)[key] = (source as any)[key];
    });

    return newObj;
}
