var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = require("./../../../utils");
var function_1 = require("./../../function");
var base_1 = require("./../../base");
var class_method_parameter_definition_1 = require("./../class-method-parameter-definition");
var BaseClassMethodDefinition = (function (_super) {
    __extends(BaseClassMethodDefinition, _super);
    function BaseClassMethodDefinition(typeChecker, symbol) {
        _super.call(this, class_method_parameter_definition_1.ClassMethodParameterDefinition, typeChecker, symbol);
        this.fillDecorators(symbol);
        this.fillScope(symbol);
    }
    return BaseClassMethodDefinition;
})(function_1.BaseFunctionDefinition);
exports.BaseClassMethodDefinition = BaseClassMethodDefinition;
utils_1.applyMixins(BaseClassMethodDefinition, [base_1.DecoratableDefinition, base_1.ScopedDefinition]);

//# sourceMappingURL=base-class-method-definition.js.map
