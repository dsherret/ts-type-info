var ts = require("typescript");
var utils_1 = require("./../utils");
var decorated_definition_1 = require("./base/decorated-definition");
var named_definition_1 = require("./base/named-definition");
var parametered_definition_1 = require("./base/parametered-definition");
var return_typed_definition_1 = require("./base/return-typed-definition");
var scoped_definition_1 = require("./base/scoped-definition");
var MethodDefinition = (function () {
    function MethodDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillDecorators(symbol);
        this.fillScope(symbol);
        this.fillParametersBySymbol(typeChecker, symbol);
        this.fillReturnTypeBySymbol(typeChecker, symbol);
    }
    MethodDefinition.isClassMethod = function (symbol) {
        return (symbol.getFlags() & 8192) !== 0;
    };
    return MethodDefinition;
})();
exports.MethodDefinition = MethodDefinition;
utils_1.applyMixins(MethodDefinition, [named_definition_1.NamedDefinition, decorated_definition_1.DecoratedDefinition, parametered_definition_1.ParameteredDefinition, return_typed_definition_1.ReturnTypedDefinition, scoped_definition_1.ScopedDefinition]);
