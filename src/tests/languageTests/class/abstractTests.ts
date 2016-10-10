import {getInfoFromString, ClassPropertyKind} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class abstract tests", () => {
    const code = `
abstract class MyAbstractClass {
    abstract myAbstractMethod(): string;
    abstract myAbstractMethod(str?: string): string;
    abstract get myAbstractAccessor(): number;
    abstract set myAbstractAccessor(value: number);
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyAbstractClass",
            isAbstract: true,
            methods: [{
                name: "myAbstractMethod",
                isAbstract: true,
                returnType: { text: "string" },
                parameters: [{
                    name: "str",
                    type: { text: "string" },
                    isOptional: true
                }],
                overloadSignatures: [{
                    returnType: { text: "string" }
                }]
            }],
            properties: [{
                name: "myAbstractAccessor",
                kind: ClassPropertyKind.GetSetAccessor,
                isAbstract: true,
                type: { text: "number" }
            }]
        }]
    });
});
