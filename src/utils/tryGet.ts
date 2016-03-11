import {ISymbol, INode} from "./../wrappers";
import {logError} from "./logError";

/* istanbul ignore next */
export function tryGet<T>(objOrString: ISymbol | INode | string, attemptToGet: () => T, onSuccess?: (def: T) => void) {
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
