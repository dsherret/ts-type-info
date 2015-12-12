var ts = require("typescript");
var constructor_definition_1 = require("./constructor-definition");
var class_method_definition_1 = require("./class-method-definition");
var class_property_definition_1 = require("./class-property-definition");
var static_method_definition_1 = require("./static-method-definition");
var static_property_definition_1 = require("./static-property-definition");
var type_parameter_definition_1 = require("./../type-parameter-definition");
var utils_1 = require("./../../utils");
var base_1 = require("./../base");
var ClassDefinition = (function () {
    function ClassDefinition(typeChecker, symbol, _baseClasses) {
        this._baseClasses = _baseClasses;
        this._methods = [];
        this._properties = [];
        this._staticMethods = [];
        this._staticProperties = [];
        this._typeParameters = [];
        this.fillName(symbol);
        this.fillDecorators(symbol);
        this.fillMembers(typeChecker, symbol);
        this.fillIsExported(typeChecker, symbol);
    }
    Object.defineProperty(ClassDefinition.prototype, "baseClasses", {
        get: function () {
            return this._baseClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDefinition.prototype, "constructorDef", {
        get: function () {
            return this._constructorDef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDefinition.prototype, "methods", {
        get: function () {
            return this._methods;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDefinition.prototype, "properties", {
        get: function () {
            return this._properties;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDefinition.prototype, "staticMethods", {
        get: function () {
            return this._staticMethods;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDefinition.prototype, "staticProperties", {
        get: function () {
            return this._staticProperties;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDefinition.prototype, "typeParameters", {
        get: function () {
            return this._typeParameters;
        },
        enumerable: true,
        configurable: true
    });
    ClassDefinition.prototype.fillMembers = function (typeChecker, symbol) {
        var _this = this;
        this._typeParameters = [];
        Object.keys(symbol.members).map(function (memberName) { return symbol.members[memberName]; }).forEach(function (member) {
            if (class_method_definition_1.ClassMethodDefinition.isClassMethod(member)) {
                _this._methods.push(new class_method_definition_1.ClassMethodDefinition(typeChecker, member));
            }
            else if (class_property_definition_1.ClassPropertyDefinition.isProperty(member)) {
                _this._properties.push(new class_property_definition_1.ClassPropertyDefinition(typeChecker, member));
            }
            else if (constructor_definition_1.ConstructorDefinition.isConstructor(member)) {
                _this.verifyConstructorNotSet();
                _this._constructorDef = new constructor_definition_1.ConstructorDefinition(typeChecker, member);
            }
            else if (type_parameter_definition_1.TypeParameterDefinition.isTypeParameter(member)) {
                _this._typeParameters.push(new type_parameter_definition_1.TypeParameterDefinition(typeChecker, member));
            }
            else {
                console.warn("Not implemented '" + member.getName() + "'");
            }
        });
        Object.keys(symbol.exports).map(function (memberName) { return symbol.exports[memberName]; }).forEach(function (staticMember) {
            if (staticMember.getName() === "prototype") {
            }
            else if (static_method_definition_1.StaticMethodDefinition.isStaticMethod(staticMember)) {
                _this._staticMethods.push(new static_method_definition_1.StaticMethodDefinition(typeChecker, staticMember));
            }
            else if (static_property_definition_1.StaticPropertyDefinition.isStaticProperty(staticMember)) {
                _this._staticProperties.push(new static_property_definition_1.StaticPropertyDefinition(typeChecker, staticMember));
            }
            else {
                console.warn("Not implemented '" + staticMember.getName() + "'");
            }
        });
    };
    ClassDefinition.prototype.verifyConstructorNotSet = function () {
        if (this._constructorDef != null) {
            throw "Unknown error: Duplicate constructors on " + this.name + ".";
        }
    };
    ClassDefinition.isClassDefinition = function (symbol) {
        return (symbol.flags & 32) !== 0;
    };
    return ClassDefinition;
})();
exports.ClassDefinition = ClassDefinition;
utils_1.applyMixins(ClassDefinition, [base_1.NamedDefinition, base_1.DecoratableDefinition, base_1.ExportableDefinition]);

//# sourceMappingURL=class-definition.js.map
