import {StructureFactory} from "./../../factories";
import {DecoratorStructure} from "./../../structures";
import {DefinitionUtils} from "./../../utils";
import {DecoratorDefinition} from "./../general";

export abstract class DecoratableDefinition {
    addDecorators(...decorators: DecoratorStructure[]) {
        const factory = new StructureFactory();
        this.decorators.push(...decorators.map(d => factory.getDecorator(d)));
        return this;
    }

    decorators: DecoratorDefinition[] = [];

    getDecorator(nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)): DecoratorDefinition {
        return DefinitionUtils.getDefinitionFromList(this.decorators, nameOrSearchFunction);
    }
}
