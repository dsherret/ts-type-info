export class FileNotFoundError extends Error {
    constructor(public fileName: string) {
        super(`File not found: ${fileName}`);
    }
}
