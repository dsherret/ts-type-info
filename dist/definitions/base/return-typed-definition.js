var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var utils_1 = require("./../../utils");
var ReturnTypedDefinition = (function () {
    function ReturnTypedDefinition() {
    }
    ReturnTypedDefinition.prototype.fillReturnTypeBySymbol = function (typeChecker, symbol) {
        this._returnType = typeChecker.getReturnTypeFromSymbol(symbol);
    };
    ReturnTypedDefinition.prototype.fillReturnTypeBySignature = function (typeChecker, signature) {
        this._returnType = typeChecker.getReturnTypeFromSignature(signature);
    };
    Object.defineProperty(ReturnTypedDefinition.prototype, "returnType", {
        get: function () {
            return this._returnType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReturnTypedDefinition.prototype, "returnType",
        __decorate([
            utils_1.Serializable
        ], ReturnTypedDefinition.prototype, "returnType", Object.getOwnPropertyDescriptor(ReturnTypedDefinition.prototype, "returnType")));
    return ReturnTypedDefinition;
})();
exports.ReturnTypedDefinition = ReturnTypedDefinition;

//# sourceMappingURL=return-typed-definition.js.map
