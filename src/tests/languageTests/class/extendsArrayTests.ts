import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class extends array tests", () => {
    const code = `
class MyArrayExt extends Array<string> {
    prop: string;
}
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyArrayExt",
            properties: [{
                name: "prop",
                typeExpression: {
                    text: "string"
                }
            }],
            extendsTypeExpressions: [{
                text: "string[]"
            }]
        }]
    });
});
