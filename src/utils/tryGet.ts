import {TsSymbol, TsNode} from "./../compiler";
import {logError} from "./logError";

/* istanbul ignore next */
export function tryGet<T>(objOrString: TsSymbol | TsNode | string, attemptToGet: () => T, onSuccess?: (def: T) => void) {
    let def: T | null = null;

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
