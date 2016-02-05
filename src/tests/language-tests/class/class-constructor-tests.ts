import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("class constructor tests", () => {
    const code = `
class MyClass1 {
}
class MyClass2 {
    constructor() {
    }
}
class MyClass3 {
    constructor(parameter1: string) {
    }
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass1"
        }, {
            name: "MyClass2",
            constructorDef: {}
        }, {
            name: "MyClass3",
            constructorDef: {
                parameters: [{
                    name: "parameter1",
                    typeExpression: { text: "string" }
                }]
            }
        }]
    });
});
