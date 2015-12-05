var utils_1 = require("./../utils");
var named_definition_1 = require("./base/named-definition");
var decorated_definition_1 = require("./base/decorated-definition");
var typed_definition_1 = require("./base/typed-definition");
var ParameterDefinition = (function () {
    function ParameterDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillDecorators(symbol);
        this.fillType(typeChecker, symbol);
        this.fillIsRequired(symbol);
    }
    Object.defineProperty(ParameterDefinition.prototype, "isRequired", {
        get: function () {
            return this._isRequired;
        },
        enumerable: true,
        configurable: true
    });
    ParameterDefinition.prototype.fillIsRequired = function (symbol) {
        var declaration = symbol.valueDeclaration;
        this._isRequired = declaration.questionToken == null && declaration.initializer == null;
    };
    return ParameterDefinition;
})();
exports.ParameterDefinition = ParameterDefinition;
utils_1.applyMixins(ParameterDefinition, [named_definition_1.NamedDefinition, decorated_definition_1.DecoratedDefinition, typed_definition_1.TypedDefinition]);

//# sourceMappingURL=parameter-definition.js.map
