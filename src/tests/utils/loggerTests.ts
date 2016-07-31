import * as assert from "assert";
import {Logger} from "./../../utils";

describe("logger", () => {
    let logedMsg: string | null;
    let warnedMsg: string | null;
    let wasEnabled = Logger.getIsEnabled();

    before(() => {
        Logger.setLogFunction((msg: string) => logedMsg = msg);
        Logger.setWarnFunction((msg: string) => warnedMsg = msg);
    });

    after(() => {
        // reset
        Logger.toggleEnabled(wasEnabled);
        Logger.setLogFunction(console.log);
        Logger.setWarnFunction(console.warn);
    });

    beforeEach(() => {
        logedMsg = null;
        warnedMsg = null;
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
        });
    });

    describe("disabled logging", () => {
        beforeEach(() => {
            Logger.disable();
        });

        describe("log and warn", () => {
            it("should not log", () => {
                Logger.log("message");
                Logger.warn("message");
                assert.equal(logedMsg, null);
            });

            it("should not warn", () => {
                Logger.log("message");
                Logger.warn("message");
                assert.equal(warnedMsg, null);
            });
        });
    });
});
