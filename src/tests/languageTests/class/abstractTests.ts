import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class abstract tests", () => {
    const code = `
abstract class MyAbstractClass {
    abstract myAbstractMethod(): string;
}`;

    const def = getInfoFromString(code);

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
