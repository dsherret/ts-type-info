import * as assert from "assert";
import {Logger} from "./../../utils";

describe("logger", () => {
    describe("warn", () => {
        it("should log what is passed in and prepend a message", () => {
            let savedMsg: string;
            Logger.warn("message", (msg: string) => savedMsg = msg);
            assert.equal(savedMsg, "[ts-type-info-writer]: message");
        });
    });
});
