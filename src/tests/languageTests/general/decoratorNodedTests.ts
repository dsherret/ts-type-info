import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests} from "./../../testHelpers";

describe("enum noded tests", () => {
    const code = `
function MyClassDecorator(target: Function) {
}

@MyClassDecorator
class MyClass1 {
}`;

    const def = getInfoFromString(code, {
        includeCompilerNodes: true
    });

    runNodedDefinitionTests(def.classes[0].decorators[0]);
});
