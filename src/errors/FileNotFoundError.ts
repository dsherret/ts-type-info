import {BaseError} from "./BaseError";

export class FileNotFoundError extends BaseError {
    constructor(public fileName: string) {
        super(`File not found: ${fileName}`);
    }
}
