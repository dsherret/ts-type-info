var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var ClassDefinition = (function (_super) {
    __extends(ClassDefinition, _super);
    function ClassDefinition(typeChecker, symbol, _baseClasses) {
        _super.call(this, symbol);
        this._baseClasses = _baseClasses;
        this._methods = [];
        this._properties = [];
        this.createMembers(typeChecker, symbol);
    }
    Object.defineProperty(ClassDefinition.prototype, "baseClasses", {
        get: function () {
            return this._baseClasses;
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
    ClassDefinition.prototype.createMembers = function (typeChecker, symbol) {
        for (var memberName in symbol.members) {
            if (definitions_1.MethodDefinition.isClassMethod(symbol.members[memberName])) {
                this._methods.push(new definitions_1.MethodDefinition(typeChecker, symbol.members[memberName]));
            }
            else if (definitions_1.PropertyDefinition.isProperty(symbol.members[memberName])) {
                this._properties.push(new definitions_1.PropertyDefinition(typeChecker, symbol.members[memberName]));
            }
            else if (memberName === "__constructor") {
                throw "Constructors are currently not supported. Class: " + this.name;
            }
            else {
                throw "Not implemented '" + memberName + "'";
            }
        }
    };
    ClassDefinition.isClassDefinition = function (symbol) {
        return (symbol.flags & 32) !== 0;
    };
    Object.defineProperty(ClassDefinition.prototype, "baseClasses",
        __decorate([
            utils_1.Serializable
        ], ClassDefinition.prototype, "baseClasses", Object.getOwnPropertyDescriptor(ClassDefinition.prototype, "baseClasses")));
    Object.defineProperty(ClassDefinition.prototype, "methods",
        __decorate([
            utils_1.Serializable
        ], ClassDefinition.prototype, "methods", Object.getOwnPropertyDescriptor(ClassDefinition.prototype, "methods")));
    Object.defineProperty(ClassDefinition.prototype, "properties",
        __decorate([
            utils_1.Serializable
        ], ClassDefinition.prototype, "properties", Object.getOwnPropertyDescriptor(ClassDefinition.prototype, "properties")));
    return ClassDefinition;
})(definitions_1.NamedDefinition);
exports.ClassDefinition = ClassDefinition;
