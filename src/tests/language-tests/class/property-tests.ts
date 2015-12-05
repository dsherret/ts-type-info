import {getStringInfo} from "./../../../main";
import {Scope} from "./../../../scope";
import {ClassPropertyDefinition} from "./../../../definitions";
import * as assert from "assert";

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

    function nameTest(prop: ClassPropertyDefinition, name: string) {
        it(`should have name ${name}`, () => {
            assert.equal(prop.name, name);
        });
    }

    function typeTest(prop: ClassPropertyDefinition, type: string) {
        it(`should have type ${type}`, () => {
            assert.equal(prop.type.name, type);
        });
    }

    function scopeTest(prop: ClassPropertyDefinition, scope: Scope) {
        it(`should have scope ${Scope[scope]}`, () => {
            assert.equal(prop.scope, scope);
        });
    }

    describe("property myString", () => {
        const prop = def.classes[0].properties[0];

        nameTest(prop, "myString");
        typeTest(prop, "string");
        scopeTest(prop, Scope.public);
    });

    describe("property myImplicit", () => {
        const prop = def.classes[0].properties[1];

        nameTest(prop, "myImplicit");
        typeTest(prop, "number");
        scopeTest(prop, Scope.public);
    });

    describe("property myAny", () => {
        const prop = def.classes[0].properties[2];

        nameTest(prop, "myAny");
        typeTest(prop, "any");
        scopeTest(prop, Scope.public);
    });

    describe("property myExplicitPublic", () => {
        const prop = def.classes[0].properties[3];

        nameTest(prop, "myExplicitPublic");
        typeTest(prop, "any");
        scopeTest(prop, Scope.public);
    });

    describe("property myProtected", () => {
        const prop = def.classes[0].properties[4];

        nameTest(prop, "myProtected");
        typeTest(prop, "any");
        scopeTest(prop, Scope.protected);
    });

    describe("property myPrivate", () => {
        const prop = def.classes[0].properties[5];

        nameTest(prop, "myPrivate");
        typeTest(prop, "any");
        scopeTest(prop, Scope.private);
    });
});
