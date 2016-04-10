import {TsFactory} from "./../../../factories";
import {InterfaceMemberDefinitions} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {tryGet, Logger} from "./../../../utils";
import {InterfaceBinder} from "./../../base";
import {TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsTypeParameteredBinderByNode} from "./../base";

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
        if (childNode.isMethodSignature()) {
            return this.factory.getInterfaceMethod(childNode);
        }
        else if (childNode.isPropertySignature()) {
            return this.factory.getInterfaceProperty(childNode);
        }
        else if (childNode.isConstructSignature()) {
            return this.factory.getInterfaceNewSignature(childNode);
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
