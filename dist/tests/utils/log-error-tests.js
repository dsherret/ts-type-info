var utils_1 = require("./../../utils");
var assert = require("assert");
describe("logError", function () {
    var oldConsoleWarn = console.warn;
    var message;
    var logFunc = function (loggedMessage) { return message = loggedMessage; };
    it("should log the name", function () {
        utils_1.logError("MySymbolName", { message: "Message", stack: "Stack" }, logFunc);
        assert.equal(message, getMessage("Failed getting info from \"MySymbolName\".\n\nDetail: Message\n\nStack: Stack"));
    });
    it("should log that the name was null", function () {
        utils_1.logError(null, { message: "Message", stack: "Stack" }, logFunc);
        assert.equal(message, getMessage("Unknown error. Object was null.\n\nDetail: Message\n\nStack: Stack"));
    });
    console.warn = oldConsoleWarn;
});
function getMessage(msg) {
    return getLine() + msg + "\n" + getLine() + "\n";
}
function getLine() {
    return "-----------------------------------------\n";
}

//# sourceMappingURL=log-error-tests.js.map
