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
            name: "myExplicitTypeVar",
            typeExpression: { text: "number" }
        }, {
            name: "myImplicitTypeVar",
            typeExpression: { text: "string" },
            defaultExpression: { text: `"my string"` }
        }, {
            name: "myLet",
            typeExpression: { text: "string" }
        }, {
            name: "myConst",
            typeExpression: { text: "number" }
        }]
    });
});
