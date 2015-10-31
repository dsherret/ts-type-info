var ts = require("typescript");
var utils_1 = require("./../utils");
var named_definition_1 = require("./base/named-definition");
var decorated_definition_1 = require("./base/decorated-definition");
var scoped_definition_1 = require("./base/scoped-definition");
var typed_definition_1 = require("./base/typed-definition");
var PropertyDefinition = (function () {
    function PropertyDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillDecorators(symbol);
        this.fillScope(symbol);
        this.fillType(typeChecker, symbol);
    }
    PropertyDefinition.isProperty = function (symbol) {
        return (symbol.getFlags() & 4) !== 0;
    };
    return PropertyDefinition;
})();
exports.PropertyDefinition = PropertyDefinition;
utils_1.applyMixins(PropertyDefinition, [named_definition_1.NamedDefinition, decorated_definition_1.DecoratedDefinition, scoped_definition_1.ScopedDefinition, typed_definition_1.TypedDefinition]);
