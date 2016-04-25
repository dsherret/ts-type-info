import {BaseError} from "./BaseError";

export class ArgumentTypeError extends BaseError {
    constructor(public argName: string, public expectedType: string) {
        super(`Argument '${argName}' expects type '${expectedType}'.`);
    }
}
