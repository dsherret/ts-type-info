var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var function_1 = require("./../function");
var InterfaceMethodDefinition = (function (_super) {
    __extends(InterfaceMethodDefinition, _super);
    function InterfaceMethodDefinition(typeChecker, symbol) {
        _super.call(this, function_1.ParameterDefinition, typeChecker, symbol);
    }
    return InterfaceMethodDefinition;
})(function_1.BaseFunctionDefinition);
exports.InterfaceMethodDefinition = InterfaceMethodDefinition;

//# sourceMappingURL=interface-method-definition.js.map
