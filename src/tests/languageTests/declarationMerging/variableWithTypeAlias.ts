﻿import {getInfoFromString} from "./../../../main";
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

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "VariableDeclarationType",
            declarationType: VariableDeclarationType.Const,
            type: {
                text: `{ Var: VariableDeclarationType; Let: VariableDeclarationType; Const: VariableDeclarationType; }`
            },
            defaultExpression: {
                text: `{\n    Var: "var" as VariableDeclarationType,\n    Let: "let" as VariableDeclarationType,\n    Const: "const" as VariableDeclarationType\n}`
            }
        }],
        typeAliases: [{
            name: "VariableDeclarationType",
            type: {
                text: `"var" | "let" | "const"`,
                unionTypes: [{
                    text: `"var"`
                }, {
                    text: `"let"`
                }, {
                    text: `"const"`
                }]
            }
        }]
    });
});
