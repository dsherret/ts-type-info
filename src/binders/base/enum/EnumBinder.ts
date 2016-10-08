import {EnumDefinition, EnumMemberDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, NamedBinder, ExportableBinder, AmbientableBinder, NodedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class EnumBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly exportableBinder: ExportableBinder,
        private readonly ambientableBinder: AmbientableBinder,
        private readonly nodedBinder: NodedBinder
    ) {
    }

    abstract getIsConst(): boolean;
    abstract getMembers(): EnumMemberDefinition[];

    bind(def: EnumDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.nodedBinder.bind(def);
        def.isConst = this.getIsConst();
        def.members.push(...this.getMembers());
    }
}
