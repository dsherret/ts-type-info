import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";
import {VariableDeclarationType} from "./../../../definitions";

describe("variable tests", () => {
    const code = `
/**
 * Some description
 */
var myImplicitAny;
var myExplicitTypeVar: number;
var myImplicitTypeVar = "my string";
var myMultilineImplicitAny1,
    myMultilineImplicitAny2,
    myMultilineImplicitAny3;
var myMultilineExplicitTypeVar1: boolean,
    myMultilineExplicitTypeVar2: number;
var myMultilineImplicitTypeVar1 = "my string",
    myMultilineImplicitTypeVar2 = 42;

let myLet: string;
let myMultilineLet1: number,
    myMultilineLet2;

const myConst: number;
const myMultilineConst1 = 10,
      myMultilineConst2: string;
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "myImplicitAny",
            declarationType: VariableDeclarationType.Var,
            type: { text: "any" },
            documentationComment: `/**\n * Some description\n */`
        }, {
            name: "myExplicitTypeVar",
            declarationType: VariableDeclarationType.Var,
            type: { text: "number" }
        }, {
            name: "myImplicitTypeVar",
            declarationType: VariableDeclarationType.Var,
            type: { text: "string" },
            defaultExpression: { text: `"my string"` }
        }, {
            name: "myMultilineImplicitAny1",
            declarationType: VariableDeclarationType.Var,
            type: { text: "any" }
        }, {
            name: "myMultilineImplicitAny2",
            declarationType: VariableDeclarationType.Var,
            type: { text: "any" }
        }, {
            name: "myMultilineImplicitAny3",
            declarationType: VariableDeclarationType.Var,
            type: { text: "any" }
        }, {
            name: "myMultilineExplicitTypeVar1",
            declarationType: VariableDeclarationType.Var,
            type: { text: "boolean" }
        }, {
            name: "myMultilineExplicitTypeVar2",
            declarationType: VariableDeclarationType.Var,
            type: { text: "number" }
        }, {
            name: "myMultilineImplicitTypeVar1",
            declarationType: VariableDeclarationType.Var,
            type: { text: "string" },
            defaultExpression: { text: `"my string"` }
        }, {
            name: "myMultilineImplicitTypeVar2",
            declarationType: VariableDeclarationType.Var,
            type: { text: "number" },
            defaultExpression: { text: "42" }
        }, {
            name: "myLet",
            declarationType: VariableDeclarationType.Let,
            type: { text: "string" }
        }, {
            name: "myMultilineLet1",
            declarationType: VariableDeclarationType.Let,
            type: { text: "number" }
        }, {
            name: "myMultilineLet2",
            declarationType: VariableDeclarationType.Let,
            type: { text: "any" }
        }, {
            name: "myConst",
            declarationType: VariableDeclarationType.Const,
            type: { text: "number" }
        }, {
            name: "myMultilineConst1",
            declarationType: VariableDeclarationType.Const,
            type: { text: "number" },
            defaultExpression: { text: "10" }
        }, {
            name: "myMultilineConst2",
            declarationType: VariableDeclarationType.Const,
            type: { text: "string" }
        }]
    });
});
