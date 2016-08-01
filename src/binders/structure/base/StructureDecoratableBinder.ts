import {DecoratableBinder} from "./../../base";
import {StructureFactory} from "./../../../factories";
import {DecoratableStructure} from "./../../../structures";

export class StructureDecoratableBinder extends DecoratableBinder {
    constructor(private readonly factory: StructureFactory, private readonly structure: DecoratableStructure) {
        super();
    }

    getDecorators() {
        return (this.structure.decorators || []).map(decoratorStructure => this.factory.getDecorator(decoratorStructure));
    }
}
