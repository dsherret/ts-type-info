var ts = require("typescript");
var utils_1 = require("./../../utils");
var base_1 = require("./../base");
var variable_declaration_type_1 = require("./variable-declaration-type");
var VariableDefinition = (function () {
    function VariableDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillDefaultExpression(typeChecker, symbol);
        this.fillIsAmbient(typeChecker, symbol);
        this.fillDeclarationType(typeChecker, symbol);
    }
    VariableDefinition.prototype.fillDeclarationType = function (typeChecker, symbol) {
        var nodeFlags = typeChecker.getDeclarationFromSymbol(symbol).parent.flags;
        if (nodeFlags & 16384 /* Let */) {
            this.declarationType = variable_declaration_type_1.VariableDeclarationType.Let;
        }
        else if (nodeFlags & 32768 /* Const */) {
            this.declarationType = variable_declaration_type_1.VariableDeclarationType.Const;
        }
        else {
            this.declarationType = variable_declaration_type_1.VariableDeclarationType.Var;
        }
    };
    return VariableDefinition;
})();
exports.VariableDefinition = VariableDefinition;
utils_1.applyMixins(VariableDefinition, [base_1.NamedDefinition, base_1.ExportableDefinition, base_1.TypeExpressionedDefinition, base_1.DefaultExpressionedDefinition, base_1.AmbientableDefinition]);

//# sourceMappingURL=variable-definition.js.map
