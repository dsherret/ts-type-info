var ts = require("typescript");
var base_1 = require("./../base");
var utils_1 = require("./../../utils");
var namespace_declaration_type_1 = require("./namespace-declaration-type");
var NamespaceDefinition = (function () {
    function NamespaceDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillIsAmbient(typeChecker, symbol);
        this.fillDeclarationType(typeChecker, symbol);
    }
    NamespaceDefinition.prototype.fillDeclarationType = function (typeChecker, symbol) {
        var nodeFlags = typeChecker.getDeclarationFromSymbol(symbol).flags;
        if (nodeFlags & 131072 /* Namespace */) {
            this.declarationType = namespace_declaration_type_1.NamespaceDeclarationType.Namespace;
        }
        else {
            this.declarationType = namespace_declaration_type_1.NamespaceDeclarationType.Module;
        }
    };
    return NamespaceDefinition;
})();
exports.NamespaceDefinition = NamespaceDefinition;
utils_1.applyMixins(NamespaceDefinition, [base_1.NamedDefinition, base_1.ExportableDefinition, base_1.ModuledDefinition, base_1.AmbientableDefinition]);

//# sourceMappingURL=namespace-definition.js.map
