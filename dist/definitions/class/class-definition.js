var constructor_definition_1 = require("./constructor-definition");
var class_method_definition_1 = require("./class-method-definition");
var class_property_definition_1 = require("./class-property-definition");
var class_static_method_definition_1 = require("./class-static-method-definition");
var class_static_property_definition_1 = require("./class-static-property-definition");
var utils_1 = require("./../../utils");
var base_1 = require("./../base");
var ClassDefinition = (function () {
    function ClassDefinition(typeChecker, symbol, _extends, _implements) {
        this._extends = _extends;
        this._implements = _implements;
        this._methods = [];
        this._properties = [];
        this._staticMethods = [];
        this._staticProperties = [];
        this._typeParameters = [];
        this.fillName(symbol);
        this.fillDecorators(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
        this.fillIsExported(typeChecker, symbol);
    }
    Object.defineProperty(ClassDefinition.prototype, "extends", {
        get: function () {
            return this._extends;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDefinition.prototype, "implements", {
        get: function () {
            return this._implements;
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
            /* istanbul ignore else */
            if (typeChecker.isSymbolClassProperty(member)) {
                _this._properties.push(new class_property_definition_1.ClassPropertyDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolClassMethod(member)) {
                _this._methods.push(new class_method_definition_1.ClassMethodDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolConstructor(member)) {
                _this.verifyConstructorNotSet();
                _this._constructorDef = new constructor_definition_1.ConstructorDefinition(typeChecker, member);
            }
            else if (typeChecker.isSymbolTypeParameter(member)) {
                // todo: maybe make this work like how it does in call signature definition and function? (use method in TypeParameteredDefinition?)
                _this._typeParameters.push(new base_1.TypeParameterDefinition(typeChecker, member));
            }
            else {
                console.warn("Not implemented member: " + member.getName());
            }
        });
        Object.keys(symbol.exports).map(function (memberName) { return symbol.exports[memberName]; }).forEach(function (staticMember) {
            /* istanbul ignore else */
            if (staticMember.getName() === "prototype") {
            }
            else if (typeChecker.isSymbolStaticMethod(staticMember)) {
                _this._staticMethods.push(new class_static_method_definition_1.ClassStaticMethodDefinition(typeChecker, staticMember));
            }
            else if (typeChecker.isSymbolStaticProperty(staticMember)) {
                _this._staticProperties.push(new class_static_property_definition_1.ClassStaticPropertyDefinition(typeChecker, staticMember));
            }
            else {
                console.warn("Not implemented static member: " + staticMember.getName());
            }
        });
    };
    ClassDefinition.prototype.verifyConstructorNotSet = function () {
        /* istanbul ignore if */
        if (this._constructorDef != null) {
            throw "Unknown error: Duplicate constructors on " + this.name + ".";
        }
    };
    return ClassDefinition;
})();
exports.ClassDefinition = ClassDefinition;
utils_1.applyMixins(ClassDefinition, [base_1.NamedDefinition, base_1.DecoratableDefinition, base_1.ExportableDefinition, base_1.TypeParameteredDefinition]);

//# sourceMappingURL=class-definition.js.map
