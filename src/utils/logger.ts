export class Logger {
    static warn(message: string, logFunction = console.warn) {
        logFunction("[ts-type-info-writer]: " + message);
    }
}
