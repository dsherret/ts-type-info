var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var base_function_definition_1 = require("./base/base-function-definition");
var FunctionDefinition = (function (_super) {
    __extends(FunctionDefinition, _super);
    function FunctionDefinition() {
        _super.apply(this, arguments);
    }
    FunctionDefinition.isClassMethod = function (symbol) {
        return (symbol.getFlags() & 8192) !== 0;
    };
    return FunctionDefinition;
})(base_function_definition_1.BaseFunctionDefinition);
exports.FunctionDefinition = FunctionDefinition;

//# sourceMappingURL=function-definition.js.map
