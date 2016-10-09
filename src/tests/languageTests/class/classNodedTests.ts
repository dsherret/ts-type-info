import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests, runNodedDefinitionTestsForNonNamed} from "./../../testHelpers";

describe("class noded tests", () => {
    const code = `
class MyClass {
    constructor(param: string);
    constructor(param: any) {}
    myMethod(param: string): void;
    myMethod(param: any) {}
    static myStaticMethod(param: string): void;
    static myStaticMethod(param: any) {}
    prop: string;
    static myStaticProp: string;
}`;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTests(def.classes[0]);
    runNodedDefinitionTestsForNonNamed(def.classes[0].constructorDef);
    runNodedDefinitionTests(def.classes[0].constructorDef.parameters[0]);
    // runNodedDefinitionTests(def.classes[0].constructorDef.overloadSignatures[0]); -- todo #196
    // runNodedDefinitionTests(def.classes[0].constructorDef.overloadSignatures[0].parameters[0]); -- todo #196
    runNodedDefinitionTests(def.classes[0].methods[0]);
    runNodedDefinitionTests(def.classes[0].methods[0].parameters[0]);
    runNodedDefinitionTestsForNonNamed(def.classes[0].methods[0].overloadSignatures[0]);
    runNodedDefinitionTests(def.classes[0].methods[0].overloadSignatures[0].parameters[0]);
    runNodedDefinitionTests(def.classes[0].staticMethods[0]);
    runNodedDefinitionTests(def.classes[0].staticMethods[0].parameters[0]);
    runNodedDefinitionTestsForNonNamed(def.classes[0].staticMethods[0].overloadSignatures[0]);
    runNodedDefinitionTests(def.classes[0].staticMethods[0].overloadSignatures[0].parameters[0]);
    runNodedDefinitionTests(def.classes[0].properties[0]);
    runNodedDefinitionTests(def.classes[0].staticProperties[0]);
});
