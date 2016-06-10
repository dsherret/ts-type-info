import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface type parameters", () => {
    const code = `
interface MyInterface<T, U extends string> {
    tProp: T;
    uProp: U;
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            typeParameters: [{
                name: "T"
            }, {
                name: "U",
                constraintType: { text: "string" }
            }],
            properties: [{
                name: "tProp",
                type: { text: "T" }
            }, {
                name: "uProp",
                type: { text: "U" }
            }]
        }]
    });
});
