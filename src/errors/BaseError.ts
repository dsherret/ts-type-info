﻿export abstract class BaseError extends Error {
    constructor(message: string) {
        super(message);

        this.message = message;
    }
}
