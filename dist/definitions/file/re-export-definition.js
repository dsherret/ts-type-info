var ReExportDefinition = (function () {
    function ReExportDefinition(_file, _definition) {
        this._file = _file;
        this._definition = _definition;
    }
    Object.defineProperty(ReExportDefinition.prototype, "file", {
        get: function () {
            return this._file;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReExportDefinition.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    return ReExportDefinition;
})();
exports.ReExportDefinition = ReExportDefinition;

//# sourceMappingURL=re-export-definition.js.map
