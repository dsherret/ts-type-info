import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {InterfaceDefinition} from "./../../definitions";
import {createInterface} from "./../../createFunctions";
import {InterfaceWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(InterfaceWriter), () => {
    function createObjects(def: InterfaceDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new InterfaceWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getDocumentationedWriter(writer, [def]),
            mocks.getExportableWriter(writer, def),
            mocks.getAmbientableWriter(writer, def),
            mocks.getTypeParametersWriter(writer, def.typeParameters),
            mocks.getPropertyWriter(writer, []),
            mocks.getFunctionWriter(writer),
            mocks.getCallSignatureWriter(writer, [...def.newSignatures, ...def.callSignatures]),
            mocks.getIndexSignatureWriter(writer),
            mocks.getExtendsImplementsClauseWriter(writer));
        return {writer, defWriter};
    }

    describe(nameof<InterfaceWriter>(w => w.write), () => {
        const prefix = "{start}{doc-comment}{export-keyword:0}{declare-keyword}interface Name{type-parameters}{extends-clause:Name} {\n";
        const suffix = "}\n{end}";

        it("should write out the interface", () => {
            const def = createInterface({
                name: "Name"
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}${suffix}`);
        });

        it("should write out the interface with new signatures, call signatures, index signatures, properties, and methods", () => {
            const def = createInterface({
                name: "Name",
                newSignatures: [{}, {}],
                callSignatures: [{}, {}],
                indexSignatures: [{ keyName: "s", keyType: "string", returnType: "string" }, { keyName: "t", keyType: "string", returnType: "string" }],
                properties: [{ name: "prop1" }, { name: "prop2" }],
                methods: [{ name: "method1" }, { name: "method2" }]
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            const expectedBody = `    new{call-signature:0};\n` +
                `    new{call-signature:0};\n` +
                `    {call-signature:0};\n` +
                `    {call-signature:0};\n` +
                `    {index-signature:s};\n` +
                `    {index-signature:t};\n` +
                `    {property:prop1:0}\n` +
                `    {property:prop2:0}\n` +
                `    {function:method1:0}\n` +
                `    {function:method2:0}\n`;
            expect(writer.toString()).to.equal(`${prefix}${expectedBody}${suffix}`);
        });
    });
});
