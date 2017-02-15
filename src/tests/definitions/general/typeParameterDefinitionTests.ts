import {TypeParameterDefinition} from "./../../../definitions";
import {createClass} from "./../../../createFunctions";
import {runTypeParameterDefinitionTests} from "./../../testHelpers";

describe("TypeParameterDefinition", () => {
    describe("#setConstraintType()", () => {
        describe("as null", () => {
            const v = new TypeParameterDefinition();
            v.name = "";
            v.setConstraintType(null as any as string);

            runTypeParameterDefinitionTests(v, { name: "", constraintType: { text: "any" } });
        });

        describe("as object with null name", () => {
            const v = new TypeParameterDefinition();
            v.name = "";
            v.setConstraintType({ name: null as any as string });

            runTypeParameterDefinitionTests(v, { name: "", constraintType: { text: "any" } });
        });

        describe("with text", () => {
            const v = new TypeParameterDefinition();
            v.name = "";
            v.setConstraintType("string");

            runTypeParameterDefinitionTests(v, { name: "", constraintType: { text: "string" } });
        });

        describe("with definition", () => {
            const v = new TypeParameterDefinition();
            const c = createClass({ name: "MyClass" });
            v.name = "";
            v.setConstraintType(c);

            runTypeParameterDefinitionTests(v, { name: "", constraintType: { text: "MyClass" } });
        });

        describe("with definition and one type argument", () => {
            const v = new TypeParameterDefinition();
            const c = createClass({ name: "MyClass" });
            v.name = "";
            v.setConstraintType(c, ["string"]);

            runTypeParameterDefinitionTests(v, { name: "", constraintType: { text: "MyClass<string>" } });
        });

        describe("with definition and multiple type arguments", () => {
            const v = new TypeParameterDefinition();
            const c = createClass({ name: "MyClass" });
            v.name = "";
            v.setConstraintType(c, ["string", "number"]);

            runTypeParameterDefinitionTests(v, { name: "", constraintType: { text: "MyClass<string, number>" } });
        });
    });
});
