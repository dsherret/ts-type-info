import {logError} from "./../../utils";
import * as assert from "assert";

describe("logError", () => {
    let oldConsoleWarn = console.warn;
    let message: string;
    let logFunc = (loggedMessage: string) => message = loggedMessage;

    it("should log the name", () => {
        logError("MySymbolName", { message: "Message", stack: "Stack" } as any, logFunc);
        assert.equal(message, getMessage(`Failed getting info from "MySymbolName".\n\nDetail: Message\n\nStack: Stack`));
    });

    it("should log that the name was null", () => {
        logError(null, { message: "Message", stack: "Stack" } as any, logFunc);
        assert.equal(message, getMessage(`Unknown error. Object was null.\n\nDetail: Message\n\nStack: Stack`));
    });

    console.warn = oldConsoleWarn;
});

function getMessage(msg: string) {
    return getLine() + msg + "\n" + getLine() + "\n";
}

function getLine() {
    return "-----------------------------------------\n";
}
