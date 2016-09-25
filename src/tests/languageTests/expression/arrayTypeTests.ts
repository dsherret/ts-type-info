import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("array type tests", () => {
    const code = `
let t: Array<MyClass>;
let u: string[];
let v: string[][];
let w: Array<Array<string>>;
class MyClass {
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "t",
            type: {
                text: "MyClass[]",
                isArrayType: true,
                arrayElementType: {
                    text: "MyClass",
                    definitions: [{
                        name: "MyClass"
                    }],
                    allDefinitions: [{
                        name: "MyClass"
                    }]
                },
                definitions: [],
                allDefinitions: [{
                    name: "MyClass"
                }],
                node: {
                    text: "Array<MyClass>",
                    isArrayType: true,
                    arrayElementType: {
                        text: "MyClass",
                        definitions: [{
                            name: "MyClass"
                        }],
                        allDefinitions: [{
                            name: "MyClass"
                        }]
                    },
                    definitions: [],
                    allDefinitions: [{
                        name: "MyClass"
                    }],
                }
            }
        }, {
            name: "u",
            type: {
                text: "string[]",
                isArrayType: true,
                arrayElementType: {
                    text: "string"
                }
            }
        }, {
            name: "v",
            type: {
                text: "string[][]",
                isArrayType: true,
                arrayElementType: {
                    text: "string[]",
                    isArrayType: true,
                    arrayElementType: {
                        text: "string"
                    }
                }
            }
        }, {
            name: "w",
            type: {
                text: "string[][]",
                isArrayType: true,
                arrayElementType: {
                    text: "string[]",
                    isArrayType: true,
                    arrayElementType: {
                        text: "string"
                    }
                },
                node: {
                    text: "Array<Array<string>>",
                    isArrayType: true,
                    arrayElementType: {
                        text: "string[]",
                        isArrayType: true,
                        arrayElementType: {
                            text: "string"
                        },
                        node: {
                            text: "Array<string>",
                            isArrayType: true,
                            arrayElementType: {
                                text: "string"
                            }
                        }
                    }
                }
            }
        }],
        classes: [{
            name: "MyClass"
        }]
    });
});
