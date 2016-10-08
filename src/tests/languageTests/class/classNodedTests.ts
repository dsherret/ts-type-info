import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests, runNodedDefinitionTestsForNonNamed} from "./../../testHelpers";

describe("class noded tests", () => {
    const code = `
class MyClass {
    constructor(param: string) {}
    myMethod(param: string) {}
    static myStaticMethod(param: string) {}
    prop: string;
    static myStaticProp: string;
}`;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTests(def.classes[0]);
    runNodedDefinitionTestsForNonNamed(def.classes[0].constructorDef);
    runNodedDefinitionTests(def.classes[0].constructorDef.parameters[0]);
    runNodedDefinitionTests(def.classes[0].methods[0]);
    runNodedDefinitionTests(def.classes[0].methods[0].parameters[0]);
    runNodedDefinitionTests(def.classes[0].staticMethods[0]);
    runNodedDefinitionTests(def.classes[0].staticMethods[0].parameters[0]);
    runNodedDefinitionTests(def.classes[0].properties[0]);
    runNodedDefinitionTests(def.classes[0].staticProperties[0]);
});
