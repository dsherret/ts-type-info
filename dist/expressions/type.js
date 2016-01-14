var ts = require("typescript");
var definitions_1 = require("./../definitions");
var Type = (function () {
    function Type() {
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
        return (tsType.flags & (1024 /* Class */ |
            2048 /* Interface */ |
            80896 /* ObjectType */ |
            131072 /* Instantiated */)) !== 0;
    };
    Type.prototype.fillProperties = function (typeChecker, tsType) {
        var properties = tsType.getProperties();
        this.properties = properties.map(function (property) { return new definitions_1.PropertyDefinition(typeChecker, property); });
    };
    Type.prototype.fillCallSignatures = function (typeChecker, tsType) {
        this.callSignatures = tsType.getCallSignatures()
            .map(function (callSignature) { return new definitions_1.CallSignatureDefinition(typeChecker, callSignature); });
    };
    Type.prototype.fillTypeArguments = function (typeChecker, typeCache, tsType) {
        var tsTypeArguments = tsType.typeArguments;
        var args = [];
        if (tsTypeArguments != null) {
            tsTypeArguments.forEach(function (arg) {
                args.push(typeCache.get(arg));
            });
        }
        this.typeArguments = args;
    };
    return Type;
})();
exports.Type = Type;

//# sourceMappingURL=type.js.map
