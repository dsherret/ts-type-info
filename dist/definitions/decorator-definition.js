var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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
    Object.defineProperty(DecoratorDefinition.prototype, "name",
        __decorate([
            utils_1.Serializable
        ], DecoratorDefinition.prototype, "name", Object.getOwnPropertyDescriptor(DecoratorDefinition.prototype, "name")));
    Object.defineProperty(DecoratorDefinition.prototype, "arguments",
        __decorate([
            utils_1.Serializable
        ], DecoratorDefinition.prototype, "arguments", Object.getOwnPropertyDescriptor(DecoratorDefinition.prototype, "arguments")));
    return DecoratorDefinition;
})();
exports.DecoratorDefinition = DecoratorDefinition;
