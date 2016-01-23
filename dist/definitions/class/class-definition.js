var ts = require("typescript");
var constructor_definition_1 = require("./constructor-definition");
var class_method_definition_1 = require("./class-method-definition");
var class_property_definition_1 = require("./class-property-definition");
var class_static_method_definition_1 = require("./class-static-method-definition");
var class_static_property_definition_1 = require("./class-static-property-definition");
var utils_1 = require("./../../utils");
var base_1 = require("./../base");
var general_1 = require("./../general");
var ClassDefinition = (function () {
    function ClassDefinition(typeChecker, symbol, extendsTypeExpressions, implementsTypeExpressions) {
        this.extendsTypeExpressions = extendsTypeExpressions;
        this.implementsTypeExpressions = implementsTypeExpressions;
        this.methods = [];
        this.properties = [];
        this.staticMethods = [];
        this.staticProperties = [];
        this.typeParameters = [];
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillDecorators(typeChecker, symbol);
        this.fillIsAbstract(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }
    ClassDefinition.prototype.fillIsAbstract = function (typeChecker, symbol) {
        var nodeFlags = typeChecker.getDeclarationFromSymbol(symbol).flags;
        this.isAbstract = (nodeFlags & 256 /* Abstract */) === 256 /* Abstract */;
    };
    ClassDefinition.prototype.fillMembers = function (typeChecker, symbol) {
        var _this = this;
        this.typeParameters = [];
        Object.keys(symbol.members).map(function (memberName) { return symbol.members[memberName]; }).forEach(function (member) {
            /* istanbul ignore else */
            if (typeChecker.isSymbolClassProperty(member)) {
                _this.properties.push(new class_property_definition_1.ClassPropertyDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolClassMethod(member)) {
                _this.methods.push(new class_method_definition_1.ClassMethodDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolConstructor(member)) {
                _this.verifyConstructorNotSet();
                _this.constructorDef = new constructor_definition_1.ConstructorDefinition(typeChecker, member);
            }
            else if (typeChecker.isSymbolTypeParameter(member)) {
                // todo: maybe make this work like how it does in call signature definition and function? (use method in TypeParameteredDefinition?)
                _this.typeParameters.push(new general_1.TypeParameterDefinition(typeChecker, member));
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
                _this.staticMethods.push(new class_static_method_definition_1.ClassStaticMethodDefinition(typeChecker, staticMember));
            }
            else if (typeChecker.isSymbolStaticProperty(staticMember)) {
                _this.staticProperties.push(new class_static_property_definition_1.ClassStaticPropertyDefinition(typeChecker, staticMember));
            }
            else {
                console.warn("Not implemented static member: " + staticMember.getName());
            }
        });
    };
    ClassDefinition.prototype.verifyConstructorNotSet = function () {
        /* istanbul ignore if */
        if (this.constructorDef != null) {
            throw "Unknown error: Duplicate constructors on " + this.name + ".";
        }
    };
    return ClassDefinition;
})();
exports.ClassDefinition = ClassDefinition;
utils_1.applyMixins(ClassDefinition, [base_1.NamedDefinition, base_1.DecoratableDefinition, base_1.ExportableDefinition, base_1.TypeParameteredDefinition]);

//# sourceMappingURL=class-definition.js.map
