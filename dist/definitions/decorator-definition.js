var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
            throw "Unhandled: The decorator expression was null";
        }
    };
    DecoratorDefinition.prototype.fillArguments = function (args) {
        for (var _i = 0; _i < args.length; _i++) {
            var arg = args[_i];
            this._arguments.push(new definitions_1.ArgumentDefinition(arg));
        }
    };
    __decorate([
        utils_1.Serializable
    ], DecoratorDefinition.prototype, "name", null);
    __decorate([
        utils_1.Serializable
    ], DecoratorDefinition.prototype, "arguments", null);
    return DecoratorDefinition;
})();
exports.DecoratorDefinition = DecoratorDefinition;

//# sourceMappingURL=decorator-definition.js.map
