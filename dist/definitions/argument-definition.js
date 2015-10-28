var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var utils_1 = require("./../utils");
var ArgumentDefinition = (function () {
    function ArgumentDefinition(arg) {
        this.isSupported(arg);
        this.fillName(arg);
    }
    Object.defineProperty(ArgumentDefinition.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    ArgumentDefinition.prototype.fillName = function (arg) {
        this._text = arg.text;
    };
    ArgumentDefinition.prototype.isSupported = function (arg) {
        if (arg["expression"] != null) {
            throw "Only string arguments are currently supported.";
        }
    };
    Object.defineProperty(ArgumentDefinition.prototype, "text",
        __decorate([
            utils_1.Serializable
        ], ArgumentDefinition.prototype, "text", Object.getOwnPropertyDescriptor(ArgumentDefinition.prototype, "text")));
    return ArgumentDefinition;
})();
exports.ArgumentDefinition = ArgumentDefinition;
