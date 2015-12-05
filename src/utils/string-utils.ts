export class StringUtils {
    static ensureEndsWithNewline(code: string) {
        if (typeof code === "string" && code[code.length - 1] !== "\n") {
            code += "\n";
        }

        return code;
    }
}
