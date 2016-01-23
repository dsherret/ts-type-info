import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("class abstract tests", () => {
    const code = `
abstract class MyAbstractClass {
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyAbstractClass",
            isAbstract: true
        }]
    });
});
