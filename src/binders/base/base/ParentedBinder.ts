import {ParentedDefinition} from "./../../../definitions";

export class ParentedBinder {
    bindParentToChild<ParentType, ChildType extends ParentedDefinition<ParentType>>(parent: ParentType, child: ChildType) {
        child.parent = parent;
    }
}
