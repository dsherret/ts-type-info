var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require("./base");
var parameter_definition_1 = require("./parameter-definition");
var base_2 = require("./../base");
var utils_1 = require("./../../utils");
var FunctionDefinition = (function (_super) {
    __extends(FunctionDefinition, _super);
    function FunctionDefinition(typeChecker, symbol) {
        _super.call(this, parameter_definition_1.ParameterDefinition, typeChecker, symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillIsAmbient(typeChecker, symbol);
    }
    return FunctionDefinition;
})(base_1.BaseFunctionDefinition);
exports.FunctionDefinition = FunctionDefinition;
utils_1.applyMixins(FunctionDefinition, [base_2.ExportableDefinition, base_2.AmbientableDefinition]);

//# sourceMappingURL=function-definition.js.map
