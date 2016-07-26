import * as assert from "assert";
import {Scope, ClassConstructorParameterScope} from "./../../../definitions";

describe("ClassConstructorParameterScope", () => {
    describe("#toScope()", () => {
        it("should convert public to public", () => {
            assert.equal(ClassConstructorParameterScope.toScope(ClassConstructorParameterScope.Public), Scope.Public);
        });

        it("should convert protected to protected", () => {
            assert.equal(ClassConstructorParameterScope.toScope(ClassConstructorParameterScope.Protected), Scope.Protected);
        });

        it("should convert private to private", () => {
            assert.equal(ClassConstructorParameterScope.toScope(ClassConstructorParameterScope.Private), Scope.Private);
        });

        it("should error for none", () => {
            assert.throws(() => ClassConstructorParameterScope.toScope(ClassConstructorParameterScope.None));
        });

        it("should error for unknown value", () => {
            assert.throws(() => ClassConstructorParameterScope.toScope("other" as any));
        });
    });
});
