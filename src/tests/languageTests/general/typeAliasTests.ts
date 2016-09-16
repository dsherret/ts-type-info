import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";
import {VariableDeclarationType} from "./../../../definitions";

describe("type alias tests", () => {
    const code = `
type myStringTypeAlias = string;
type myUnionTypeAlias = string | number;
type myTypeAliasWithTypeParameter<T> = T;
type myTypeAliasWithTypeParameterConstraint<T extends string> = T;
export type myExportedType = string;
type myStringLiteralTypeAlias = "some string" | "other string";
var myVariableUsingType: myUnionTypeAlias;
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "myVariableUsingType",
            declarationType: VariableDeclarationType.Var,
            type: {
                text: "myUnionTypeAlias"
            }
        }],
        typeAliases: [{
            name: "myStringTypeAlias",
            type: { text: "string" }
        }, {
            name: "myUnionTypeAlias",
            type: {
                text: "string | number",
                unionTypes: [{
                    text: "string"
                }, {
                    text: "number"
                }]
            }
        }, {
            name: "myTypeAliasWithTypeParameter",
            typeParameters: [{
                name: "T"
            }],
            type: { text: "T" }
        }, {
            name: "myTypeAliasWithTypeParameterConstraint",
            typeParameters: [{
                name: "T",
                constraintType: { text: "string" }
            }],
            type: { text: "T" }
        }, {
            name: "myExportedType",
            type: { text: "string" },
            isExported: true,
            isNamedExportOfFile: true
        }, {
            name: "myStringLiteralTypeAlias",
            type: {
                text: `"some string" | "other string"`,
                unionTypes: [{
                    text: `"some string"`
                }, {
                    text: `"other string"`
                }]
            }
        }],
        exports: [{
            name: "myExportedType"
        }]
    });
});
