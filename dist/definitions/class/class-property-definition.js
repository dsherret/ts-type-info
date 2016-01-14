var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var base_1 = require("./base");
var ClassPropertyDefinition = (function (_super) {
    __extends(ClassPropertyDefinition, _super);
    function ClassPropertyDefinition(typeChecker, symbol) {
        _super.call(this, typeChecker, symbol);
        this.fillAccessorInformation(symbol);
    }
    ClassPropertyDefinition.prototype.fillAccessorInformation = function (symbol) {
        var flags = symbol.getFlags();
        this.isAccessor = (flags & 32768 /* GetAccessor */) !== 0;
        this.isReadonly = this.isAccessor && (flags & 65536 /* SetAccessor */) === 0;
    };
    return ClassPropertyDefinition;
})(base_1.BaseClassPropertyDefinition);
exports.ClassPropertyDefinition = ClassPropertyDefinition;

//# sourceMappingURL=class-property-definition.js.map
