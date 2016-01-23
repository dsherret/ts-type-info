import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";
import {VariableDeclarationType} from "./../../../definitions";

describe("variable tests", () => {
    const code = `
var myImplicitAny;
var myExplicitTypeVar: number;
var myImplicitTypeVar = "my string";
let myLet: string;
const myConst: number;
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "myImplicitAny",
            declarationType: VariableDeclarationType.Var,
            typeExpression: { text: "any" }
        }, {
            name: "myExplicitTypeVar",
            declarationType: VariableDeclarationType.Var,
            typeExpression: { text: "number" }
        }, {
            name: "myImplicitTypeVar",
            declarationType: VariableDeclarationType.Var,
            typeExpression: { text: "string" },
            defaultExpression: { text: `"my string"` }
        }, {
            name: "myLet",
            declarationType: VariableDeclarationType.Let,
            typeExpression: { text: "string" }
        }, {
            name: "myConst",
            declarationType: VariableDeclarationType.Const,
            typeExpression: { text: "number" }
        }]
    });
});
