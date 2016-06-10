import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("function type parameters", () => {
    const code = `
function myTypeParameterFunction<T, U extends string>(tParam: T, uParam: U) {
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "myTypeParameterFunction",
            typeParameters: [{
                name: "T"
            }, {
                name: "U",
                constraintType: { text: "string" }
            }],
            parameters: [{
                name: "tParam",
                type: { text: "T" }
            }, {
                name: "uParam",
                type: { text: "U" }
            }]
        }]
    });
});
