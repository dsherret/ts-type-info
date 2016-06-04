import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
namespace MyNamespace {
    type myType = string;
    type mySecondType = string | number;
    namespace MyNamespace {
    }
    module MyModule {
    }
    export interface MyInterface {
    }
    class MyClass {
    }
    enum MyEnum {
    }
    function myFunction() {
    }
}
module MyModule {
    interface MyInterface {
    }
}
`;

describe("NamespaceDefinition", () => {
    const myFile = getInfoFromString(code);

    describe("#write()", () => {
        describe("MyNamespace", () => {
            it("should contain everything written out", () => {
                const expected =
`namespace MyNamespace {
    type myType = string;
    type mySecondType = string | number;

    namespace MyNamespace {
    }

    module MyModule {
    }

    export interface MyInterface {
    }

    class MyClass {
    }

    enum MyEnum {
    }

    function myFunction() {
    }
}
`;
                assert.equal(myFile.namespaces[0].write(), expected);
            });
        });

        describe("MyModule", () => {
            it("should contain everything written out", () => {
                const expected =
`module MyModule {
    interface MyInterface {
    }
}
`;
                assert.equal(myFile.namespaces[1].write(), expected);
            });
        });
    });
});
