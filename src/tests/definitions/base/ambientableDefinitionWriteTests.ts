import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

describe("AmbientableDefinition", () => {
    const code = `
declare namespace MyNamespace {
}
declare module MyModule {
}
declare namespace MyOtherNamespace {
    interface myOtherInterface {}
    function myOtherFunction(): void;
}
declare interface MyInterface {
}
declare class MyClass {
}
declare enum MyEnum {
}
declare function myFunction(): void;
`;
    const myFile = getInfoFromString(code);

    describe("write()", () => {
        it("should contain the file written out with declare keywords", () => {
            const expected =
`declare namespace MyNamespace {
}

declare module MyModule {
}

declare namespace MyOtherNamespace {
    interface myOtherInterface {
    }

    function myOtherFunction(): void;
}

declare interface MyInterface {
}

declare class MyClass {
}

declare enum MyEnum {
}

declare function myFunction(): void;
`;
            assert.equal(myFile.write(), expected);
        });
    });
});
