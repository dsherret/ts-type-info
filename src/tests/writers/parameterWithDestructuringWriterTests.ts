import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {ParameterDefinitions, ClassMethodParameterDefinition} from "./../../definitions";
import {ParameterWithDestructuringWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(ParameterWithDestructuringWriter), () => {
    function createObjects(def: ParameterDefinitions, shouldWriteDefaultExpression: boolean[]) {
        const writer = new CodeBlockWriter();
        const defWriter = new ParameterWithDestructuringWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getDefaultExpressionedWriter(writer, def.destructuringProperties, shouldWriteDefaultExpression),
            mocks.getTypeWriter(writer, def.destructuringProperties.map(p => p.type)));
        return {writer, defWriter};
    }

    describe(nameof<ParameterWithDestructuringWriter>(w => w.write), () => {
        const prefix = "{start}";
        const suffix = "{end}";

        it("should write out the destructuring parameter", () => {
            const def = new ClassMethodParameterDefinition();
            def.addDestructuringProperty({
                name: "myProperty",
                type: "string",
                isOptional: true,
                isReadonly: true
            });
            const {writer, defWriter} = createObjects(def, [false]);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}{ myProperty }: { readonly myProperty?: {type:string:any}; }${suffix}`);
        });

        it("should write out the destructuring parameter when there are multiple", () => {
            const def = new ClassMethodParameterDefinition();
            def.addDestructuringProperty({
                name: "myProperty",
                type: "string"
            });
            def.addDestructuringProperty({
                name: "myProperty2",
                type: "number",
                defaultExpression: "5"
            });
            const {writer, defWriter} = createObjects(def, [false, true]);
            defWriter.write(def, WriteFlags.None);
            const expected = `${prefix}{ myProperty, myProperty2 = {default-expression:0} }: { myProperty: {type:string:any}; myProperty2: {type:number:any}; }${suffix}`;
            expect(writer.toString()).to.equal(expected);
        });
    });
});
