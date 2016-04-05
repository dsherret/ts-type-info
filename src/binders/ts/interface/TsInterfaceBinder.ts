import {TsFactory} from "./../../../factories";
import {InterfaceMethodDefinition, InterfacePropertyDefinition, InterfaceNewSignatureDefinition, InterfaceMemberDefinitions} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {tryGet, Logger} from "./../../../utils";
import {InterfaceBinder} from "./../../base";
import {TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsTypeParameteredBinderByNode} from "./../base";
import {TsInterfaceMethodBinder} from "./TsInterfaceMethodBinder";
import {TsInterfaceNewSignatureBinder} from "./TsInterfaceNewSignatureBinder";
import {TsInterfacePropertyBinder} from "./TsInterfacePropertyBinder";

export class TsInterfaceBinder extends InterfaceBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsTypeParameteredBinderByNode(factory, node)
        );
    }

    getExtendsTypeExpressions() {
        return this.node.getChildren()
            .filter(node => node.isHeritageClause() && node.hasExtendsKeyword())
            .map(node => node.getHeritageNodes())
            .reduce((a, b) => a.concat(b), [])
            .map(node => this.factory.getTypeExpressionFromNode(node));
    }

    getMembers() {
        return this.node.getChildren()
            .map(node => tryGet(node, () => this.getMemberDefinition(node)))
            .filter(n => n != null);
    }

    private getMemberDefinition(childNode: TsNode): InterfaceMemberDefinitions {
        // todo: move these into the TsFactory
        if (childNode.isMethodSignature()) {
            const methodDef = new InterfaceMethodDefinition();
            const methodBinder = new TsInterfaceMethodBinder(this.factory, childNode);

            methodBinder.bind(methodDef);

            return methodDef;
        }
        else if (childNode.isPropertySignature()) {
            const propDef = new InterfacePropertyDefinition();
            const propBinder = new TsInterfacePropertyBinder(this.factory, childNode);

            propBinder.bind(propDef);

            return propDef;
        }
        else if (childNode.isConstructSignature()) {
            const newSignatureDef = new InterfaceNewSignatureDefinition();
            const newSignatureBinder = new TsInterfaceNewSignatureBinder(this.factory, childNode.getSignatureFromThis());

            newSignatureBinder.bind(newSignatureDef);

            return newSignatureDef;
        }
        else if (childNode.isIdentifier()) {
            // ignore, it's the interface identifier
        }
        else if (childNode.isTypeParameter()) {
            // ignore, handled elsewhere
        }
        else if (childNode.isExportKeyword()) {
            // ignore, handled elsewhere
        }
        else if (childNode.isDefaultKeyword()) {
            // ignore, handled elsewhere
        }
        else if (childNode.isHeritageClause()) {
            // ignore, handled elsewhere
        }
        else {
            Logger.warn(`Unknown interface child kind: ${childNode.nodeKindToString()}`);
        }

        return null;
    }
}
