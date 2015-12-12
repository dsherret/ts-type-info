var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var base_1 = require("./base");
var StaticMethodDefinition = (function (_super) {
    __extends(StaticMethodDefinition, _super);
    function StaticMethodDefinition() {
        _super.apply(this, arguments);
    }
    StaticMethodDefinition.isStaticMethod = function (symbol) {
        var flags = symbol.getFlags();
        return (flags & 8192) !== 0 ||
            (flags & 16);
    };
    return StaticMethodDefinition;
})(base_1.BaseClassMethodDefinition);
exports.StaticMethodDefinition = StaticMethodDefinition;

//# sourceMappingURL=static-method-definition.js.map
