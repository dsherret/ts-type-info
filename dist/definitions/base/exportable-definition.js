var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var utils_1 = require("./../../utils");
var ExportableDefinition = (function () {
    function ExportableDefinition() {
    }
    ExportableDefinition.prototype.fillIsExported = function (typeChecker, symbol) {
        this._isExported = typeChecker.isSymbolExportOfFile(symbol, typeChecker.getSourceFileOfSymbol(symbol));
    };
    Object.defineProperty(ExportableDefinition.prototype, "isExported", {
        get: function () {
            return this._isExported;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        utils_1.Serializable
    ], ExportableDefinition.prototype, "isExported", null);
    return ExportableDefinition;
})();
exports.ExportableDefinition = ExportableDefinition;

//# sourceMappingURL=exportable-definition.js.map
