import * as assert from "assert";
import {INamedDefinition} from "./../../../../definitions";

export function ensureDefinitionNotNull(definition: INamedDefinition, additionalTestsIfNotNull: () => void) {
    if (definition == null) {
        it(`should not be null`, () => {
            assert.notEqual(definition, null);
        });
    }
    else {
        additionalTestsIfNotNull();
    }
}
