function __export(m) {
    for (var p in m) /* istanbul ignore else */ if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// this is a test file used in re-export-tests
__export(require("./test-class"));
__export(require("./test-enum"));

//# sourceMappingURL=re-export.js.map
