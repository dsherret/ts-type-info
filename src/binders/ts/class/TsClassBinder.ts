import {TsFactory} from "./../../../factories";
import {ClassMemberDefinitions} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {tryGet, Logger} from "./../../../utils";
import {ClassBinder} from "./../../base";
import {TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsAbstractableBinder, TsTypeParameteredBinderByNode, TsDecoratableBinder} from "./../base";

export class TsClassBinder extends ClassBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsTypeParameteredBinderByNode(factory, node),
            new TsAbstractableBinder(node),
            new TsDecoratableBinder(factory, node)
        );
    }

    getExtendsTypeExpressions() {
        // todo: not the most efficient thing to loop through all the children each time
        return this.node.getChildren()
            .filter(node => node.isHeritageClause() && node.hasExtendsKeyword())
            .map(node => node.getHeritageNodes())
            .reduce((a, b) => a.concat(b), [])
            .map(node => this.factory.getTypeExpressionFromNode(node));
    }

    getImplementsTypeExpressions() {
        return this.node.getChildren()
            .filter(node => node.isHeritageClause() && node.hasImplementsKeyword())
            .map(node => node.getHeritageNodes())
            .reduce((a, b) => a.concat(b), [])
            .map(node => this.factory.getTypeExpressionFromNode(node));
    }

    getMembers() {
        return this.node.getChildren()
            .map(node => tryGet(node, () => this.getMemberDefinition(node)))
            .filter(n => n != null);
    }

    private getMemberDefinition(childNode: TsNode): ClassMemberDefinitions {
        if (childNode.isMethodDeclaration()) {
            if (childNode.hasStaticKeyword()) {
                return this.factory.getClassStaticMethod(childNode);
            }
            else {
                return this.factory.getClassMethod(childNode);
            }
        }
        else if (childNode.isPropertyDeclaration() || childNode.isGetAccessor()) {
            if (childNode.hasStaticKeyword()) {
                return this.factory.getClassStaticProperty(childNode);
            }
            else {
                return this.factory.getClassProperty(childNode);
            }
        }
        else if (childNode.isConstructor()) {
            return this.factory.getClassConstructor(childNode);
        }
        else if (childNode.isSetAccessor()) {
            // ignore, GetAccessor is the one that will be handled
        }
        else if (childNode.isIdentifier()) {
            // ignore, it's the class identifier
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
            Logger.warn(`Unknown class child kind: ${childNode.nodeKindToString()}`);
        }

        return null;
    }
}
