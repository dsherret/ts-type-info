import * as assert from "assert";
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
        runConstructorDefinitionTests(def.classes[0].constructor, null);
    });

    describe("constructor with no parameters", () => {
        runConstructorDefinitionTests(def.classes[1].constructor, {
            parameters: []
        });
    });

    describe("constructor with parameters", () => {
        runConstructorDefinitionTests(def.classes[2].constructor, {
            parameters: [{
                name: "parameter1",
                type: "string"
            }]
        });
    });
});
