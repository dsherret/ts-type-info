export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if (name !== "constructor") {
                if (derivedCtor.prototype[name] == null) {
                    const descriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
                    Object.defineProperty(derivedCtor.prototype, name, descriptor);
                }
            }
        });
    });
}
