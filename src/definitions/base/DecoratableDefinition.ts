import {StructureFactory} from "./../../factories";
import {DecoratorStructure} from "./../../structures";
import {DecoratorDefinition} from "./../general";

export abstract class DecoratableDefinition {
    addDecorators(...decorators: DecoratorStructure[]) {
        const factory = new StructureFactory();
        decorators.forEach(decorator => {
            const def = factory.getDecorator(decorator);
            this.decorators.push(def);
        });
        return this;
    }

    decorators: DecoratorDefinition[] = [];
}
