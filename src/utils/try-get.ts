import {WrappedSymbolNode} from "./../wrappers";
import {logError} from "./log-error";

/* istanbul ignore next */
export function tryGet<T>(objOrString: WrappedSymbolNode | string, attemptToGet: () => T, onSuccess?: (def: T) => void) {
    let def: T;

    try {
        def = attemptToGet();
    } catch (ex) {
        if (typeof objOrString === "string") {
            logError(objOrString, ex);
        }
        else {
            logError(objOrString.getName(), ex);
        }
    }

    if (typeof onSuccess === "function" && def != null) {
        onSuccess(def);
    }

    return def;
}
