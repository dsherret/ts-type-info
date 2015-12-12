var ArgumentDefinition = (function () {
    function ArgumentDefinition(arg) {
        this.fillName(arg);
        this.isSupported(arg);
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
    return ArgumentDefinition;
})();
exports.ArgumentDefinition = ArgumentDefinition;

//# sourceMappingURL=argument-definition.js.map
