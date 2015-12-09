var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var base_class_property_definition_1 = require("./base/base-class-property-definition");
var StaticPropertyDefinition = (function (_super) {
    __extends(StaticPropertyDefinition, _super);
    function StaticPropertyDefinition() {
        _super.apply(this, arguments);
    }
    StaticPropertyDefinition.isStaticProperty = function (symbol) {
        return (symbol.getFlags() & 4) !== 0;
    };
    return StaticPropertyDefinition;
})(base_class_property_definition_1.BaseClassPropertyDefinition);
exports.StaticPropertyDefinition = StaticPropertyDefinition;

//# sourceMappingURL=static-property-definition.js.map
