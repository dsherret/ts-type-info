var expressions_1 = require("./../../expressions");
var utils_1 = require("./../../utils");
var DecoratorDefinition = (function () {
    function DecoratorDefinition(typeChecker, decorator) {
        this.arguments = [];
        var decoratorExpression = decorator.expression;
        this.fillName(decoratorExpression);
        if (utils_1.TypeGuards.isCallExpression(decoratorExpression)) {
            this.fillArguments(typeChecker, decoratorExpression.arguments);
        }
    }
    DecoratorDefinition.prototype.fillName = function (decoratorExpression) {
        /* istanbul ignore else */
        if (utils_1.TypeGuards.isLiteralExpression(decoratorExpression)) {
            this.name = decoratorExpression.text;
        }
        else if (decoratorExpression != null) {
            this.fillName(decoratorExpression["expression"]);
        }
        else {
            console.warn("Unhandled: The decorator expression was null");
        }
    };
    DecoratorDefinition.prototype.fillArguments = function (typeChecker, args) {
        for (var _i = 0; _i < args.length; _i++) {
            var arg = args[_i];
            this.arguments.push(new expressions_1.Expression(typeChecker, arg));
        }
    };
    return DecoratorDefinition;
})();
exports.DecoratorDefinition = DecoratorDefinition;

//# sourceMappingURL=decorator-definition.js.map
