import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("generic type tests", () => {
    const code = `
type MyType<T> = { prop: T; };
let t: MyType<string>;
let u: MyType<MyType<string>>;
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        typeAliases: [{
            name: "MyType",
            typeParameters: [{
                name: "T"
            }],
            type: {
                text: "{ prop: T; }"
            }
        }],
        variables: [{
            name: "t",
            type: {
                text: "MyType<string>",
                typeArguments: [{
                    text: "string"
                }]
            }
        }, {
            name: "u",
            type: {
                text: "MyType<MyType<string>>",
                typeArguments: [{
                    text: "MyType<string>",
                    typeArguments: [{
                        text: "string"
                    }]
                }],
                node: {
                    text: "MyType<MyType<string>>",
                    typeArguments: [{
                        text: "MyType<string>",
                        typeArguments: [{
                            text: "string"
                        }]
                    }]
                }
            }
        }]
    });
});
