var ts = require("typescript");
var definitions_1 = require("./../definitions");
var Type = (function () {
    function Type(typeChecker, _tsType) {
        this._tsType = _tsType;
        this._name = typeChecker.typeToString(_tsType);
    }
    Type.prototype.fillTypeInformation = function (typeChecker) {
        if (this.shouldGetAllInfo(typeChecker)) {
            this.fillCallSignatures(typeChecker);
            this.fillProperties(typeChecker);
        }
        else {
            this._properties = [];
            this._callSignatures = [];
        }
    };
    Object.defineProperty(Type.prototype, "name", {
        get: function () {
            return this._name;
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
    Object.defineProperty(Type.prototype, "tsType", {
        get: function () {
            return this._tsType;
        },
        enumerable: true,
        configurable: true
    });
    Type.prototype.shouldGetAllInfo = function (typeChecker) {
        return (this._tsType.flags & (1024 |
            2048 |
            80896 |
            131072)) !== 0;
    };
    Type.prototype.fillProperties = function (typeChecker) {
        var properties = this._tsType.getProperties();
        this._properties = properties.map(function (property) { return new definitions_1.PropertyDefinition(typeChecker, property); });
    };
    Type.prototype.fillCallSignatures = function (typeChecker) {
        this._callSignatures = this._tsType.getCallSignatures()
            .map(function (callSignature) { return new definitions_1.CallSignatureDefinition(typeChecker, callSignature); });
    };
    return Type;
})();
exports.Type = Type;

//# sourceMappingURL=type.js.map
