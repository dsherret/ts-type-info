import {getInfoFromString} from "./../../../main";
import {ClassConstructorParameterScope, Scope} from "./../../../definitions";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class constructor tests", () => {
    const code = `
class MyClass1 {
}
class MyClass2 {
    /**
     * Some description
    */
    constructor() {
    }
}
class MyClass3 {
    constructor(parameter1: string) {
    }
}
class MyClass4 {
    constructor(readonly param1: string, public param2: string, protected readonly param3: number, private param4 = new Date()) {
    }
}
class MyClass5 {
    private constructor() {
    }
}
class MyClass6 {
    protected constructor() {
    }
}
class MyClass7 {
    constructor(param: number);
    constructor(param: string);
    constructor(param: any) {
    }
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass1"
        }, {
            name: "MyClass2",
            constructorDef: {
                jsDocText: "/**\n * Some description\n */"
            }
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
                    scope: ClassConstructorParameterScope.Public, // when readonly, it should change the scope to Public when not specifiying an access modifier
                    isReadonly: true
                }, {
                    name: "param2",
                    type: { text: "string" },
                    scope: ClassConstructorParameterScope.Public
                }, {
                    name: "param3",
                    type: { text: "number" },
                    scope: ClassConstructorParameterScope.Protected,
                    isReadonly: true
                }, {
                    name: "param4",
                    type: { text: "Date" },
                    defaultExpression: { text: "new Date()" },
                    scope: ClassConstructorParameterScope.Private,
                    isOptional: true
                }]
            }
        }, {
            name: "MyClass5",
            constructorDef: {
                scope: Scope.Private
            }
        }, {
            name: "MyClass6",
            constructorDef: {
                scope: Scope.Protected
            }
        }, {
            name: "MyClass7",
            constructorDef: {
                parameters: [{
                    name: "param"
                }],
                overloadSignatures: [{
                    parameters: [{
                        name: "param",
                        type: { text: "number" }
                    }],
                    minArgumentCount: 1,
                    returnType: { text: "MyClass7" }
                }, {
                    parameters: [{
                        name: "param",
                        type: { text: "string" }
                    }],
                    minArgumentCount: 1,
                    returnType: { text: "MyClass7" }
                }]
            }
        }]
    });
});
