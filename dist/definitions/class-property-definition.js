var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var decorated_definition_1 = require("./base/decorated-definition");
var scoped_definition_1 = require("./base/scoped-definition");
var ClassPropertyDefinition = (function (_super) {
    __extends(ClassPropertyDefinition, _super);
    function ClassPropertyDefinition(typeChecker, symbol) {
        _super.call(this, typeChecker, symbol);
        this.fillDecorators(symbol);
        this.fillScope(symbol);
    }
    return ClassPropertyDefinition;
})(definitions_1.PropertyDefinition);
exports.ClassPropertyDefinition = ClassPropertyDefinition;
utils_1.applyMixins(ClassPropertyDefinition, [decorated_definition_1.DecoratedDefinition, scoped_definition_1.ScopedDefinition]);
