export module StringUtils {
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
