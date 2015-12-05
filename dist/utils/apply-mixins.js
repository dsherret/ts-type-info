function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            if (name !== "constructor") {
                var descriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
                Object.defineProperty(derivedCtor.prototype, name, descriptor);
            }
        });
    });
}
exports.applyMixins = applyMixins;

//# sourceMappingURL=apply-mixins.js.map
