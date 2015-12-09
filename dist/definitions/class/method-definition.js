var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var base_method_definition_1 = require("./base/base-method-definition");
var MethodDefinition = (function (_super) {
    __extends(MethodDefinition, _super);
    function MethodDefinition() {
        _super.apply(this, arguments);
    }
    MethodDefinition.isClassMethod = function (symbol) {
        return (symbol.getFlags() & 8192) !== 0;
    };
    return MethodDefinition;
})(base_method_definition_1.BaseMethodDefinition);
exports.MethodDefinition = MethodDefinition;

//# sourceMappingURL=method-definition.js.map
