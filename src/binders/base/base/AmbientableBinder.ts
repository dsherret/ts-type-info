import {AmbientableDefinition} from "./../../../definitions";

export abstract class AmbientableBinder {
    abstract getIsAmbient(): boolean;
    abstract getHasDeclareKeyword(): boolean;

    bind(def: AmbientableDefinition) {
        def.isAmbient = this.getIsAmbient();
        def.hasDeclareKeyword = this.getHasDeclareKeyword();
    }
}
