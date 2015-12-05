import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {Scope} from "./../../../scope";
import {ClassPropertyDefinition} from "./../../../definitions";
import {runNamedDefinitionTests,
        runScopedDefinitionTests} from "./../../test-helpers";

describe("class property tests", () => {
    const code = `
class MyClass {
    myString: string;
    myImplicit = 4;
    myAny;

    public myExplicitPublic;
    protected myProtected;
    private myPrivate;
}`;

    const def = getStringInfo(code);

    function typeTest(prop: ClassPropertyDefinition, type: string) {
        it(`should have type ${type}`, () => {
            assert.equal(prop.type.name, type);
        });
    }

    describe("property myString", () => {
        const prop = def.classes[0].properties[0];

        runNamedDefinitionTests(prop, "myString");
        typeTest(prop, "string");
        runScopedDefinitionTests(prop, Scope.public);
    });

    describe("property myImplicit", () => {
        const prop = def.classes[0].properties[1];

        runNamedDefinitionTests(prop, "myImplicit");
        typeTest(prop, "number");
        runScopedDefinitionTests(prop, Scope.public);
    });

    describe("property myAny", () => {
        const prop = def.classes[0].properties[2];

        runNamedDefinitionTests(prop, "myAny");
        typeTest(prop, "any");
        runScopedDefinitionTests(prop, Scope.public);
    });

    describe("property myExplicitPublic", () => {
        const prop = def.classes[0].properties[3];

        runNamedDefinitionTests(prop, "myExplicitPublic");
        typeTest(prop, "any");
        runScopedDefinitionTests(prop, Scope.public);
    });

    describe("property myProtected", () => {
        const prop = def.classes[0].properties[4];

        runNamedDefinitionTests(prop, "myProtected");
        typeTest(prop, "any");
        runScopedDefinitionTests(prop, Scope.protected);
    });

    describe("property myPrivate", () => {
        const prop = def.classes[0].properties[5];

        runNamedDefinitionTests(prop, "myPrivate");
        typeTest(prop, "any");
        runScopedDefinitionTests(prop, Scope.private);
    });
});
