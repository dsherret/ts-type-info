import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("type alias type tests", () => {
    const code = `
type MyTypeAlias = { prop: string; };
let e: MyTypeAlias;
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        typeAliases: [{
            name: "MyTypeAlias",
            type: {
                text: "{ prop: string; }"
            }
        }],
        variables: [{
            name: "e",
            type: {
                text: "MyTypeAlias",
                definitions: [{
                    name: "MyTypeAlias"
                }],
                allDefinitions: [{
                    name: "MyTypeAlias"
                }]
            }
        }]
    });
});
