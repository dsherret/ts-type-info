import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
abstract class MyClass {
    static readonly myStaticString: string;

    static myStaticMethod() {
    }

    static async myAsyncStaticMethod() {
    }

    protected myString: string;
    private myPrivateString: string;
    nonOptionalString = "text";
    optionalNumber?: number;
    protected abstract readonly myAbstractReadonlyProperty: string;
    protected abstract get myAbstractAccessorProperty(): string;
    protected abstract set myAbstractAccessorProperty(value: string);

    get myGet(): string {
        return "";
    }

    set mySet(value: string) {
    }

    get myGetSet(): string {
        return "";
    }

    set myGetSet(value: string) {
    }

    private get myGetWithWriteDefined(): string {
        return "";
    }

    private set mySetWithWriteDefined(value: string) {
    }

    protected get myGetSetWithWriteDefined(): string {
        return "";
    }

    protected set myGetSetWithWriteDefined(value: string) {
    }

    constructor(myParam: string, public readonly myPublicParam: any, protected myProtectedParam: any, private myPrivateParam: any) {
    }

    abstract myAbstractMethod(): string;
    abstract myAbstractMethod2(): string;
    abstract myAbstractMethod2(str?: string): string;

    myMethod() {
    }

    myParamTypeGuard(p: string | MyClass): p is MyClass {
    }

    myThisTypeGuard(): this is MyClass {
    }

    private myMethodWithOverloadSignatures<T>(): string;
    private myMethodWithOverloadSignatures<T>(str?: string) {
        return "";
    }

    private myPrivateMethod() {
    }

    private *myGeneratorMethod() {
    }

    async myAsyncMethod() {
    }

    abstract async myAbstractAsyncMethod();
}

class MyClassWithPrivateConstructor {
    private constructor() {
    }
}

class MyTypeParameterClass<T> {
}

class MyChildClass extends MyTypeParameterClass<string> {
}

class MyImplementsClass implements MyChildClass {
}

class MyExtendsImplementsClass extends MyChildClass implements MyImplementsClass {
}

class MyExtendsArray extends Array<string> {
}

class MyClassWithOverloadSignatures {
    constructor(param: number);
    constructor(param: string);
    constructor(param: any) {
    }
}
`;

describe("ClassDefinition", () => {
    const file = getInfoFromString(code);

    describe("write()", () => {
        describe("MyClass", () => {
            it("should contain the class written out", () => {
                const expected =
`abstract class MyClass {
    static readonly myStaticString: string;

    static myStaticMethod() {
    }

    static async myAsyncStaticMethod() {
    }

    protected myString: string;
    private myPrivateString: string;
    nonOptionalString = "text";
    optionalNumber?: number;
    protected abstract readonly myAbstractReadonlyProperty: string;
    protected abstract get myAbstractAccessorProperty(): string;
    protected abstract set myAbstractAccessorProperty(value: string);
    myGet: string;
    mySet: string;
    myGetSet: string;

    private get myGetWithWriteDefined(): string {
        return "";
    }

    private set mySetWithWriteDefined(value: string) {
        alert(value);
    }

    protected get myGetSetWithWriteDefined(): string {
        return "";
    }

    protected set myGetSetWithWriteDefined(value: string) {
        alert(value);
    }

    constructor(myParam: string, public readonly myPublicParam: any, protected myProtectedParam: any, private myPrivateParam: any) {
    }

    abstract myAbstractMethod(): string;
    abstract myAbstractMethod2(): string;
    abstract myAbstractMethod2(str?: string): string;

    myMethod() {
    }

    myParamTypeGuard(p: string | MyClass): p is MyClass {
    }

    myThisTypeGuard(): this is MyClass {
    }

    private myMethodWithOverloadSignatures<T>(): string;
    private myMethodWithOverloadSignatures<T>(str?: string): string {
    }

    private myPrivateMethod() {
    }

    private *myGeneratorMethod() {
    }

    async myAsyncMethod() {
    }

    abstract async myAbstractAsyncMethod(): any;
}
`;
                const classDef = file.classes[0];
                const getSetProperty = classDef.getProperty("myGetSetWithWriteDefined")!;

                getSetProperty.onWriteGetBody = writer => writer.write(`return "";`);
                getSetProperty.onWriteSetBody = writer => writer.write(`alert(value);`);

                classDef.getProperty("myGetWithWriteDefined")!.onWriteGetBody = writer => writer.write(`return "";`);
                classDef.getProperty("mySetWithWriteDefined")!.onWriteSetBody = writer => writer.write(`alert(value);`);

                assert.equal(classDef.write(), expected);
            });
        });

        describe("MyClassWithPrivateConstructor", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyClassWithPrivateConstructor {
    private constructor() {
    }
}
`;
                assert.equal(file.classes[1].write(), expected);
            });
        });

        describe("MyTypeParameterClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyTypeParameterClass<T> {
}
`;
                assert.equal(file.classes[2].write(), expected);
            });
        });

        describe("MyChildClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyChildClass extends MyTypeParameterClass<string> {
}
`;
                assert.equal(file.classes[3].write(), expected);
            });
        });

        describe("MyImplementsClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyImplementsClass implements MyChildClass {
}
`;
                assert.equal(file.classes[4].write(), expected);
            });
        });

        describe("MyExtendsImplementsClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyExtendsImplementsClass extends MyChildClass implements MyImplementsClass {
}
`;
                assert.equal(file.classes[5].write(), expected);
            });
        });

        describe("MyExtendsArray", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyExtendsArray extends Array<string> {
}
`;
                assert.equal(file.classes[6].write(), expected);
            });
        });

        describe("MyClassWithOverloadSignatures", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyClassWithOverloadSignatures {
    constructor(param: number);
    constructor(param: string);
    constructor(param: any) {
    }
}
`;
                assert.equal(file.classes[7].write(), expected);
            });
        });
    });
});
