import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTestsForNonNamed} from "./../../testHelpers";

describe("user defined type guard noded tests", () => {
    const code = `function myFunction(obj: MyClass): obj is MyOtherClass {}`;

    const def = getInfoFromString(code, {
        includeTsNodes: true
    });

    runNodedDefinitionTestsForNonNamed(def.functions[0].userDefinedTypeGuard!);
});
