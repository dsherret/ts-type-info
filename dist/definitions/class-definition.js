var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var ts = require("typescript");
var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var named_definition_1 = require("./base/named-definition");
var decorated_definition_1 = require("./base/decorated-definition");
var ClassDefinition = (function () {
    function ClassDefinition(typeChecker, symbol, _baseClasses) {
        this._baseClasses = _baseClasses;
        this._methods = [];
        this._properties = [];
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
    Object.defineProperty(ClassDefinition.prototype, "constructor", {
        get: function () {
            return this._constructor;
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
    Object.defineProperty(ClassDefinition.prototype, "typeParameter", {
        get: function () {
            return this._typeParameter;
        },
        enumerable: true,
        configurable: true
    });
    ClassDefinition.prototype.createMembers = function (typeChecker, symbol) {
        var _this = this;
        Object.keys(symbol.members).map(function (memberName) { return symbol.members[memberName]; }).forEach(function (member) {
            if (definitions_1.MethodDefinition.isClassMethod(member)) {
                _this._methods.push(new definitions_1.MethodDefinition(typeChecker, member));
            }
            else if (definitions_1.PropertyDefinition.isProperty(member)) {
                _this._properties.push(new definitions_1.PropertyDefinition(typeChecker, member));
            }
            else if ((member.getFlags() & 16384) != 0) {
                _this.verifyConstructorNotSet();
                _this._constructor = new definitions_1.ConstructorDefinition(typeChecker, member);
            }
            else if (definitions_1.TypeParameterDefinition.isTypeParameter(member)) {
                _this.verifyTypeParameterNotSet();
                _this._typeParameter = new definitions_1.TypeParameterDefinition(typeChecker, member);
            }
            else {
                throw "Not implemented '" + member.getName() + "'";
            }
        });
    };
    ClassDefinition.prototype.verifyConstructorNotSet = function () {
        if (this._constructor != null) {
            throw "Unknown error: Duplicate constructors on " + this.name + ".";
        }
    };
    ClassDefinition.prototype.verifyTypeParameterNotSet = function () {
        if (this._typeParameter != null) {
            throw "Unknown error: Duplicate type parameter on " + this.name;
        }
    };
    ClassDefinition.isClassDefinition = function (symbol) {
        return (symbol.flags & 32) !== 0;
    };
    Object.defineProperty(ClassDefinition.prototype, "baseClasses",
        __decorate([
            utils_1.Serializable
        ], ClassDefinition.prototype, "baseClasses", Object.getOwnPropertyDescriptor(ClassDefinition.prototype, "baseClasses")));
    Object.defineProperty(ClassDefinition.prototype, "constructor",
        __decorate([
            utils_1.Serializable
        ], ClassDefinition.prototype, "constructor", Object.getOwnPropertyDescriptor(ClassDefinition.prototype, "constructor")));
    Object.defineProperty(ClassDefinition.prototype, "methods",
        __decorate([
            utils_1.Serializable
        ], ClassDefinition.prototype, "methods", Object.getOwnPropertyDescriptor(ClassDefinition.prototype, "methods")));
    Object.defineProperty(ClassDefinition.prototype, "properties",
        __decorate([
            utils_1.Serializable
        ], ClassDefinition.prototype, "properties", Object.getOwnPropertyDescriptor(ClassDefinition.prototype, "properties")));
    Object.defineProperty(ClassDefinition.prototype, "typeParameter",
        __decorate([
            utils_1.Serializable
        ], ClassDefinition.prototype, "typeParameter", Object.getOwnPropertyDescriptor(ClassDefinition.prototype, "typeParameter")));
    return ClassDefinition;
})();
exports.ClassDefinition = ClassDefinition;
utils_1.applyMixins(ClassDefinition, [named_definition_1.NamedDefinition, decorated_definition_1.DecoratedDefinition]);
