var ts = require("typescript");
var utils_1 = require("./../../utils");
var function_1 = require("./../function");
var class_method_parameter_definition_1 = require("./class-method-parameter-definition");
var ConstructorDefinition = (function () {
    function ConstructorDefinition(typeChecker, symbol) {
        this.fillParametersBySymbol(class_method_parameter_definition_1.ClassMethodParameterDefinition, typeChecker, symbol);
    }
    ConstructorDefinition.isConstructor = function (symbol) {
        return (symbol.getFlags() & 16384) !== 0;
    };
    return ConstructorDefinition;
})();
exports.ConstructorDefinition = ConstructorDefinition;
utils_1.applyMixins(ConstructorDefinition, [function_1.ParameteredDefinition]);

//# sourceMappingURL=constructor-definition.js.map
