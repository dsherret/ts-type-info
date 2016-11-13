import * as assert from "assert";
import {logError, Logger} from "./../../utils";

describe("logError", () => {
    let wasLoggerEnabled = Logger.getIsEnabled();
    let message: string;
    let logFunc = (loggedMessage: string) => message = loggedMessage;

    before(() => {
        Logger.setWarnFunction(logFunc);
        Logger.enable();
    });

    after(() => {
        Logger.setLogFunction(logFunc);
        Logger.setEnabled(wasLoggerEnabled);
    });

    it("should log the name", () => {
        logError("MySymbolName", { message: "Message", stack: "Stack" } as any);
        assert.equal(message, getMessage(`Failed getting info from "MySymbolName".\n\nDetail: Message\n\nStack: Stack`));
    });

    it("should log that the name was null", () => {
        logError(null, { message: "Message", stack: "Stack" } as any);
        assert.equal(message, getMessage(`Unknown error. Object was null.\n\nDetail: Message\n\nStack: Stack`));
    });
});

function getMessage(msg: string) {
    return "[ts-type-info]: \n" + getLine() + msg + "\n" + getLine() + "\n";
}

function getLine() {
    return "-----------------------------------------\n";
}
