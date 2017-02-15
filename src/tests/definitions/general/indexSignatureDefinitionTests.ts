import {IndexSignatureDefinition} from "./../../../definitions";
import {runTypeDefinitionTests} from "./../../testHelpers";

describe(nameof(IndexSignatureDefinition), () => {
    describe(nameof<IndexSignatureDefinition>(d => d.setKeyType), () => {
        const indexSignature = new IndexSignatureDefinition();
        indexSignature.setKeyType("number");

        runTypeDefinitionTests(indexSignature.keyType, { text: "number" });
    });
});
