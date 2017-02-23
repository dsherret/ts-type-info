export class Logger {
    private static isEnabled = false;
    private static logFunction: (msg: string) => void = console.log;
    private static warnFunction: (msg: string) => void = console.warn;
    private static errorFunction: (msg: string) => void = console.error;

    private constructor() {
    }

    static getIsEnabled() {
        return this.isEnabled;
    }

    static enable() {
        this.setEnabled(true);
    }

    static disable() {
        this.setEnabled(false);
    }

    static setEnabled(isEnabled: boolean) {
        this.isEnabled = isEnabled;
    }

    static setLogFunction(logFunction: (msg: string) => void) {
        this.logFunction = logFunction;
    }

    static setWarnFunction(warnFunction: (msg: string) => void) {
        this.warnFunction = warnFunction;
    }

    static setErrorFunction(errorFunction: (msg: string) => void) {
        this.errorFunction = errorFunction;
    }

    static log(message: string) {
        this.logWithFunction(message, this.logFunction);
    }

    static warn(message: string) {
        this.logWithFunction(message, this.warnFunction);
    }

    static error(message: string) {
        this.logWithFunction(message, this.errorFunction);
    }

    private static logWithFunction(message: string, func: (msg: string) => void) {
        // todo: if an error is passed in here, log the trace property
        if (this.isEnabled)
            func(`[ts-type-info]: ${message}`);
    }
}
