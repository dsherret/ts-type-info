var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scoped_definition_1 = require("./scoped-definition");
var utils_1 = require("./../../../utils");
var base_1 = require("./../../base");
var general_1 = require("./../../general");
var BaseClassPropertyDefinition = (function (_super) {
    __extends(BaseClassPropertyDefinition, _super);
    function BaseClassPropertyDefinition(typeChecker, symbol) {
        _super.call(this, typeChecker, symbol);
        this.fillDecorators(typeChecker, symbol);
        this.fillScope(symbol);
    }
    return BaseClassPropertyDefinition;
})(general_1.ObjectPropertyDefinition);
exports.BaseClassPropertyDefinition = BaseClassPropertyDefinition;
utils_1.applyMixins(BaseClassPropertyDefinition, [base_1.DecoratableDefinition, scoped_definition_1.ScopedDefinition]);

//# sourceMappingURL=base-class-property-definition.js.map
