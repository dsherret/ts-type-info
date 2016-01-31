import * as assert from "assert";
import {IBaseNamedDefinition} from "./../../../../definitions";
import {NamedStructure} from "./../../structures";

export function runNamedDefinitionTests(definition: IBaseNamedDefinition, structure: NamedStructure) {
    it(`should have a name ${structure.name}`, () => {
        assert.equal(definition.name, structure.name);
    });
}
