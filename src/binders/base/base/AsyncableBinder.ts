import {AsyncableDefinition} from "./../../../definitions";

export abstract class AsyncableBinder {
    abstract getIsAsync(): boolean;

    bind(def: AsyncableDefinition) {
        def.isAsync = this.getIsAsync();
    }
}
