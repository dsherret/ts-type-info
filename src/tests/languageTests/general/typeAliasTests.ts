﻿import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("type alias tests", () => {
    const code = `
/**
 * Some description
 */
type myStringTypeAlias = string;
type myUnionTypeAlias = string | number;
type myTypeAliasWithTypeParameter<T> = T;
type myTypeAliasWithTypeParameterConstraint<T extends string> = T;
export type myExportedType = string;
type myStringLiteralTypeAlias = "some string" | "other string";
let myVariableUsingType: myUnionTypeAlias;
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "myVariableUsingType",
            type: {
                text: "myUnionTypeAlias"
            }
        }],
        typeAliases: [{
            name: "myStringTypeAlias",
            type: { text: "string" },
            documentationComment: `/**\n * Some description\n */`
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
