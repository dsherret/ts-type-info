var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var definitions_1 = require("./../definitions");
var ParameterDefinition = (function (_super) {
    __extends(ParameterDefinition, _super);
    function ParameterDefinition(typeChecker, paramSymbol) {
        _super.call(this, typeChecker, paramSymbol);
    }
    return ParameterDefinition;
})(definitions_1.TypedDefinition);
exports.ParameterDefinition = ParameterDefinition;

//# sourceMappingURL=parameter-definition.js.map
