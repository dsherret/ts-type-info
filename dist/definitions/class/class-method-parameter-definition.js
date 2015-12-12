var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = require("./../../utils");
var base_1 = require("./../base");
var function_1 = require("./../function");
var ClassMethodParameterDefinition = (function (_super) {
    __extends(ClassMethodParameterDefinition, _super);
    function ClassMethodParameterDefinition(typeChecker, symbol) {
        _super.call(this, typeChecker, symbol);
        this.fillDecorators(symbol);
    }
    return ClassMethodParameterDefinition;
})(function_1.BaseParameterDefinition);
exports.ClassMethodParameterDefinition = ClassMethodParameterDefinition;
utils_1.applyMixins(ClassMethodParameterDefinition, [base_1.DecoratableDefinition]);

//# sourceMappingURL=class-method-parameter-definition.js.map
