import {DecoratorDefinition} from "./../../../definitions";
import {DecoratableStructure} from "./../../../structures";
import {DecoratableBinder} from "./../../base";
import {StructureDecoratorBinder} from "./../general";

export class StructureDecoratableBinder extends DecoratableBinder {
    constructor(private structure: DecoratableStructure) {
        super();
    }

    getDecorators() {
        return (this.structure.decorators || []).map(decoratorStructure => {
            const def = new DecoratorDefinition();
            const binder = new StructureDecoratorBinder(decoratorStructure);

            binder.bind(def);

            return def;
        });
    }
}
