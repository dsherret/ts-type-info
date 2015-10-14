var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var definitions_1 = require("./../definitions");
var PropertyDefinition = (function (_super) {
    __extends(PropertyDefinition, _super);
    function PropertyDefinition(typeChecker, symbol) {
        _super.call(this, typeChecker, symbol);
    }
    PropertyDefinition.isProperty = function (symbol) {
        return (symbol.getFlags() & 4) !== 0;
    };
    return PropertyDefinition;
})(definitions_1.TypedDefinition);
exports.PropertyDefinition = PropertyDefinition;

//# sourceMappingURL=property-definition.js.map
