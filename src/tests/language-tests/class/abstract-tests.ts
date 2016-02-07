import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("class abstract tests", () => {
    const code = `
abstract class MyAbstractClass {
    abstract myAbstractMethod(): string;
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyAbstractClass",
            isAbstract: true,
            methods: [{
                name: "myAbstractMethod",
                isAbstract: true,
                returnTypeExpression: { text: "string" }
            }]
        }]
    });
});
