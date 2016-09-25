import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("intersection type tests", () => {
    const code = `
let test: string | string & number;
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "test",
            type: {
                text: "string | (string & number)",
                unionTypes: [{
                    text: "string"
                }, {
                    text: "string & number",
                    intersectionTypes: [{
                        text: "string"
                    }, {
                        text: "number"
                    }]
                }],
                node: {
                    text: "string | string & number",
                    unionTypes: [{
                        text: "string"
                    }, {
                        text: "string & number",
                        intersectionTypes: [{
                            text: "string"
                        }, {
                            text: "number"
                        }]
                    }]
                }
            }
        }]
    });
});
