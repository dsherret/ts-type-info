import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("function type parameters", () => {
    const code = `
function myTypeParameterFunction<T, U extends string>(tParam: T, uParam: U) {
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "myTypeParameterFunction",
            typeParameters: [{
                name: "T"
            }, {
                name: "U",
                constraintTypeExpression: { text: "string" }
            }],
            parameters: [{
                name: "tParam",
                typeExpression: { text: "T" }
            }, {
                name: "uParam",
                typeExpression: { text: "U" }
            }]
        }]
    });
});
