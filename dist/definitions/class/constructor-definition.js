var ts = require("typescript");
var utils_1 = require("./../../utils");
var parametered_definition_1 = require("./../function/base/parametered-definition");
var ConstructorDefinition = (function () {
    function ConstructorDefinition(typeChecker, symbol) {
        this.fillParametersBySymbol(typeChecker, symbol);
    }
    ConstructorDefinition.isConstructor = function (symbol) {
        return (symbol.getFlags() & 16384) !== 0;
    };
    return ConstructorDefinition;
})();
exports.ConstructorDefinition = ConstructorDefinition;
utils_1.applyMixins(ConstructorDefinition, [parametered_definition_1.ParameteredDefinition]);

//# sourceMappingURL=constructor-definition.js.map
