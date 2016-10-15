import {getInfoFromString} from "./../../../main";
import {runNodedDefinitionTests} from "./../../testHelpers";

describe("decorator noded tests", () => {
    const code = `
function MyClassDecorator(target: Function) {
}

@MyClassDecorator
class MyClass1 {
}`;

    const def = getInfoFromString(code, {
        includeTsNodes: true
    });

    runNodedDefinitionTests(def.classes[0].decorators[0]);
});
