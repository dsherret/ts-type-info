var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ts = require("typescript");
var definitions_1 = require("./../../definitions");
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
        this.createMembers(typeChecker, symbol);
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
    ClassDefinition.prototype.createMembers = function (typeChecker, symbol) {
        var _this = this;
        this._typeParameters = [];
        Object.keys(symbol.members).map(function (memberName) { return symbol.members[memberName]; }).forEach(function (member) {
            if (definitions_1.ClassMethodDefinition.isClassMethod(member)) {
                _this._methods.push(new definitions_1.ClassMethodDefinition(typeChecker, member));
            }
            else if (definitions_1.ClassPropertyDefinition.isProperty(member)) {
                _this._properties.push(new definitions_1.ClassPropertyDefinition(typeChecker, member));
            }
            else if (definitions_1.ConstructorDefinition.isConstructor(member)) {
                _this.verifyConstructorNotSet();
                _this._constructorDef = new definitions_1.ConstructorDefinition(typeChecker, member);
            }
            else if (definitions_1.TypeParameterDefinition.isTypeParameter(member)) {
                _this._typeParameters.push(new definitions_1.TypeParameterDefinition(typeChecker, member));
            }
            else {
                console.warn("Not implemented '" + member.getName() + "'");
            }
        });
        Object.keys(symbol.exports).map(function (memberName) { return symbol.exports[memberName]; }).forEach(function (staticMember) {
            if (staticMember.getName() === "prototype") {
            }
            else if (definitions_1.StaticMethodDefinition.isStaticMethod(staticMember)) {
                _this._staticMethods.push(new definitions_1.StaticMethodDefinition(typeChecker, staticMember));
            }
            else if (definitions_1.StaticPropertyDefinition.isStaticProperty(staticMember)) {
                _this._staticProperties.push(new definitions_1.StaticPropertyDefinition(typeChecker, staticMember));
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
    __decorate([
        utils_1.Serializable
    ], ClassDefinition.prototype, "baseClasses", null);
    __decorate([
        utils_1.Serializable
    ], ClassDefinition.prototype, "constructorDef", null);
    __decorate([
        utils_1.Serializable
    ], ClassDefinition.prototype, "methods", null);
    __decorate([
        utils_1.Serializable
    ], ClassDefinition.prototype, "properties", null);
    __decorate([
        utils_1.Serializable
    ], ClassDefinition.prototype, "staticMethods", null);
    __decorate([
        utils_1.Serializable
    ], ClassDefinition.prototype, "staticProperties", null);
    __decorate([
        utils_1.Serializable
    ], ClassDefinition.prototype, "typeParameters", null);
    return ClassDefinition;
})();
exports.ClassDefinition = ClassDefinition;
utils_1.applyMixins(ClassDefinition, [base_1.NamedDefinition, base_1.DecoratableDefinition]);

//# sourceMappingURL=class-definition.js.map
