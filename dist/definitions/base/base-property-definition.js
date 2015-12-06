var ts = require("typescript");
var utils_1 = require("./../../utils");
var named_definition_1 = require("./named-definition");
var typed_definition_1 = require("./typed-definition");
var BasePropertyDefinition = (function () {
    function BasePropertyDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillType(typeChecker, symbol);
    }
    BasePropertyDefinition.isProperty = function (symbol) {
        return (symbol.getFlags() & 4) !== 0;
    };
    return BasePropertyDefinition;
})();
exports.BasePropertyDefinition = BasePropertyDefinition;
utils_1.applyMixins(BasePropertyDefinition, [named_definition_1.NamedDefinition, typed_definition_1.TypedDefinition]);

//# sourceMappingURL=base-property-definition.js.map
