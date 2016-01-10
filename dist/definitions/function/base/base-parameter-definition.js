var utils_1 = require("./../../../utils");
var expressions_1 = require("./../../../expressions");
var base_1 = require("./../../base");
var BaseParameterDefinition = (function () {
    function BaseParameterDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillParameterDetails(typeChecker, symbol);
    }
    Object.defineProperty(BaseParameterDefinition.prototype, "isOptional", {
        get: function () {
            return this._isOptional;
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
    Object.defineProperty(BaseParameterDefinition.prototype, "defaultExpression", {
        get: function () {
            return this._defaultExpression;
        },
        enumerable: true,
        configurable: true
    });
    BaseParameterDefinition.prototype.fillParameterDetails = function (typeChecker, symbol) {
        var declaration = symbol.valueDeclaration;
        this._isOptional = declaration.questionToken != null || declaration.initializer != null || declaration.dotDotDotToken != null;
        this._isRestParameter = declaration.dotDotDotToken != null;
        this._defaultExpression = declaration.initializer != null ? new expressions_1.Expression(typeChecker, declaration.initializer) : null;
    };
    return BaseParameterDefinition;
})();
exports.BaseParameterDefinition = BaseParameterDefinition;
utils_1.applyMixins(BaseParameterDefinition, [base_1.NamedDefinition, base_1.TypedDefinition]);

//# sourceMappingURL=base-parameter-definition.js.map
