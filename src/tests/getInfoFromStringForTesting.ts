import {getInfoFromString} from "./../main";
import {Options} from "./../options";

// todo: set errors on
export function getInfoFromStringForTesting(str: string, options?: Options) {
    if (typeof options === "undefined") {
        options = {};
    }
    return getInfoFromString(str, options);
}
