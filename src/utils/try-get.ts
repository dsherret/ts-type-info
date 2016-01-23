import * as ts from "typescript";
import {logError} from "./log-error";

/* istanbul ignore next */
export function tryGet<T>(objOrString: ts.Symbol | string, attemptToGet: () => T, onSuccess: (def: T) => void) {
    let def: T;

    try {
        def = attemptToGet();
    } catch (ex) {
        if (typeof objOrString === "string") {
            logError(objOrString, ex);
        }
        else {
            logError(objOrString.name, ex);
        }
    }

    if (def != null) {
        onSuccess(def);
    }
}
