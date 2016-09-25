import * as definitions from "./../../../definitions";

export abstract class ModuledBinder {
    abstract getMembers(): definitions.NodeDefinitions[];

    bind(def: definitions.ModuledDefinitions, handleCustomDefinition?: (def: definitions.NodeDefinitions) => void) {
        let order = 0;

        this.getMembers().forEach(member => {
            this.setOrderIfAble(member, () => order++);
            this.bindMember(def, member, handleCustomDefinition);
        });
    }

    private setOrderIfAble(member: definitions.NodeDefinitions, getOrder: () => number) {
        if (
            member instanceof definitions.FunctionDefinition || member instanceof definitions.ClassDefinition || member instanceof definitions.InterfaceDefinition ||
            member instanceof definitions.EnumDefinition || member instanceof definitions.VariableDefinition || member instanceof definitions.TypeAliasDefinition ||
            member instanceof definitions.NamespaceDefinition
        ) {
            member.order = getOrder();
        }
    }

    private bindMember(def: definitions.ModuledDefinitions, member: definitions.NodeDefinitions, handleCustomDefinition?: (def: definitions.NodeDefinitions) => void) {
        if (member instanceof definitions.FunctionDefinition) {
            def.functions.push(member);
        }
        else if (member instanceof definitions.ClassDefinition) {
            def.classes.push(member);
        }
        else if (member instanceof definitions.InterfaceDefinition) {
            def.interfaces.push(member);
        }
        else if (member instanceof definitions.EnumDefinition) {
            def.enums.push(member);
        }
        else if (member instanceof definitions.VariableDefinition) {
            def.variables.push(member);
        }
        else if (member instanceof definitions.TypeAliasDefinition) {
            def.typeAliases.push(member);
        }
        else if (member instanceof definitions.NamespaceDefinition) {
            def.namespaces.push(member);
        }
        else if (handleCustomDefinition instanceof Function) {
            handleCustomDefinition(member);
        }
    }
}
