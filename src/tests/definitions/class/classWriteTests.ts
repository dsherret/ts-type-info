import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
abstract class MyClass {
    static myStaticString: string;

    static myStaticMethod() {
    }

    myString: string;
    private myPrivateString: string;

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

    myString: string;
    private myPrivateString: string;

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
}
`;
                assert.equal(file.classes[0].write(), expected);
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
