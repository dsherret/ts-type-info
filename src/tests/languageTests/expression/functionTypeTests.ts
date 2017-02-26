import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("function type tests", () => {
    const code = `
let func: <T extends string>(str: T, num?: number) => void;
let func2: string | (() => void);
let userDefinedTypeGuardFunc: (str: any) => str is string;
`;

    const def = getInfoFromString(code, { showDebugMessages: true });

    runFileDefinitionTests(def, {
        variables: [{
            name: "func",
            type: {
                text: "<T extends string>(str: T, num?: number) => void",
                callSignatures: [{
                    minArgumentCount: 1,
                    typeParameters: [{
                        name: "T",
                        constraintType: { text: "string" }
                    }],
                    parameters: [{
                        name: "str",
                        type: { text: "T" }
                    }, {
                        name: "num",
                        type: { text: "number" },
                        isOptional: true
                    }]
                }],
                node: {
                    text: "<T extends string>(str: T, num?: number) => void",
                    parameters: [{
                        name: "str",
                        type: { text: "T" }
                    }, {
                        name: "num",
                        type: { text: "number" },
                        isOptional: true
                    }],
                    typeParameters: [{
                        name: "T",
                        constraintType: { text: "string" }
                    }]
                }
            }
        }, {
            name: "func2",
            type: {
                text: "string | (() => void)",
                unionTypes: [{
                    text: "string"
                }, {
                    text: "() => void"
                }]
            }
        }, {
            name: "userDefinedTypeGuardFunc",
            type: {
                text: "(str: any) => str is string",
                callSignatures: [{
                    minArgumentCount: 1,
                    parameters: [{
                        name: "str",
                        type: { text: "any" }
                    }],
                    userDefinedTypeGuard: {
                        parameterName: "str",
                        type: { text: "string" }
                    },
                    returnType: {
                        text: "str is string"
                    }
                }]
            }
        }]
    });
});
