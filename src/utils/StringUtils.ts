export class StringUtils {
    private constructor() {
    }

    static ensureEndsWithNewline(code: string) {
        if (code[code.length - 1] !== "\n") {
            code += "\n";
        }

        return code;
    }

    static isNullOrWhiteSpace(str: string | undefined): str is undefined {
        return typeof str !== "string" || str.trim().length === 0;
    }
}
