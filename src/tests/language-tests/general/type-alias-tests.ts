import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";
import {VariableDeclarationType} from "./../../../definitions";

describe("type alias tests", () => {
    const code = `
type myStringTypeAlias = string;
type myUnionTypeAlias = string | number;
type myTypeAliasWithTypeParameter<T> = T[];
type myTypeAliasWithTypeParameterConstraint<T extends string> = T[];
export type myExportedType = string;
var myVariableUsingType: myUnionTypeAlias;
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "myVariableUsingType",
            declarationType: VariableDeclarationType.Var,
            typeExpression: { text: "string | number" }
        }],
        typeAliases: [{
            name: "myStringTypeAlias",
            typeExpression: { text: "string" }
        }, {
            name: "myUnionTypeAlias",
            typeExpression: { text: "string | number" }
        }, {
            name: "myTypeAliasWithTypeParameter",
            typeParameters: [{
                name: "T"
            }],
            typeExpression: { text: "T[]" }
        }, {
            name: "myTypeAliasWithTypeParameterConstraint",
            typeParameters: [{
                name: "T",
                constraintTypeExpression: { text: "string" }
            }],
            typeExpression: { text: "T[]" }
        }, {
            name: "myExportedType",
            typeExpression: { text: "string" },
            isExported: true,
            isNamedExportOfFile: true
        }],
        exports: [{
            name: "myExportedType"
        }]
    });
});
