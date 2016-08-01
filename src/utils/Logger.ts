export class Logger {
    private static isEnabled = false;
    private static logFunction: (msg: string) => void = console.log;
    private static warnFunction: (msg: string) => void = console.warn;

    private constructor() {
    }

    static getIsEnabled() {
        return this.isEnabled;
    }

    static enable() {
        this.toggleEnabled(true);
    }

    static disable() {
        this.toggleEnabled(false);
    }

    static toggleEnabled(isEnabled: boolean) {
        this.isEnabled = isEnabled;
    }

    static setLogFunction(logFunction: (msg: string) => void) {
        this.logFunction = logFunction;
    }

    static setWarnFunction(warnFunction: (msg: string) => void) {
        this.warnFunction = warnFunction;
    }

    static log(message: string) {
        this.logWithFunction(message, this.logFunction);
    }

    static warn(message: string) {
        this.logWithFunction(message, this.warnFunction);
    }

    private static logWithFunction(message: string, func: (msg: string) => void) {
        if (this.isEnabled) {
            func("[ts-type-info]: " + message);
        }
    }
}
