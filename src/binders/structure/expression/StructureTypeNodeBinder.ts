import {StructureFactory} from "./../../../factories";
import {TypeNodeBinder} from "./../../base";
import {StructureNodedBinder} from "./../base";
import {StructureBaseTypeBinder} from "./base";

export class StructureTypeNodeBinder extends TypeNodeBinder {
    constructor(private readonly factory: StructureFactory, private readonly text: string) {
        super(new StructureBaseTypeBinder(factory, text), null, null, new StructureNodedBinder());
    }
}
