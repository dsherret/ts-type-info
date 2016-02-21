import {getStringInfo} from "./../../../main";
import {Scope, ClassConstructorParameterScope} from "./../../../definitions";
import {runFileDefinitionTests} from "./../../test-helpers";

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

    const def = getStringInfo(code);

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
                    typeExpression: { text: "string" }
                }]
            }
        }, {
            name: "MyClass4",
            constructorDef: {
                parameters: [{
                    name: "param1",
                    typeExpression: { text: "string" },
                    scope: ClassConstructorParameterScope.Public
                }, {
                    name: "param2",
                    typeExpression: { text: "number" },
                    scope: ClassConstructorParameterScope.Protected
                }, {
                    name: "param3",
                    typeExpression: { text: "Date" },
                    defaultExpression: { text: "new Date()" },
                    scope: ClassConstructorParameterScope.Private,
                    isOptional: true
                }]
            },
            properties: [{
                name: "param1",
                typeExpression: { text: "string" },
                scope: Scope.Public,
                isConstructorParameter: true
            }, {
                name: "param2",
                typeExpression: { text: "number" },
                scope: Scope.Protected,
                isConstructorParameter: true
            }, {
                name: "param3",
                typeExpression: { text: "Date" },
                defaultExpression: { text: "new Date()" },
                scope: Scope.Private,
                isConstructorParameter: true
            }]
        }]
    });
});
