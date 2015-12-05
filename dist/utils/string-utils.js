var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.ensureEndsWithNewline = function (code) {
        if (typeof code === "string" && code[code.length - 1] !== "\n") {
            code += "\n";
        }
        return code;
    };
    return StringUtils;
})();
exports.StringUtils = StringUtils;
