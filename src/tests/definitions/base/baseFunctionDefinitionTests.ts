﻿import * as assert from "assert";
import {expect} from "chai";
import {FunctionDefinition} from "./../../../definitions";
import {createFunction} from "./../../../createFunctions";
import {runCallSignatureDefinitionTests, runTypeDefinitionTests} from "./../../testHelpers";

describe("BaseFunctionDefinition", () => {
    describe("#addCallSignature()", () => {
        const f = new FunctionDefinition();
        const returnedDef = f.addOverloadSignature({
            returnType: "string",
            typeParameters: [{ name: "T" }],
            parameters: [{ name: "myParam" }]
        });
        f.addOverloadSignature({
            parameters: [{ name: "myParam" }],
            userDefinedTypeGuard: {
                parameterName: "myParam",
                type: "string"
            }
        });
        f.addOverloadSignature({
            returnType: "number"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, f.overloadSignatures[0]);
        });

        runCallSignatureDefinitionTests(f.overloadSignatures[0], {
            returnType: { text: "string" },
            typeParameters: [{ name: "T" }],
            parameters: [{ name: "myParam" }],
            minArgumentCount: 1
        });

        runCallSignatureDefinitionTests(f.overloadSignatures[1], {
            parameters: [{ name: "myParam" }],
            userDefinedTypeGuard: {
                parameterName: "myParam",
                type: { text: "string" }
            },
            returnType: { text: "myParam is string" },
            minArgumentCount: 1
        });

        runCallSignatureDefinitionTests(f.overloadSignatures[2], {
            returnType: { text: "number" }
        });
    });

    describe("#getCallSignature()", () => {
        const f = new FunctionDefinition();
        f.addOverloadSignature({ returnType: "string" });
        f.addOverloadSignature({ returnType: "number" });
        it("should match the right definition", () => {
            assert.equal(f.getOverloadSignature(s => s.returnType.text === "number"), f.overloadSignatures[1]);
        });
    });

    describe(`#${nameof<FunctionDefinition>(f => f.setUserDefinedTypeGuard)}`, () => {
        it("should create a user defined type guard with a parameter name", () => {
            const f = createFunction({ name: "myFunction" });
            f.setUserDefinedTypeGuard({
                parameterName: "paramname",
                type: "BaseDefinition"
            });
            expect(f.userDefinedTypeGuard!.parameterName).to.equal("paramname");
            expect(f.userDefinedTypeGuard!.type.text).to.equal("BaseDefinition");
            // todo: don't call these instead it statements, should use runFunctionDefinitionTests here
            runTypeDefinitionTests(f.returnType, {
                text: "paramname is BaseDefinition"
            });
        });

        it("should create a user defined type guard without a parameter name that has the this type", () => {
            const f = createFunction({ name: "myFunction" });
            f.setUserDefinedTypeGuard({
                type: "BaseDefinition"
            });
            expect(f.userDefinedTypeGuard!.parameterName).to.equal("this");
            expect(f.userDefinedTypeGuard!.type.text).to.equal("BaseDefinition");
            // todo: don't call these instead it statements
            runTypeDefinitionTests(f.returnType, {
                text: "this is BaseDefinition"
            });
        });
    });
});
