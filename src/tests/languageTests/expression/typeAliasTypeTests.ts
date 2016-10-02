import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("type alias type tests", () => {
    const code = `
type MyTypeAlias = { prop: string; };
type MyUnionTypeAlias = { prop: string; } | string;
let a: MyTypeAlias;
let b: MyUnionTypeAlias;
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        typeAliases: [ {
            name: "MyTypeAlias",
            type: {
                text: "{ prop: string; }"
            }
        }, {
            name: "MyUnionTypeAlias",
            type: {
                text: "string | { prop: string; }",
                unionTypes: [{
                    text: "string"
                }, {
                    text: "{ prop: string; }"
                }]
            }
        }],
        variables: [{
            name: "a",
            type: {
                text: "MyTypeAlias",
                definitions: [{
                    name: "MyTypeAlias"
                }],
                allDefinitions: [{
                    name: "MyTypeAlias"
                }]
            }
        }, {
            name: "b",
            type: {
                text: "MyUnionTypeAlias",
                definitions: [{
                    name: "MyUnionTypeAlias"
                }],
                allDefinitions: [{
                    name: "MyUnionTypeAlias"
                }]
            }
        }]
    });
});
