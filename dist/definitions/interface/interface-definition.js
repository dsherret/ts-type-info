var ts = require("typescript");
var type_parameter_definition_1 = require("./../type-parameter-definition");
var utils_1 = require("./../../utils");
var base_1 = require("./../base");
var interface_method_definition_1 = require("./interface-method-definition");
var interface_new_signature_definition_1 = require("./interface-new-signature-definition");
var InterfaceDefinition = (function () {
    function InterfaceDefinition(typeChecker, symbol, _extends) {
        this._extends = _extends;
        this._methods = [];
        this._newSignatures = [];
        this._properties = [];
        this._typeParameters = [];
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }
    Object.defineProperty(InterfaceDefinition.prototype, "extends", {
        get: function () {
            return this._extends;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceDefinition.prototype, "methods", {
        get: function () {
            return this._methods;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceDefinition.prototype, "newSignatures", {
        get: function () {
            return this._newSignatures;
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
            else if (interface_method_definition_1.InterfaceMethodDefinition.isMethod(member)) {
                _this._methods.push(new interface_method_definition_1.InterfaceMethodDefinition(typeChecker, member));
            }
            else if (type_parameter_definition_1.TypeParameterDefinition.isTypeParameter(member)) {
                _this._typeParameters.push(new type_parameter_definition_1.TypeParameterDefinition(typeChecker, member));
            }
            else if (interface_new_signature_definition_1.InterfaceNewSignatureDefinition.isNewSignature(member)) {
                member.getDeclarations().forEach(function (d) {
                    _this._newSignatures.push(new interface_new_signature_definition_1.InterfaceNewSignatureDefinition(typeChecker, typeChecker.getSignatureFromDeclaration(d)));
                });
            }
            else {
                console.log(member);
                console.warn("Not implemented interface member: " + member.getName());
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
