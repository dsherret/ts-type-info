import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code =
`interface SimpleInterface {
}

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

interface MyMultipleExtenedInterface extends MyTypeParameterInterface<string>, MyInterface {
}
`;

describe("InterfaceDefinition", () => {
    const file = getInfoFromString(code);

    describe("write()", () => {
        it("should have the same output as the input", () => {
            assert.equal(file.write(), code);
        });

        it("should write when calling it on the interface", () => {
            const expectedCode =
`interface SimpleInterface {
}
`;
            assert.equal(file.interfaces[0].write(), expectedCode);
        });
    });
});
