var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var DecoratorDefinition = (function () {
    function DecoratorDefinition(decorator) {
        this._arguments = [];
        var decoratorExpression = decorator.expression;
        this.fillName(decoratorExpression);
        if (utils_1.TypeGuards.isCallExpression(decoratorExpression)) {
            this.fillArguments(decoratorExpression.arguments);
        }
    }
    Object.defineProperty(DecoratorDefinition.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecoratorDefinition.prototype, "arguments", {
        get: function () {
            return this._arguments;
        },
        enumerable: true,
        configurable: true
    });
    DecoratorDefinition.prototype.fillName = function (decoratorExpression) {
        if (utils_1.TypeGuards.isLiteralExpression(decoratorExpression)) {
            this._name = decoratorExpression.text;
        }
        else if (decoratorExpression != null) {
            this.fillName(decoratorExpression["expression"]);
        }
        else {
            console.warn("Unhandled: The decorator expression was null");
        }
    };
    DecoratorDefinition.prototype.fillArguments = function (args) {
        for (var _i = 0; _i < args.length; _i++) {
            var arg = args[_i];
            this._arguments.push(new definitions_1.ArgumentDefinition(arg));
        }
    };
    return DecoratorDefinition;
})();
exports.DecoratorDefinition = DecoratorDefinition;

//# sourceMappingURL=decorator-definition.js.map
