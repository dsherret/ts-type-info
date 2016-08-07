import {ReadonlyableDefinition} from "./../../../definitions";

export abstract class ReadonlyableBinder {
    abstract getIsReadonly(): boolean;

    bind(def: ReadonlyableDefinition) {
        def.isReadonly = this.getIsReadonly();
    }
}
