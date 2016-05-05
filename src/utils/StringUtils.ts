export module StringUtils {
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
    export function endsWith(subjectString: string, searchString: string, position?: number) {
        if (typeof position !== "number" || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        const lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    }

    export function ensureEndsWithNewline(code: string) {
        if (typeof code === "string" && code[code.length - 1] !== "\n") {
            code += "\n";
        }

        return code;
    }

    export function isNullOrWhiteSpace(str: string) {
        return typeof str !== "string" || str.trim().length === 0;
    }
}
