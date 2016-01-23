import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";
import {VariableDeclarationType} from "./../../../definitions";

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
            declarationType: VariableDeclarationType.Var,
            name: "myExplicitTypeVar",
            typeExpression: { text: "number" }
        }, {
            declarationType: VariableDeclarationType.Var,
            name: "myImplicitTypeVar",
            typeExpression: { text: "string" },
            defaultExpression: { text: `"my string"` }
        }, {
            declarationType: VariableDeclarationType.Let,
            name: "myLet",
            typeExpression: { text: "string" }
        }, {
            declarationType: VariableDeclarationType.Const,
            name: "myConst",
            typeExpression: { text: "number" }
        }]
    });
});
