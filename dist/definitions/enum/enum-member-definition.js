var ts = require("typescript");
var utils_1 = require("./../../utils");
var base_1 = require("./../base");
var EnumMemberDefinition = (function () {
    function EnumMemberDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this._value = typeChecker.getConstantValue(symbol);
    }
    Object.defineProperty(EnumMemberDefinition.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    EnumMemberDefinition.isEnumMemberDefinition = function (symbol) {
        return (symbol.flags & 8) !== 0;
    };
    return EnumMemberDefinition;
})();
exports.EnumMemberDefinition = EnumMemberDefinition;
utils_1.applyMixins(EnumMemberDefinition, [base_1.NamedDefinition]);

//# sourceMappingURL=enum-member-definition.js.map
