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
            typeExpression: {
                text: "string | number",
                unionTypeExpressions: [{
                    text: "string"
                }, {
                    text: "number"
                }]
            }
        }],
        typeAliases: [{
            name: "myStringTypeAlias",
            typeExpression: { text: "string" }
        }, {
            name: "myUnionTypeAlias",
            typeExpression: {
                text: "string | number",
                unionTypeExpressions: [{
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
            typeExpression: { text: "T" }
        }, {
            name: "myTypeAliasWithTypeParameterConstraint",
            typeParameters: [{
                name: "T",
                constraintTypeExpression: { text: "string" }
            }],
            typeExpression: { text: "T" }
        }, {
            name: "myExportedType",
            typeExpression: { text: "string" },
            isExported: true,
            isNamedExportOfFile: true
        }, {
            name: "myStringLiteralTypeAlias",
            typeExpression: {
                text: `"some string" | "other string"`,
                unionTypeExpressions: [{
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
