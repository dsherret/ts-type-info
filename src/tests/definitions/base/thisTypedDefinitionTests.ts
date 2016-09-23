import {FunctionDefinition} from "./../../../definitions";
import {createClass} from "./../../../createFunctions";
import {runThisTypedDefinitionTests} from "./../../testHelpers";

describe("ThisTypedDefinition", () => {
    describe("setThisType()", () => {
        describe("as null", () => {
            const f = new FunctionDefinition();
            f.setThisType(null as any as string);

            runThisTypedDefinitionTests(f, { thisType: { text: "any" } });
        });

        describe("as object with null name", () => {
            const f = new FunctionDefinition();
            f.setThisType({ name: null as any as string });

            runThisTypedDefinitionTests(f, { thisType: { text: "any" } });
        });

        describe("with text", () => {
            const f = new FunctionDefinition();
            f.setThisType("string");

            runThisTypedDefinitionTests(f, { thisType: { text: "string" } });
        });

        describe("with definition", () => {
            const f = new FunctionDefinition();
            const c = createClass({ name: "MyClass" });
            f.setThisType(c);

            runThisTypedDefinitionTests(f, { thisType: { text: "MyClass" } });
        });

        describe("with definition and one type argument", () => {
            const f = new FunctionDefinition();
            const c = createClass({ name: "MyClass" });
            f.setThisType(c, ["string"]);

            runThisTypedDefinitionTests(f, { thisType: { text: "MyClass<string>" } });
        });

        describe("with definition and multiple type arguments", () => {
            const f = new FunctionDefinition();
            const c = createClass({ name: "MyClass" });
            f.setThisType(c, ["string", "number"]);

            runThisTypedDefinitionTests(f, { thisType: { text: "MyClass<string, number>" } });
        });
    });
});
