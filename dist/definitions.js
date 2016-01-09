function __export(m) {
    for (var p in m) /* istanbul ignore else */ if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// order by dependency and not name
__export(require("./definitions/misc"));
__export(require("./definitions/base"));
__export(require("./definitions/function"));
__export(require("./definitions/class"));
__export(require("./definitions/enum"));
__export(require("./definitions/interface"));
__export(require("./definitions/file"));

//# sourceMappingURL=definitions.js.map
