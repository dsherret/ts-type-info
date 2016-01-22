import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("variable tests", () => {
    const code = `
var myExplicitTypeVar: number;
var myImplicitTypeVar = "my string";
let myLet: string;
const myConst: number;
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        variables: [{
            declarationType: "var",
            name: "myExplicitTypeVar",
            typeExpression: { text: "number" }
        }, {
            declarationType: "var",
            name: "myImplicitTypeVar",
            typeExpression: { text: "string" },
            defaultExpression: { text: `"my string"` }
        }, {
            declarationType: "let",
            name: "myLet",
            typeExpression: { text: "string" }
        }, {
            declarationType: "const",
            name: "myConst",
            typeExpression: { text: "number" }
        }]
    });
});
