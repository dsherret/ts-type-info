function logError(name, innerError, logFunc) {
    if (logFunc === void 0) { logFunc = console.warn; }
    logFunc(getWarningMessage(name, innerError));
}
exports.logError = logError;
function getWarningMessage(name, innerError) {
    return getLine() + getSymbolMessage(name) + "\n\n" + getInnerErrorMessage(innerError) + "\n" + getLine() + "\n";
}
function getLine() {
    return "-----------------------------------------\n";
}
function getSymbolMessage(name) {
    if (name == null) {
        return "Unknown error. Object was null.";
    }
    else {
        return "Failed getting info from \"" + name + "\".";
    }
}
function getInnerErrorMessage(innerError) {
    return ("Detail: " + innerError.message + "\n\n") +
        ("Stack: " + innerError.stack);
}

//# sourceMappingURL=log-error.js.map
