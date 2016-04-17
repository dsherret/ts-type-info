import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
interface MyInterface {
    myString: string;
    myMethod(): void;
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

interface MyTypeParameterInterface<T> {
}

interface MyExtenedInterface extends MyTypeParameterInterface<string> {
}
`;

describe("InterfaceWriter", () => {
    const file = getInfoFromString(code);

    describe("write()", () => {
        describe("MyInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface MyInterface {
    myString: string;

    myMethod(): void;
}
`;
                assert.equal(file.interfaces[0].write(), expected);
            });
        });

        /* todo
        describe("NewSignatureInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface NewSignatureInterface {
    new<T>(str: string, t: T): string;
    new(any: any): string;
}
`;
                assert.equal(file.interfaces[1].write(), expected);
            });
        });
        */

        describe("CallSignatureInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface CallSignatureInterface {
    <T>(str: string, t: T): string;
    (num: number): number;
    (any: any): any;
}
`;
                assert.equal(file.interfaces[2].write(), expected);
            });
        });

        describe("MyTypeParameterInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface MyTypeParameterInterface<T> {
}
`;
                assert.equal(file.interfaces[3].write(), expected);
            });
        });

        describe("MyExtenedInterface", () => {
            it("should contain the interface written out", () => {
                const expected =
`interface MyExtenedInterface extends MyTypeParameterInterface<string> {
}
`;
                assert.equal(file.interfaces[4].write(), expected);
            });
        });
    });
});
