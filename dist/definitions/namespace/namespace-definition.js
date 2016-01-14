var base_1 = require("./../base");
var utils_1 = require("./../../utils");
var NamespaceDefinition = (function () {
    function NamespaceDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
    }
    return NamespaceDefinition;
})();
exports.NamespaceDefinition = NamespaceDefinition;
utils_1.applyMixins(NamespaceDefinition, [base_1.NamedDefinition, base_1.ExportableDefinition, base_1.ModuledDefinition]);

//# sourceMappingURL=namespace-definition.js.map
