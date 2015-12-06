var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = require("./../../utils");
var base_property_definition_1 = require("./base-property-definition");
var decorated_definition_1 = require("./decorated-definition");
var scoped_definition_1 = require("./scoped-definition");
var BaseClassPropertyDefinition = (function (_super) {
    __extends(BaseClassPropertyDefinition, _super);
    function BaseClassPropertyDefinition(typeChecker, symbol) {
        _super.call(this, typeChecker, symbol);
        this.fillDecorators(symbol);
        this.fillScope(symbol);
    }
    return BaseClassPropertyDefinition;
})(base_property_definition_1.BasePropertyDefinition);
exports.BaseClassPropertyDefinition = BaseClassPropertyDefinition;
utils_1.applyMixins(BaseClassPropertyDefinition, [decorated_definition_1.DecoratedDefinition, scoped_definition_1.ScopedDefinition]);

//# sourceMappingURL=base-class-property-definition.js.map
