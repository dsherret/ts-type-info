import {AbstractableDefinition} from "./../../../definitions";

export abstract class AbstractableBinder {
    abstract getIsAbstract(): boolean;

    bind(def: AbstractableDefinition) {
        def.isAbstract = this.getIsAbstract();
    }
}
