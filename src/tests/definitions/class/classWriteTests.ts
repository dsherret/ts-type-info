import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
abstract class MyClass {
    static myStaticString: string;

    static myStaticMethod() {
    }

    static async myAsyncStaticMethod() {
    }

    myString: string;
    private myPrivateString: string;
    nonOptionalString = "text";
    optionalNumber?: number;

    get myGet(): string {
        return "";
    }

    get myGetSet(): string {
        return "";
    }

    set myGetSet(value: string) {
    }

    get myGetSetWithWriteDefined(): string {
        return "";
    }

    set myGetSetWithWriteDefined(value: string) {
    }

    constructor(myParam: string, public myPublicParam: any, protected myProtectedParam: any, private myPrivateParam: any) {
    }

    abstract myAbstractMethod(): string;
    abstract myAbstractMethod2(): string;
    abstract myAbstractMethod2(str?: string): string;

    myMethod() {
    }

    private myMethodWithOverloadSignatures<T>(): string;
    private myMethodWithOverloadSignatures<T>(str?: string) {
        return "";
    }

    private myPrivateMethod() {
    }

    async myAsyncMethod() {
    }

    abstract async myAbstractAsyncMethod();
}

class MyTypeParameterClass<T> {
}

class MyChildClass extends MyTypeParameterClass<string> {
}

class MyImplementsClass implements MyChildClass {
}

class MyExtendsImplementsClass extends MyChildClass implements MyImplementsClass {
}
`;

describe("ClassDefinition", () => {
    const file = getInfoFromString(code);

    describe("write()", () => {
        describe("MyClass", () => {
            it("should contain the class written out", () => {
                const expected =
`abstract class MyClass {
    static myStaticString: string;

    static myStaticMethod() {
    }

    static async myAsyncStaticMethod() {
    }

    myString: string;
    private myPrivateString: string;
    nonOptionalString = "text";
    optionalNumber?: number;
    myGet: string;
    myGetSet: string;

    get myGetSetWithWriteDefined(): string {
        return "";
    }

    set myGetSetWithWriteDefined(value: string) {
        console.log(value);
    }

    constructor(myParam: string, public myPublicParam: any, protected myProtectedParam: any, private myPrivateParam: any) {
    }

    abstract myAbstractMethod(): string;
    abstract myAbstractMethod2(): string;
    abstract myAbstractMethod2(str?: string): string;

    myMethod() {
    }

    private myMethodWithOverloadSignatures<T>(): string;
    private myMethodWithOverloadSignatures<T>(str?: string): string {
    }

    private myPrivateMethod() {
    }

    async myAsyncMethod() {
    }

    abstract async myAbstractAsyncMethod(): any;
}
`;
                const classDef = file.classes[0];
                const property = classDef.getProperty("myGetSetWithWriteDefined");

                property.onWriteGetBody = writer => writer.write(`return "";`);
                property.onWriteSetBody = writer => writer.write(`console.log(value);`);

                assert.equal(classDef.write(), expected);
            });
        });

        describe("MyTypeParameterClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyTypeParameterClass<T> {
}
`;
                assert.equal(file.classes[1].write(), expected);
            });
        });

        describe("MyChildClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyChildClass extends MyTypeParameterClass<string> {
}
`;
                assert.equal(file.classes[2].write(), expected);
            });
        });

        describe("MyImplementsClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyImplementsClass implements MyChildClass {
}
`;
                assert.equal(file.classes[3].write(), expected);
            });
        });

        describe("MyExtendsImplementsClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyExtendsImplementsClass extends MyChildClass implements MyImplementsClass {
}
`;
                assert.equal(file.classes[4].write(), expected);
            });
        });
    });
});
