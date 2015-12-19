var ImportDefinition = (function () {
    function ImportDefinition(_file, _definition) {
        this._file = _file;
        this._definition = _definition;
    }
    Object.defineProperty(ImportDefinition.prototype, "file", {
        get: function () {
            return this._file;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImportDefinition.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    return ImportDefinition;
})();
exports.ImportDefinition = ImportDefinition;

//# sourceMappingURL=import-definition.js.map
