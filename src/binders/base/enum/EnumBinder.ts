import {EnumDefinition, EnumMemberDefinition} from "./../../../definitions";
import {NamedBinder, ExportableBinder, AmbientableBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class EnumBinder implements IBaseBinder {
    constructor(
        private namedBinder: NamedBinder,
        private exportableBinder: ExportableBinder,
        private ambientableBinder: AmbientableBinder
    ) {
    }

    abstract getMembers(): EnumMemberDefinition[];

    bind(def: EnumDefinition) {
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        def.members.push(...this.getMembers());
    }
}
