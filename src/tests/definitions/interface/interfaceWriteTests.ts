import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
interface MyInterface {
    myString: string;
    mySecond: number;
    myMethod(): void;
    myMethodWithTypeParameter<T>(): void;
    myMethod2<T>(): string;
    myMethod2<T>(str?: string): string;
}

interface NewSignatureInterface {
    new<T>(str: string, t: T): string;
    new(any: any): string;
}

interface CallSignatureInterface {
    <T>(str: string, t: T): string;
    (num: number): number;
    (any: any): any;
}

interface IndexSignatureInterface {
    [str: string]: Date;
    [num: number]: Date;
}

interface MyTypeParameterInterface<T> {
}

interface MyExtenedInterface extends MyTypeParameterInterface<string> {
}
`;

describe("InterfaceDefinition", () => {
    const file = getInfoFromString(code);

    describe("write()", () => {
        let i = 0;

        describe("MyInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface MyInterface {
    myString: string;
    mySecond: number;

    myMethod(): void;
    myMethodWithTypeParameter<T>(): void;
    myMethod2<T>(): string;
    myMethod2<T>(str?: string): string;
}
`;
                assert.equal(file.interfaces[i++].write(), expected);
            });
        });

        describe("NewSignatureInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface NewSignatureInterface {
    new<T>(str: string, t: T): string;
    new(any: any): string;
}
`;
                assert.equal(file.interfaces[i++].write(), expected);
            });
        });

        describe("CallSignatureInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface CallSignatureInterface {
    <T>(str: string, t: T): string;
    (num: number): number;
    (any: any): any;
}
`;
                assert.equal(file.interfaces[i++].write(), expected);
            });
        });

        describe("IndexSignatureInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface IndexSignatureInterface {
    [str: string]: Date;
    [num: number]: Date;
}
`;
                assert.equal(file.interfaces[i++].write(), expected);
            });
        });

        describe("MyTypeParameterInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface MyTypeParameterInterface<T> {
}
`;
                assert.equal(file.interfaces[i++].write(), expected);
            });
        });

        describe("MyExtenedInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface MyExtenedInterface extends MyTypeParameterInterface<string> {
}
`;
                assert.equal(file.interfaces[i++].write(), expected);
            });
        });
    });
});
