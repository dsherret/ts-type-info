import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests} from "./../../testHelpers";

describe("class noded tests", () => {
    const code = `
class MyClass {
    myMethod() {}
    static myStaticMethod() {}
}`;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTests(def.classes[0]);
    runNodedDefinitionTests(def.classes[0].methods[0]);
    runNodedDefinitionTests(def.classes[0].staticMethods[0]);
});
