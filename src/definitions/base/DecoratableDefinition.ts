import {MainFactory} from "./../../factories";
import {DecoratorStructure} from "./../../structures";
import {DefinitionUtils} from "./../../utils";
import {DecoratorDefinition} from "./../general";

export abstract class DecoratableDefinition {
    addDecorator(structure: DecoratorStructure) {
        const def = new MainFactory().createStructureFactory().getDecorator(structure);
        this.decorators.push(def);
        return def;
    }

    decorators: DecoratorDefinition[] = [];

    getDecorator(nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.decorators, nameOrSearchFunction);
    }
}
