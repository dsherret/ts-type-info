import * as assert from "assert";
import {Logger} from "./../../utils";

describe("logger", () => {
    let logedMsg: string | null;
    let warnedMsg: string | null;
    let erroredMsg: string | null;
    let wasEnabled = Logger.getIsEnabled();

    before(() => {
        Logger.setLogFunction((msg: string) => logedMsg = msg);
        Logger.setWarnFunction((msg: string) => warnedMsg = msg);
        Logger.setErrorFunction((msg: string) => erroredMsg = msg);
    });

    after(() => {
        // reset
        Logger.toggleEnabled(wasEnabled);
        Logger.setLogFunction(console.log);
        Logger.setWarnFunction(console.warn);
        Logger.setErrorFunction(console.error);
    });

    beforeEach(() => {
        logedMsg = null;
        warnedMsg = null;
        erroredMsg = null;
    });

    describe("logging", () => {
        beforeEach(() => {
            Logger.enable();
        });

        describe("log", () => {
            it("should log what was passed in", () => {
                Logger.log("message");
                assert.equal(logedMsg, "[ts-type-info]: message");
            });

            it("should not warn", () => {
                Logger.log("message");
                assert.equal(warnedMsg, null);
            });

            it("should not error", () => {
                Logger.log("message");
                assert.equal(erroredMsg, null);
            });
        });

        describe("warn", () => {
            it("should not log", () => {
                Logger.warn("message");
                assert.equal(logedMsg, null);
            });

            it("should warn what was passed in", () => {
                Logger.warn("message");
                assert.equal(warnedMsg, "[ts-type-info]: message");
            });

            it("should not error", () => {
                Logger.log("message");
                assert.equal(erroredMsg, null);
            });
        });

        describe("error", () => {
            it("should not log", () => {
                Logger.error("message");
                assert.equal(logedMsg, null);
            });

            it("should not warn", () => {
                Logger.log("message");
                assert.equal(warnedMsg, null);
            });

            it("should error what was passed in", () => {
                Logger.error("message");
                assert.equal(erroredMsg, "[ts-type-info]: message");
            });
        });
    });

    describe("disabled logging", () => {
        beforeEach(() => {
            Logger.disable();
        });

        describe("log warn error", () => {
            it("should not log", () => {
                Logger.log("message");
                Logger.warn("message");
                Logger.error("message");
                assert.equal(logedMsg, null);
            });

            it("should not warn", () => {
                Logger.log("message");
                Logger.warn("message");
                Logger.error("message");
                assert.equal(warnedMsg, null);
            });

            it("should not error", () => {
                Logger.log("message");
                Logger.warn("message");
                Logger.error("message");
                assert.equal(erroredMsg, null);
            });
        });
    });
});
