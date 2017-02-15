import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {TypeDefinition, ExpressionDefinition, TypedDefinition, DefaultExpressionedDefinition, OptionalDefinition} from "./../../definitions";
import {TypeWithDefaultExpressionWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(TypeWithDefaultExpressionWriter), () => {
    class MockDefinition implements TypedDefinition, DefaultExpressionedDefinition, OptionalDefinition {
        constructor(typeText: string, public isOptional = false) {
            this.type = new TypeDefinition();
            this.type.text = typeText;
        }

        type: TypeDefinition;
        defaultExpression: ExpressionDefinition | null;

        setType(...params: any[]) { return this; }
        setDefaultExpression(...params: any[]) { return this; }
    }

    function createObjects(def: MockDefinition, shouldWriteDefaultExpression: boolean) {
        const writer = new CodeBlockWriter();
        const defWriter = new TypeWithDefaultExpressionWriter(
            writer,
            mocks.getTypeWriter(writer, [def.type]),
            mocks.getDefaultExpressionedWriter(writer, [def], [shouldWriteDefaultExpression]));
        return {writer, defWriter};
    }

    describe(nameof<TypeWithDefaultExpressionWriter>(w => w.write), () => {
        function doWriteTest(def: MockDefinition, flags: WriteFlags, shouldWriteDefaultExpression: boolean, expectedText: string) {
            const {writer, defWriter} = createObjects(def, shouldWriteDefaultExpression);
            defWriter.write(def, flags, "any");
            expect(writer.toString()).to.equal(expectedText);
        }

        it("should write the default expression if it should be written", () => {
            const def = new MockDefinition("str");
            doWriteTest(def, WriteFlags.None, true, " = {default-expression:0}");
        });

        it("should write the type if the default expression should not be written", () => {
            const def = new MockDefinition("str");
            doWriteTest(def, WriteFlags.HideExpressions, false, ": {type:str:any}");
        });
    });

    describe(nameof<TypeWithDefaultExpressionWriter>(w => w.writeWithOptionalCheck), () => {
        function doWriteWithOptionalTest(def: MockDefinition, flags: WriteFlags, shouldWriteDefaultExpression: boolean, expectedText: string) {
            const {writer, defWriter} = createObjects(def, shouldWriteDefaultExpression);
            defWriter.writeWithOptionalCheck(def, flags, "any");
            expect(writer.toString()).to.equal(expectedText);
        }

        it("should write the type and default expression if the definition is optional and the default expression should be written", () => {
            const def = new MockDefinition("str", true);
            doWriteWithOptionalTest(def, WriteFlags.None, true, ": {type:str:any} = {default-expression:0}");
        });

        it("should write the default expression if the definition is not optional and the default expression should be written", () => {
            const def = new MockDefinition("str", false);
            doWriteWithOptionalTest(def, WriteFlags.None, true, " = {default-expression:0}");
        });

        it("should only write the type if the default expression should not be written", () => {
            const def = new MockDefinition("str", false);
            doWriteWithOptionalTest(def, WriteFlags.HideExpressions, false, ": {type:str:any}");
        });
    });
});
