import {NodeDefinitions, ModuledDefinitions} from "./../../../definitions";

export abstract class ModuledBinder {
    abstract getMembers(): NodeDefinitions[];

    bind(def: ModuledDefinitions, handleCustomDefinition?: (def: NodeDefinitions) => void) {
        this.getMembers().forEach(member => this.bindMember(def, member, handleCustomDefinition));
    }

    private bindMember(def: ModuledDefinitions, member: NodeDefinitions, handleCustomDefinition?: (def: NodeDefinitions) => void) {
        if (member.isFunctionDefinition()) {
            def.functions.push(member);
        }
        else if (member.isClassDefinition()) {
            def.classes.push(member);
        }
        else if (member.isInterfaceDefinition()) {
            def.interfaces.push(member);
        }
        else if (member.isEnumDefinition()) {
            def.enums.push(member);
        }
        else if (member.isVariableDefinition()) {
            def.variables.push(member);
        }
        else if (member.isTypeAliasDefinition()) {
            def.typeAliases.push(member);
        }
        else if (member.isNamespaceDefinition()) {
            def.namespaces.push(member);
        }
        else if (handleCustomDefinition instanceof Function) {
            handleCustomDefinition(member);
        }
    }
}
