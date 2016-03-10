import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface type parameters", () => {
    const code = `
interface MyInterface<T, U extends string> {
    tProp: T;
    uProp: U;
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            typeParameters: [{
                name: "T"
            }, {
                name: "U",
                constraintTypeExpression: { text: "string" }
            }],
            properties: [{
                name: "tProp",
                typeExpression: { text: "T" }
            }, {
                name: "uProp",
                typeExpression: { text: "U" }
            }]
        }]
    });
});
