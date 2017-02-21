import {VariableDefinition} from "./../../../definitions";
import {createClass} from "./../../../createFunctions";
import {runTypedDefinitionTests} from "./../../testHelpers";

describe("TypedDefinition", () => {
    describe("#setType()", () => {
        describe("as null", () => {
            const v = new VariableDefinition();
            v.setType(null as any as string);

            runTypedDefinitionTests(v, { type: { text: "any" } });
        });

        describe("as object with null name", () => {
            const v = new VariableDefinition();
            v.setType({ name: null as any as string });

            runTypedDefinitionTests(v, { type: { text: "any" } });
        });

        describe("with text", () => {
            const v = new VariableDefinition();
            v.setType("string");

            runTypedDefinitionTests(v, { type: { text: "string" } });
        });

        describe("with text, union type", () => {
            const v = new VariableDefinition();
            v.setType("string | number");

            runTypedDefinitionTests(v, {
                type: {
                    text: "string | number",
                    unionTypes: [{
                        text: "string"
                    }, {
                        text: "number"
                    }]
                }
            });
        });

        describe("with text, intersection type", () => {
            const v = new VariableDefinition();
            v.setType("string & number");

            runTypedDefinitionTests(v, {
                type: {
                    text: "string & number",
                    intersectionTypes: [{
                        text: "string"
                    }, {
                        text: "number"
                    }]
                }
            });
        });

        describe("with definition", () => {
            const v = new VariableDefinition();
            const c = createClass({ name: "MyClass" });
            v.setType(c);

            runTypedDefinitionTests(v, { type: { text: "MyClass" } });
        });

        describe("with definition and one type argument", () => {
            const v = new VariableDefinition();
            const c = createClass({ name: "MyClass" });
            v.setType(c, ["string"]);

            runTypedDefinitionTests(v, {
                type: {
                    text: "MyClass<string>",
                    definitions: [c],
                    typeArguments: [{ text: "string" }]
                }
            });
        });

        describe("with definition and multiple type arguments", () => {
            const v = new VariableDefinition();
            const c = createClass({ name: "MyClass" });
            v.setType(c, ["string", "number"]);

            runTypedDefinitionTests(v, {
                type: {
                    text: "MyClass<string, number>",
                    definitions: [c],
                    typeArguments: [
                        { text: "string"},
                        { text: "number"}
                    ]
                }
            });
        });
    });
});
