export module StringUtils {
    export function ensureEndsWithNewline(code: string) {
        if (code[code.length - 1] !== "\n") {
            code += "\n";
        }

        return code;
    }

    export function isNullOrWhiteSpace(str: string | undefined): str is undefined {
        return typeof str !== "string" || str.trim().length === 0;
    }
}
