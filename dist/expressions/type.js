var ts = require("typescript");
var definitions_1 = require("./../definitions");
var Type = (function () {
    function Type(typeChecker, _tsType) {
        this._tsType = _tsType;
        this._text = typeChecker.typeToString(_tsType);
    }
    Type.prototype.fillTypeInformation = function (typeChecker, typeExpressionCache) {
        if (this.shouldGetAllInfo(typeChecker)) {
            this.fillCallSignatures(typeChecker);
            this.fillProperties(typeChecker);
        }
        else {
            this._properties = [];
            this._callSignatures = [];
        }
        this.fillTypeArguments(typeChecker, typeExpressionCache);
    };
    Type.prototype.fillDefinition = function (definition) {
        this._definition = definition;
    };
    Object.defineProperty(Type.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "properties", {
        get: function () {
            return this._properties;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "callSignatures", {
        get: function () {
            return this._callSignatures;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "typeArguments", {
        get: function () {
            return this._typeArguments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "tsType", {
        get: function () {
            return this._tsType;
        },
        enumerable: true,
        configurable: true
    });
    Type.prototype.shouldGetAllInfo = function (typeChecker) {
        // only get properties and call signature info for specific types
        return (this._tsType.flags & (1024 /* Class */ |
            2048 /* Interface */ |
            80896 /* ObjectType */ |
            131072 /* Instantiated */)) !== 0;
    };
    Type.prototype.fillProperties = function (typeChecker) {
        var properties = this._tsType.getProperties();
        this._properties = properties.map(function (property) { return new definitions_1.PropertyDefinition(typeChecker, property); });
    };
    Type.prototype.fillCallSignatures = function (typeChecker) {
        this._callSignatures = this._tsType.getCallSignatures()
            .map(function (callSignature) { return new definitions_1.CallSignatureDefinition(typeChecker, callSignature); });
    };
    Type.prototype.fillTypeArguments = function (typeChecker, typeCache) {
        var tsTypeArguments = this._tsType.typeArguments;
        var args = [];
        if (tsTypeArguments != null) {
            tsTypeArguments.forEach(function (arg) {
                args.push(typeCache.get(arg));
            });
        }
        this._typeArguments = args;
    };
    return Type;
})();
exports.Type = Type;

//# sourceMappingURL=type.js.map
