import {getStringInfo} from "./../../../main";
import {runTypeExpressionTests} from "./../../test-helpers";

describe("class extends implements tests", () => {
    const code = `
interface MyInterface {
    name: string;
}

class MyBaseClass {
    prop: string;
}

class MyExtendsImplementsClass extends MyBaseClass implements MyInterface {
    name: string;
}
`;

    const def = getStringInfo(code);

    describe("MyExtendsImplementsClass", () => {
        describe("extends clause", () => {
            runTypeExpressionTests(def.classes[1].extends[0], "MyBaseClass");
        });

        describe("implements clause", () => {
            runTypeExpressionTests(def.classes[1].implements[0], "MyInterface");
        });
    });
});
