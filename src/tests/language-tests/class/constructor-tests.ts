import {getStringInfo} from "./../../../main";
import {runConstructorDefinitionTests} from "./../../test-helpers";

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

    describe("class with no constructor", () => {
        runConstructorDefinitionTests(def.classes[0].constructorDef, null);
    });

    describe("constructor with no parameters", () => {
        runConstructorDefinitionTests(def.classes[1].constructorDef, {
            parameters: []
        });
    });

    describe("constructor with parameters", () => {
        runConstructorDefinitionTests(def.classes[2].constructorDef, {
            parameters: [{
                name: "parameter1",
                type: "string"
            }]
        });
    });
});
