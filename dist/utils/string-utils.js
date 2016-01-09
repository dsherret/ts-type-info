var StringUtils;
(function (StringUtils) {
    function ensureEndsWithNewline(code) {
        if (typeof code === "string" && code[code.length - 1] !== "\n") {
            code += "\n";
        }
        return code;
    }
    StringUtils.ensureEndsWithNewline = ensureEndsWithNewline;
})(/* istanbul ignore next */StringUtils = exports.StringUtils || (exports.StringUtils = {}));

//# sourceMappingURL=string-utils.js.map
