import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("boolean type tests", () => {
    const code = `
let t: boolean;
let u: string | boolean;
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "t",
            type: {
                text: "boolean"
            }
        }, {
            name: "u",
            type: {
                text: "string | true | false", // not worth the effort to make this `string | boolean` at the moment
                unionTypes: [{
                    text: "string"
                }, {
                    text: "true"
                }, {
                    text: "false"
                }]
            }
        }]
    });
});
