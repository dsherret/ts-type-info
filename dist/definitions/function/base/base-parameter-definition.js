var utils_1 = require("./../../../utils");
var base_1 = require("./../../base");
var BaseParameterDefinition = (function () {
    function BaseParameterDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillType(typeChecker, symbol);
        this.fillParameterDetails(symbol);
    }
    Object.defineProperty(BaseParameterDefinition.prototype, "isRequired", {
        get: function () {
            return this._isRequired;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseParameterDefinition.prototype, "isRestParameter", {
        get: function () {
            return this._isRestParameter;
        },
        enumerable: true,
        configurable: true
    });
    BaseParameterDefinition.prototype.fillParameterDetails = function (symbol) {
        var declaration = symbol.valueDeclaration;
        this._isRequired = declaration.questionToken == null && declaration.initializer == null && declaration.dotDotDotToken == null;
        this._isRestParameter = declaration.dotDotDotToken != null;
    };
    return BaseParameterDefinition;
})();
exports.BaseParameterDefinition = BaseParameterDefinition;
utils_1.applyMixins(BaseParameterDefinition, [base_1.NamedDefinition, base_1.TypedDefinition]);

//# sourceMappingURL=base-parameter-definition.js.map
