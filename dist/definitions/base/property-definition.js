var ts = require("typescript");
var utils_1 = require("./../../utils");
var named_definition_1 = require("./named-definition");
var typed_definition_1 = require("./typed-definition");
var PropertyDefinition = (function () {
    function PropertyDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this._isOptional = typeChecker.isOptionalProperty(symbol);
    }
    Object.defineProperty(PropertyDefinition.prototype, "isOptional", {
        get: function () {
            return this._isOptional;
        },
        enumerable: true,
        configurable: true
    });
    PropertyDefinition.isProperty = function (symbol) {
        return (symbol.getFlags() & 4 /* Property */) !== 0;
    };
    return PropertyDefinition;
})();
exports.PropertyDefinition = PropertyDefinition;
utils_1.applyMixins(PropertyDefinition, [named_definition_1.NamedDefinition, typed_definition_1.TypedDefinition]);

//# sourceMappingURL=property-definition.js.map
