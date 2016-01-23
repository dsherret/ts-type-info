var log_error_1 = require("./log-error");
/* istanbul ignore next */
function tryGet(objOrString, attemptToGet, onSuccess) {
    var def;
    try {
        def = attemptToGet();
    }
    catch (ex) {
        if (typeof objOrString === "string") {
            log_error_1.logError(objOrString, ex);
        }
        else {
            log_error_1.logError(objOrString.name, ex);
        }
    }
    if (def != null) {
        onSuccess(def);
    }
}
exports.tryGet = tryGet;

//# sourceMappingURL=try-get.js.map
