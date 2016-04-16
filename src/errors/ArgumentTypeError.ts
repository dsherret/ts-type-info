export class ArgumentTypeError extends Error {
    constructor(public argName: string, public expectedType: string) {
        super(`Argument '${argName}' expects type '${expectedType}'.`);
    }
}
