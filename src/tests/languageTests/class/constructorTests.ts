import {getInfoFromString} from "./../../../main";
import {ClassConstructorParameterScope} from "./../../../definitions";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class constructor tests", () => {
    const code = `
class MyClass1 {
}
class MyClass2 {
    constructor() {
    }
}
class MyClass3 {
    constructor(parameter1: string) {
    }
}
class MyClass4 {
    constructor(public param1: string, protected param2: number, private param3 = new Date()) {
    }
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass1"
        }, {
            name: "MyClass2",
            constructorDef: {}
        }, {
            name: "MyClass3",
            constructorDef: {
                parameters: [{
                    name: "parameter1",
                    type: { text: "string" }
                }]
            }
        }, {
            name: "MyClass4",
            constructorDef: {
                parameters: [{
                    name: "param1",
                    type: { text: "string" },
                    scope: ClassConstructorParameterScope.Public
                }, {
                    name: "param2",
                    type: { text: "number" },
                    scope: ClassConstructorParameterScope.Protected
                }, {
                    name: "param3",
                    type: { text: "Date" },
                    defaultExpression: { text: "new Date()" },
                    scope: ClassConstructorParameterScope.Private,
                    isOptional: true
                }]
            }
        }]
    });
});
