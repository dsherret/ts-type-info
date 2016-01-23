var utils_1 = require("./../../utils");
var TypeExpressionedDefinition = (function () {
    /* istanbul ignore next */ function TypeExpressionedDefinition() {
    }
    TypeExpressionedDefinition.prototype.fillTypeExpression = function (typeChecker, symbol) {
        var _this = this;
        utils_1.tryGet(symbol, function () { return typeChecker.getTypeExpressionOfSymbol(symbol); }, function (expression) {
            _this.typeExpression = expression;
        });
    };
    return TypeExpressionedDefinition;
})();
exports.TypeExpressionedDefinition = TypeExpressionedDefinition;

//# sourceMappingURL=type-expressioned-definition.js.map
