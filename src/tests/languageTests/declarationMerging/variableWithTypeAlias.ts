import {getStringInfo} from "./../../../main";
import {VariableDeclarationType} from "./../../../definitions";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("declaration merging variable with type alias", () => {
    const code = `
type VariableDeclarationType = "var" | "let" | "const";

const VariableDeclarationType = {
    Var: "var" as VariableDeclarationType,
    Let: "let" as VariableDeclarationType,
    Const: "const" as VariableDeclarationType
};
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "VariableDeclarationType",
            declarationType: VariableDeclarationType.Const,
            typeExpression: {
                text: `{ Var: "var" | "let" | "const"; Let: "var" | "let" | "const"; Const: "var" | "let" | "const"; }`
            },
            defaultExpression: {
                text: `{\n    Var: "var" as VariableDeclarationType,\n    Let: "let" as VariableDeclarationType,\n    Const: "const" as VariableDeclarationType\n}`
            }
        }],
        typeAliases: [{
            name: "VariableDeclarationType",
            typeExpression: {
                text: `"var" | "let" | "const"`
            }
        }]
    });
});
