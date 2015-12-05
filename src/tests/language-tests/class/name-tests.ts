import {getStringInfo} from "./../../../main";
import * as assert from "assert";
import {runNamedDefinitionTests} from "./../../test-helpers";

describe("class name tests", () => {
    const code = `
class MyClass {
}`;

    const def = getStringInfo(code);

    runNamedDefinitionTests(def.classes[0], "MyClass");
});
