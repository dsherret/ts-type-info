var ts = require("typescript");
var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var Type = (function () {
    /* istanbul ignore next */ function Type() {
    }
    Type.prototype.fillTypeInformation = function (typeChecker, typeExpressionCache, tsType) {
        this.text = typeChecker.typeToString(tsType);
        if (this.shouldGetAllInfo(typeChecker, tsType)) {
            this.fillCallSignatures(typeChecker, tsType);
            this.fillProperties(typeChecker, tsType);
        }
        else {
            this.properties = [];
            this.callSignatures = [];
        }
        this.fillTypeArguments(typeChecker, typeExpressionCache, tsType);
    };
    Type.prototype.fillDefinition = function (definition) {
        this.definition = definition;
    };
    Type.prototype.shouldGetAllInfo = function (typeChecker, tsType) {
        // only get properties and call signature info for specific types
        return (tsType.flags & (80896 /* ObjectType */ |
            131072 /* Instantiated */)) !== 0 &&
            (tsType.flags & (1024 /* Class */ |
                2048 /* Interface */)) === 0;
    };
    Type.prototype.fillProperties = function (typeChecker, tsType) {
        var _this = this;
        var properties = tsType.getProperties();
        this.properties = [];
        properties.filter(function (p) { return p.name !== "prototype"; }).forEach(function (property) {
            utils_1.tryGet(property, function () { return new definitions_1.BasePropertyDefinition(typeChecker, property); }, function (def) { return _this.properties.push(def); });
        });
    };
    Type.prototype.fillCallSignatures = function (typeChecker, tsType) {
        var _this = this;
        this.callSignatures = [];
        tsType.getCallSignatures().forEach(function (callSignature) {
            utils_1.tryGet(_this.text, function () { return new definitions_1.CallSignatureDefinition(typeChecker, callSignature); }, function (def) {
                _this.callSignatures.push(def);
            });
        });
    };
    Type.prototype.fillTypeArguments = function (typeChecker, typeExpressionCache, tsType) {
        var _this = this;
        var tsTypeArguments = tsType.typeArguments;
        var args = [];
        if (tsTypeArguments != null) {
            tsTypeArguments.forEach(function (arg) {
                utils_1.tryGet(_this.text, function () { return typeExpressionCache.get(arg); }, function (typeExpression) { return args.push(typeExpression); });
            });
        }
        this.typeArguments = args;
    };
    return Type;
})();
exports.Type = Type;

//# sourceMappingURL=type.js.map
