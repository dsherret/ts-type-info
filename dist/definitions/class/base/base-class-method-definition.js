var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = require("./../../../utils");
var base_function_definition_1 = require("./../../function/base/base-function-definition");
var decorated_definition_1 = require("./../../base/decorated-definition");
var scoped_definition_1 = require("./../../base/scoped-definition");
var BaseMethodDefinition = (function (_super) {
    __extends(BaseMethodDefinition, _super);
    function BaseMethodDefinition(typeChecker, symbol) {
        _super.call(this, typeChecker, symbol);
        this.fillDecorators(symbol);
        this.fillScope(symbol);
    }
    return BaseMethodDefinition;
})(base_function_definition_1.BaseFunctionDefinition);
exports.BaseMethodDefinition = BaseMethodDefinition;
utils_1.applyMixins(BaseMethodDefinition, [decorated_definition_1.DecoratedDefinition, scoped_definition_1.ScopedDefinition]);

//# sourceMappingURL=base-class-method-definition.js.map
