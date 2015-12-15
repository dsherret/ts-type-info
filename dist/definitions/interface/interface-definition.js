var ts = require("typescript");
var utils_1 = require("./../../utils");
var base_1 = require("./../base");
var InterfaceDefinition = (function () {
    function InterfaceDefinition(typeChecker, symbol, _baseInterfaces) {
        this._baseInterfaces = _baseInterfaces;
        this._properties = [];
        this._typeParameters = [];
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }
    Object.defineProperty(InterfaceDefinition.prototype, "baseInterfaces", {
        get: function () {
            return this._baseInterfaces;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceDefinition.prototype, "properties", {
        get: function () {
            return this._properties;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceDefinition.prototype, "typeParameters", {
        get: function () {
            return this._typeParameters;
        },
        enumerable: true,
        configurable: true
    });
    InterfaceDefinition.prototype.fillMembers = function (typeChecker, symbol) {
        var _this = this;
        this._typeParameters = [];
        Object.keys(symbol.members).map(function (memberName) { return symbol.members[memberName]; }).forEach(function (member) {
            if (base_1.PropertyDefinition.isProperty(member)) {
                _this._properties.push(new base_1.PropertyDefinition(typeChecker, member));
            }
            else {
                console.warn("Not implemented '" + member.getName() + "'");
            }
        });
    };
    InterfaceDefinition.isInterfaceDefinition = function (symbol) {
        return (symbol.flags & 64) !== 0;
    };
    return InterfaceDefinition;
})();
exports.InterfaceDefinition = InterfaceDefinition;
utils_1.applyMixins(InterfaceDefinition, [base_1.NamedDefinition, base_1.ExportableDefinition]);

//# sourceMappingURL=interface-definition.js.map
