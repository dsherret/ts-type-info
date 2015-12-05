import * as assert from "assert";
import {Type} from "./../../types";

export function runTypeTests(type: Type, name: string) {
    if (type == null) {
        throw "Type should not be null.";
    }

    it(`should have a type of ${name}`, () => {
        assert.equal(type.name, name);
    });
}
