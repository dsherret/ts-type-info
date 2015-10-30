var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var typed_definition_1 = require("./typed-definition");
var scope_definition_1 = require("./base/scope-definition");
var utils_1 = require("./../utils");
var PropertyDefinition = (function (_super) {
    __extends(PropertyDefinition, _super);
    function PropertyDefinition(typeChecker, symbol) {
        _super.call(this, typeChecker, symbol);
        this.initializeScopeDefinition(symbol);
    }
    PropertyDefinition.isProperty = function (symbol) {
        return (symbol.getFlags() & 4) !== 0;
    };
    return PropertyDefinition;
})(typed_definition_1.TypedDefinition);
exports.PropertyDefinition = PropertyDefinition;
utils_1.applyMixins(PropertyDefinition, [scope_definition_1.ScopeDefinition]);
